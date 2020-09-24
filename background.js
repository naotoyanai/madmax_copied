const alertPage = chrome.extension.getURL("./src/alert.html");

function ouralgorithm(requestDetails) {
	//console.log("post start");
	return new Promise(function(resolve){
		xhr = new XMLHttpRequest();
		xhr.open('POST', 'http://ec2-13-231-172-186.ap-northeast-1.compute.amazonaws.com:4000');
		xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
		var request = requestDetails.url.split("//")[1].split("/")[0];
		if (request.split(".")[0] == "www") {
			request = request.split(".");
			request.shift();
			request = request.join(".")
		}
		console.log(request);
		xhr.send(request);
		//predict ELM
		xhr.onload = function (e) {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log("rcv from server");
              //var result = xhr.statusText;
              var result = xhr.responseText;
              console.log(result);
              if (Boolean(parseInt(result, 2))) {
              	console.log("ELM detect");
              }
              resolve(result);
            }
          }
        }
    })
}

async function redirect(requestDetails){
	var redirectDest = alertPage + '?to=' + requestDetails.url;
	
	//in user whitelist?(As it is)
	if(searchTmpWhitelist(requestDetails.url)) {
		console.log('approved by tmp white list :',requestDetails.url);
	} else {
		var final_result = null
        await ouralgorithm(requestDetails).then(function(result){
        	final_result = result
        })
		console.log(final_result)
        if (final_result != null) {
			if (Boolean(parseInt(final_result, 2))) {
				console.log('TEST')
				return {redirectUrl: redirectDest}
			}
        }
	}
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:["*://*/*"],types:["main_frame"]},
  ["blocking"]
);

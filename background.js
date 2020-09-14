const redirectDest = chrome.extension.getURL("./src/foo.html");
const redirectDest_http = chrome.extension.getURL("./src/foo_http.html");
const redirectDest_analysis = chrome.extension.getURL("./src/foo_analysis.html");
blacklists = genBlackList();
whitelists = genWhiteList();
function get_scheme(original_url){
	return original_url.split(":")[0];
}

async function redirect(requestDetails){
	var u = redirectDest + '?to=' + requestDetails.url;
	var u_http = redirectDest_http + '?to=' + requestDetails.url;
	var u_analysis = redirectDest_analysis + '?to=' + requestDetails.url;
	var scheme = get_scheme(requestDetails.url);

	

	//in user whitelist?(As it is)
	if(searchTmpWhitelist(requestDetails.url))
		console.log('approved by tmp white list :',requestDetails.url);
	else{
		//in blacklist?(As it is)
		if (ret = search(blacklists,requestDetails.url)){
			console.log("dangerous!: ",ret);
			console.log("url: ", requestDetails.url);
			return {redirectUrl: u + '&v=' + ret};
		} else{			
			//in whitelist?(Tranco dataset)
			console.log("search result");
			console.log(whitelists);
			console.log(search(whitelists,requestDetails.url));
			//if (search(whitelists,requestDetails.url)) {
			//	console.log('approved by white list :',requestDetails.url);
			//}else{
				//send to server
			var final_result = null
			function ouralgorithm(){
				console.log("post start");
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
	                      if (Boolean(Number(result))) {
	                      	console.log("ELM detect");
	                      	//return　{redirectUrl: u_analysis};
	                      	　resolve(u_http);
	                      }else{
	                      	resolve(null);
	                      }
	                    }
	                  }
	                }
                
                })
            }
        	await ouralgorithm().then(function(result){
            	final_result = result
            })
            console.log(final_result)
            if (final_result != null) {
              return {redirectUrl : final_result}
            }
                　　　　　　


            //}
		}

	}
}

browser.webRequest.onBeforeRequest.addListener(
  redirect,
  {urls:["*://*/*"],types:["main_frame"]},
  ["blocking"]
);

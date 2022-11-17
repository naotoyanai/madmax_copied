# MADMAX 

MADMAX: MAchine learning-baseD MAlicious domain eXhauster is an application that automatically determines malicious domains rapidly. A user can install Firefox-addons to use MADMAX.

## Functions

When a user accesses a site, the ELM (Extreme Learning Machine), a machine learning model capable of high-speed prediction, is used to determine whether the domain contained in the URL is malicious or benign.
If a domain is determined to be malicious, a warning screen is displayed to alert the user.

By using machine learning, it is possible to protect users from unknown threats that cannot be handled by detection methods using deny lists.

The prediction model runs in a server built by the developer, and users can install an add-on to receive this highly accurate and fast malicious domain prediction service without being aware of it. This ease of use is expected to lead to widespread use of this service, and will be the first step toward realizing a secure world.



## Overview

MADMAX consists of Firefox-addons for users and a prediction model for a sever. 

![][fig_system]

[fig_system]:https://github.com/kzk-IS/MWS2020_adon/blob/master/fig_system.jpg

When a user tries to access a site on a browser, the add-on automatically performs malicious site detection. The add-on's algorithm is simple: it sends a domain extracted from the site's URL to the prediction server as an input query, and if the site is malicious according to the prediction results, a warning screen is displayed to alert the user. (Even if the site has been previously determined to be malicious, the site to which access is permitted is kept as a user white list and accessed without going through the server.) 

In the server, features are extracted from the domain and given as input to the prediction model to obtain prediction results as its output. The prediction model can be updated by the developer to a model trained on the latest data set, allowing it to continuously respond to unknown threats. The updated content refers to the trained parameters used in the ELM model, and the training model can be updated by sending the json format file, which is the actual state of the model, to the server.



## How to Use MADMAX

For the user-side, 

1. Download the addons from github and type the following command in the directory: 
```$ git clone https://github.com/kzk-IS/MWSCUP2020_addon.git```

1. Input `about:debugging#/runtime/this-firefox` in Firefox's URL bar.

1. Push the `Load Temporary Add-on...` button and choose `manifest.json` in the directory. 


1. Suceed in installing if you can see `MADMAX` in the addons. 


## For the server-side, the detail of the server-side functions are described in the following repository (in Japanese): 

https://github.com/kzk-IS/MWSCUP2020_server

ELM used in the prediction model on the server is a kind of neural networks. When we checked the performance of MADMAX, the accuracy was 90.1% with our dataset described in the MADMAX paper. 


## Alerts of Malicous Domain Detection

When MADMAX detects a malicious domain, the following warning screen is displayed on the user's browser.

![][keikoku]

[keikoku]:https://github.com/kzk-IS/MWS2020_adon/blob/master/keikoku.png

You can use MADMAX on Firefox(80.0.1). 


## Licens

[MIT](https://opensource.org/licenses/mit-license.php)

## Contributors

- [kzk-IS](https://github.com/kzk-IS)
- [akazs](https://github.com/akazs)
- [nanana710](https://github.com/nanana710)
- [han9umeda](https://github.com/han9umeda)
- [takemr](https://github.com/takemr)
- [flabrei926](https://github.com/flabrei926)

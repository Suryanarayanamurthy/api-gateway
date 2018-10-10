


# Documentation

### The API Gateway
At it's core, the API Gateway is a simple Express-based REST API that acts as a reverse proxy that is extensible and lets you manipulate or react to requests before they reach their destination.
It allows the use of middleware to add functionality and makes use of the NPM module [http-proxy](https://www.npmjs.com/package/http-proxy) to redirect requests to their destination.

The API Gateway is comprised mainly by the following 3 files:
- bin/www
    - This file imports index.js, sets up the server and runs the server
- index.js
    - This file imports the settings from services.json in order to bootstrap the proxy.
- services.json
    - This file is where you define your services and what middleware they should use

#### The Bootstrapping Process (index.js)
As mentioned above, the purpose of index.js is to set up the server to proxy requests. It does this by reading in the contents of services.json which should contain an array of services (as described below) and then configuring a REST endpoint at "/api/v1/{service name}"


#### Configuring Your Services (services.json)
This is where you define your services. It should contain a JSON array of objects each corresponding to an individual service. This object should contain the following parameters:
- name
    - The name of your service. This is used to set up the endpoint on the API Gateway that will redirect requests to the actual service.
- host
    - What host to proxy the requests to
- port
    - What port to proxy the requests to
- protocol
    - what protocol to use when proxying the request (default: http)
- rootPath
    - The root path to proxy requests to on the service (default: "")
    - For example:
        - The rootPath of the Hello World API is "api/v1". If we omit this from our services.json file then in order to reach the "api/v1/hello" endpoint on the Hello World API from the API Gateway we would have to use the endpoint "/api/v1/helloapi/api/v1/hello" instead of "/api/v1/helloapi/hello"
- middleware
    - An array of strings corresponding to the name of a javascript file inside the "middleware/" directory. This is how you specify what middleware a service should use.
    - Note: middleware will be applied in the order that it appears in the array

#### Middleware (middleware/*.js)
The "middleware/" directory is used to hold your custom Express middleware to apply onto the requests before they are proxied. For example, say we have something  like, "middleware/SayHello.js":
```javascript
module.exports = function(req, res, next) {
  const message = { message: 'Hello from the API Gateway!' };
  req.headers['gateway-message'] = JSON.stringify(message);
  next();
};
```
The role of this middleware is to append the HTTP header "gateway-message" to the request before it is proxied.

If you are unfamiliar with middleware or how it is used in NodeJS/Express I highly recommend reading [Using Express middleware](http://expressjs.com/en/guide/using-middleware.html) or doing some research on your on.


#### Final Thoughts / Future Development
- It may be worthwile to use something like [Apache Zookeeper](https://zookeeper.apache.org/) to configure the services instead of the "services.json" file.
- Other types of protocols aside from "http" and "https" still need to be tested. 
- I am especially interested in seeing if I am able to proxy a request to connect to a websocket server or other two-way communication servers and maintain that connection between the client/server.
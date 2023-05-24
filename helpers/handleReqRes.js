/**
 * Title: Handle request and response
 * Description: Handle request and response
 * Author: Sumon Hossen
 * Date: 5/23/2023
 */

// dependencies
const url = require('url');
const {StringDecoder} = require('string_decoder');
const routes = require('../routes');
const {notFoundHandler} = require('../handlers/routeHandlers/notFoundHandler');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // request handling
    // get the url and parse it
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\+|\/+$/g, "");
    const method = req.method.toLowerCase();
    const queryStringObject = parseUrl.query;
    const headersObject = req.headers;
    // console.log(headersObject);

    const requestProperties = {
        
    }

    const decoder = new StringDecoder("utf-8");
    let realData = "";

    const chosenHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler

    req.on("data", (buffer) => {
      realData += decoder.write(buffer);
    });

    req.on("end", () => {
      realData += decoder.end();
      console.log(realData);
      res.end("Hello amir");
    });
    // console.log(path);
    // response handle
  };

module.exports = handler;

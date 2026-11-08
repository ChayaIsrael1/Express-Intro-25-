# Part 1 - answers

Read the Express documentation (https://expressjs.com/en/5x/api.html) and answer in your own words.

## 1. What is inside the request object (`req`)?

The req object represents the HTTP request and has properties for the request query string, parameters, body, HTTP headers, and so on. (req.params, req.query, req.body, req.headers)

## 2. What is inside the response object (`res`)?

The res object represents the HTTP response that an Express app sends when it gets an HTTP request.
Properties (res.app, res.headersSent, res.locals, res.req ) 
- res.app is identical to the req.app property in the request object.
- res.headersSent , Boolean property that indicates if the app sent HTTP headers for the response.
- res.locals , Object , Use this property to set variables accessible in templates rendered with res.render. The variables set on res.locals are available within a single request-response cycle, and will not be shared between requests.
- res.req, This property holds a reference to the request object that relates to this response object.

## 3. What does `app.use()` do?

app.use() is used to register middleware functions in your Express application.
Middleware functions are functions that execute sequentially during the request-response cycle. They have access to the req and res objects, and a next function to pass control to the next middleware.
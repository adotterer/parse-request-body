# Parse the Body of a Request Phase 3 - Read the Body of the Request

In this phase, you will convert a percent-encoded request body into a JavaScript
object.

Reference the _Parsing the Body of the Request_ reading for the steps to take to
parse the body of a typical HTML form submission request with a `Content-Type`
header of `application/x-www-form-urlencoded`. Implement these steps in the
server that you created and log the parsed request body to your terminal.

Take a look at the __index.html__ file. When the form in the file is submitted
without changing the fields, it will make a `POST /` request with the following
form data as the request body:

| Field Name | Value       |
| ---------- | ----------- |
| username   | azure green |
| password   | password!   |

When the above request body gets to the server by the browser, the server will
get the body in the form of a string,
"username=azure+green&password=password%21". The spaces in the values get
replaced with a plus symbol, `+`, and the symbols in the values get replaced by
a percent-encoded value (the exclamation mark get percent-encoded into a
`%21`).

Use your knowledge of `String`, `Array`, and `Object` manipulation to turn the
request body string of "username=azure+green&password=password%21" into a
JavaScript object with the following key-value pairs:

```js
{
  username: "azure green",
  password: "password!"
}
```

Tip: You can use the following functions to aid you:

- [`String.split`] - to split a string into an array by a given delimiter
- [`String.replace`] - to replace the substrings in a string with another
  substring
  - Use `str.replace(/\+/g, " ")` to replace all `+` symbols in the string
    with a space
- [`Array.map`] - to convert each element in the array to a new element
- [`Array.reduce`] - to convert an array into an object (TRICKY to use so don't
  use this unless you have a good idea of how to do this)
- [`decodeURIComponent(str)`] - decodes a given string from [Percent Encoding]

**Finally, set the `body` property on the request object, `req.body`, to your
parsed request body.**

## Testing

To test your code to make sure it's working, call the `sendFormPage()` function
imported at the top of the file so that the function will be invoked by the
server **after request body is fully assembled AND right after you finish
parsing the request body**, like so:

```js
// server.js
const { sendFormPage } = require('./routes');
const server = http.createServer((req, res) => {
  // your code...
  req.on("end", () => {
    // your code...
    sendFormPage(req, res);
  });
});
```

Start the server and navigate to [http://localhost:5000] in your browser to see
the HTML form page. Submit the form to make a request to the server. You should
see this in your browser once you submit:

![parse-request-body-practice-result]

[`String.split`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
[`String.replace`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
[`Array.map`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
[`Array.reduce`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
[`decodeURIComponent`]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent
[Percent Encoding]: https://developer.mozilla.org/en-US/docs/Glossary/percent-encoding
[http://localhost:5000]: http://localhost:5000
[parse-request-body-practice-result]: https://appacademy-open-assets.s3.us-west-1.amazonaws.com/Modular-Curriculum/content/week-08/practice-parse-request-body/parsed-request-body-result.png
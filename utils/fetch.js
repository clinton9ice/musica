import fetch from "node-fetch";

module.exports = function Fetch(url, fn) {
  fetch(url)
    .then((d) => d.json())
    .then((Result) => {
      if (Result) {
        fn({ success: Result });
      }
    })
    .catch((error) => {
      fn({ error });
    });
};

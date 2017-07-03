exports.helloSync = function (name) {
  return ("Hello " + name);
}

exports.hello = function (name, callback) {
  var modname = "Hello " + name;

  (function (_name, _callback) {
    setTimeout(function () {
      _callback(_name);
    }, 500);
  })(modname, callback);
}
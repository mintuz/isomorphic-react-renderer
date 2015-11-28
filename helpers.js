var onClient = function onClient() {
  return (typeof(window) !== 'undefined');
};

var onServer = function onServer() {
  return (!onClient());
};

var safeStringify = function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/script/g, '<\\/script')
    .replace(/<!--/g, '<\\!--');
};

module.exports.safeStringify = safeStringify;
module.exports.onClient = onClient;
module.exports.onServer = onServer;
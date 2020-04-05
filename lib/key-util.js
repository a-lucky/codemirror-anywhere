"use strict"

function isUseMacOS() {
  const ua = window.navigator.userAgent.toLowerCase();
  return ua.indexOf("mac os x") !== -1;
}

exports.isModKey = function () {
  return isUseMacOS() ? event.metaKey : event.ctrlKey;
}

exports.withoutMacOS = function(listener) {
  if (!isUseMacOS()) {
    return listener;
  }
}
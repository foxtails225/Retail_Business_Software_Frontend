"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.errorHandler = errorHandler;
exports.baseName = baseName;

function errorHandler(errors) {
  if (errors) {
    errors = Object.values(errors);
  } else {
    errors = ['There is a network connection error.'];
  }

  return errors = errors.join('<br/> ');
}

function baseName(str) {
  var base = new String(str).substring(str.lastIndexOf('/') + 1);
  if (base.lastIndexOf(".") != -1) base = base.substring(0, base.lastIndexOf("."));
  return base;
}
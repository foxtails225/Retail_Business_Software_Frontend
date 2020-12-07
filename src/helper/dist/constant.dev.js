"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var APP_CONST = {
  API_URL: "http://127.0.0.1:5000/api",
  // API_URL: 'http://zed.umbrellaink.com.au/api',
  // BASE_URL: 'http://zed.umbrellaink.com.au',
  BASE_URL: "http://127.0.0.1:5000",

  /** Cloudinary Constants */
  CLOUD_NAME: 'umbrellaink',
  UPLOAD_PRESET: 'v2wd9hdn',
  COLOR_LIST: {
    BK: '#000',
    WH: '#fff',
    RD: '#FF0000',
    GR: '#808080',
    GN: '#008000',
    PR: '#6a0dad',
    YL: '#FFFF00',
    LB: '#ADD8E6',
    RB: '#002366',
    PK: '#FFC0CB',
    NV: '#000080',
    CH: '#36454f',
    OR: '#FFA500',
    SA: '#c2b280',
    BL: '#0000ff'
  },
  GENDER_LIST: [{
    key: 'M',
    name: 'Mens'
  }, {
    key: 'F',
    name: 'Womens'
  }],
  THEME: ['L', 'D']
};
var _default = APP_CONST;
exports["default"] = _default;
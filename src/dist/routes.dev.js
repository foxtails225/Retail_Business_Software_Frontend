"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = exports.authRoutes = void 0;

var _Login = _interopRequireDefault(require("views/pages/auth/Login.jsx"));

var _Register = _interopRequireDefault(require("views/pages/auth/Register.jsx"));

var _ProductList = _interopRequireDefault(require("views/pages/product/ProductList.jsx"));

var _ProductCreate = _interopRequireDefault(require("views/pages/product/ProductCreate.jsx"));

var _ProductDetail = _interopRequireDefault(require("views/pages/product/ProductDetail.jsx"));

var _ProductImageSet = _interopRequireDefault(require("views/pages/product/ProductImageSet.jsx"));

var _KeywordList = _interopRequireDefault(require("views/pages/keyword/KeywordList.jsx"));

var _category = _interopRequireDefault(require("views/pages/category"));

var _ArtistList = _interopRequireDefault(require("views/pages/artist/ArtistList.jsx"));

var _setting = _interopRequireDefault(require("views/pages/setting/setting"));

var _etsy = _interopRequireDefault(require("views/pages/setting/etsy"));

var _TshirtVariant = _interopRequireDefault(require("views/pages/variant/TshirtVariant.jsx"));

var _MugsVariant = _interopRequireDefault(require("views/pages/variant/MugsVariant.jsx"));

var _ToteBagsVariant = _interopRequireDefault(require("views/pages/variant/ToteBagsVariant.jsx"));

var _HoodiesVariant = _interopRequireDefault(require("views/pages/variant/HoodiesVariant.jsx"));

var _KidsVariant = _interopRequireDefault(require("views/pages/variant/KidsVariant.jsx"));

var _CushionCoverVariant = _interopRequireDefault(require("views/pages/variant/CushionCoverVariant.jsx"));

var _ImageVariant = _interopRequireDefault(require("views/pages/variant/ImageVariant.jsx"));

var _PriceVariant = _interopRequireDefault(require("views/pages/variant/PriceVariant.jsx"));

var _PriceMerchantVariant = _interopRequireDefault(require("views/pages/variant/PriceMerchantVariant.jsx"));

var _DescriptionVariant = _interopRequireDefault(require("./views/pages/variant/DescriptionVariant"));

var _ApprovedWordList = _interopRequireDefault(require("./views/pages/trademark/ApprovedWordList"));

var _BannedWordList = _interopRequireDefault(require("./views/pages/trademark/BannedWordList"));

var _TradeMarkClassWordList = _interopRequireDefault(require("./views/pages/trademark/TradeMarkClassWordList"));

var _Performance = _interopRequireDefault(require("./views/pages/performance/Performance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var authRoutes = [{
  path: "/login",
  name: "Login",
  component: _Login["default"],
  layout: "/auth"
}, {
  path: "/register",
  name: "Register",
  component: _Register["default"],
  layout: "/auth"
}];
exports.authRoutes = authRoutes;
var routes = [{
  collapse: true,
  name: "Product",
  icon: "ni ni-shop text-primary",
  state: "productCollapse",
  views: [{
    path: "/product-list",
    name: "Product List",
    component: _ProductList["default"],
    layout: "/main"
  }, {
    path: "/product-create",
    name: "Product Create",
    component: _ProductCreate["default"],
    layout: "/main"
  }, {
    path: "/product-imageset",
    name: "Product Image Set",
    component: _ProductImageSet["default"],
    layout: "/main"
  }, {
    path: "/product-detail/:id",
    name: "Product Detail",
    component: _ProductDetail["default"],
    layout: "/main"
  }]
}, {
  collapse: true,
  name: "Variant",
  icon: "ni ni-single-copy-04 text-primary",
  state: "variantTshirtCollapse",
  views: [{
    path: "/variant-tshirt",
    name: "Tshirt Variant",
    component: _TshirtVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-mugs",
    name: "Mugs Variant",
    component: _MugsVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-tote-bags",
    name: "Tote Bags Variant",
    component: _ToteBagsVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-cushion-covers",
    name: "Cushion Cover Variant",
    component: _CushionCoverVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-hoodies",
    name: "Hoodies Variant",
    component: _HoodiesVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-kids",
    name: "Kids Variant",
    component: _KidsVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-images",
    name: "Variant Image",
    component: _ImageVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-prices",
    name: "Variant Price",
    component: _PriceVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-merchant-prices",
    name: "Variant Merchant Price",
    component: _PriceMerchantVariant["default"],
    layout: "/main"
  }, {
    path: "/variant-description",
    name: "Variant Description",
    component: _DescriptionVariant["default"],
    layout: "/main"
  }]
}, {
  collapse: true,
  name: "Trademark",
  icon: "ni ni-map-big text-primary",
  state: "trademarkCollapse",
  views: [{
    path: "/trademark-approved",
    name: "Approved Keywords",
    component: _ApprovedWordList["default"],
    layout: "/main"
  }, {
    path: "/trademark-banned",
    name: "Banned Keywords",
    component: _BannedWordList["default"],
    layout: "/main"
  }, {
    path: "/trademark-classword",
    name: "Class Words",
    component: _TradeMarkClassWordList["default"],
    layout: "/main"
  }]
}, {
  path: "/keyword",
  name: "Keyword",
  icon: "ni ni-archive-2 text-primary",
  component: _KeywordList["default"],
  layout: "/main"
}, {
  path: "/artist",
  name: "Artist",
  icon: "ni ni-hat-3 text-green",
  component: _ArtistList["default"],
  layout: "/main"
}, {
  path: "/category",
  name: "Category",
  icon: "ni ni-map-big text-green",
  component: _category["default"],
  layout: "/main"
}, {
  path: "/performance",
  name: "Performance",
  icon: "ni ni-atom text-green",
  component: _Performance["default"],
  layout: "/main"
}, {
  collapse: true,
  name: "Setting",
  icon: "ni ni-settings text-green",
  state: "settingCollapse",
  views: [{
    path: "/setting",
    name: "General Setting",
    component: _setting["default"],
    layout: "/main"
  }, {
    path: "/etsy-setting",
    name: "Etsy Setting",
    component: _etsy["default"],
    layout: "/main"
  }]
}];
exports.routes = routes;
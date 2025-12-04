"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentfulClient = void 0;
var contentful_1 = require("contentful");
exports.contentfulClient = (0, contentful_1.createClient)({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONENTFUL_ACCESS_TOKEN,
});

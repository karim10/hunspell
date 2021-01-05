"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodehun = void 0;
var nodehun_1 = require("nodehun");
var fs_1 = require("fs");
var affix = fs_1.readFileSync('./dictionaries/en_us/en_us_med.aff');
var dictionary = fs_1.readFileSync('./dictionaries/en_us/en_us_med.dic');
exports.nodehun = new nodehun_1.Nodehun(affix, dictionary);

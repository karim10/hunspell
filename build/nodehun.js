"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodehun = void 0;
var nodehun_1 = require("nodehun");
var fs_1 = __importDefault(require("fs"));
var affix = fs_1.default.readFileSync('./dictionaries/en_us/en_us_med.aff');
var dictionary = fs_1.default.readFileSync('./dictionaries/en_us/en_us_med.dic');
exports.nodehun = new nodehun_1.Nodehun(affix, dictionary);

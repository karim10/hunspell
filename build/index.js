"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var nodehun_1 = require("./nodehun");
var fs = require('fs');
var app = express_1.default();
// only for local development
app.use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Cache-Control', 'public');
    next();
});
app.use(express_1.default.json({ limit: '50mb' }));
app.get('/', function (_req, res) {
    return res.status(200).send('Hunspell');
});
app.post('/spellSync', function (req, res) {
    var _a = req.body, locale = _a.locale, words = _a.words;
    var mispelledWords = words.filter(function (w) { return !nodehun_1.nodehun.spellSync(w.str); });
    return res.json(mispelledWords);
});
app.get('/suggestAsync/:locale/:word', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locale, word, suggestionResult;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('suggest async');
                _a = req.params, locale = _a.locale, word = _a.word;
                return [4 /*yield*/, nodehun_1.nodehun.suggest(word)];
            case 1:
                suggestionResult = _b.sent();
                return [2 /*return*/, res.json(suggestionResult || [])];
        }
    });
}); });
app.post('/spellAsync', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, locale, words, mispelledWords, i, spellResult;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, locale = _a.locale, words = _a.words;
                mispelledWords = [];
                console.time('api time');
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < words.length)) return [3 /*break*/, 4];
                return [4 /*yield*/, nodehun_1.nodehun.suggest(words[i].str)];
            case 2:
                spellResult = _b.sent();
                if (spellResult && spellResult.length > 0) {
                    mispelledWords.push(words[i]);
                }
                _b.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4:
                console.timeEnd('api time');
                return [2 /*return*/, res.json(mispelledWords)];
        }
    });
}); });
var port = process.env.port || 4000;
app.listen(port, function () {
    console.log("Hunspell server listetning on port " + port);
});

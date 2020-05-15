"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var ReactPlatform = /** @class */ (function () {
    function ReactPlatform() {
        this.name = 'React';
    }
    ReactPlatform.prototype.createElement = function (child) {
        var _this = this;
        if (child.type === null) {
            return child.props.content; // TextNode
        }
        var children = [];
        if (child.children && child.children.length >= 0) {
            children.push.apply(children, child.children.map(function (i) { return _this.createElement(i); }));
        }
        return React.createElement.apply(React, __spreadArrays([child.type, child.props], children));
    };
    ReactPlatform.prototype.render = function (root, id) {
        // build it first when render Hamburger child element
        root = 'build' in root ? root.build() : root;
        return react_dom_1.default.render(React.createElement(root), document.getElementById(id));
    };
    return ReactPlatform;
}());
exports.default = new ReactPlatform();

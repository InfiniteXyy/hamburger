"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var RootAttributes = ['staticClass', 'class', 'style', 'key', 'ref', 'refInFor', 'slot', 'scopedSlots', 'model'];
function mapChildren(children, h) {
    if (!children)
        return null;
    var result = [];
    for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
        var i = children_1[_i];
        if (i.type === null)
            result.push(i.props.content);
        else
            result.push(h(i.type, mapProps(i.props), mapChildren(i.children, h)));
    }
    return result;
}
function mapProps(props) {
    if (!props)
        return;
    var _props = {};
    for (var key in props) {
        if (key === 'className')
            _props.class = props[key];
        else if (RootAttributes.includes(key)) {
            _props[key] = props[key];
        }
        else if (key.startsWith('on')) {
            if (!_props.on)
                _props.on = {};
            _props['on'][key.substring(2).toLowerCase()] = props[key];
        }
        else {
            if (!_props.domProps)
                _props.domProps = {};
            _props.domProps[key] = props[key];
        }
    }
    return _props;
}
var VuePlatform = /** @class */ (function () {
    function VuePlatform() {
        this.name = 'Vue';
    }
    VuePlatform.prototype.createElement = function (child) {
        return child;
    };
    VuePlatform.prototype.render = function (root, id) {
        var meta = root.meta || {};
        new vue_1.default(__assign(__assign({}, meta), { render: function (h) {
                var _root = root.build.call(this, this);
                return h(_root.type, mapProps(_root.props), mapChildren(_root.children, h));
            } })).$mount('#' + id);
        return document.getElementById(id);
    };
    return VuePlatform;
}());
exports.default = new VuePlatform();

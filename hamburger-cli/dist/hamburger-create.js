"use strict";

var _enquirer = _interopRequireDefault(require("enquirer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_asyncToGenerator(function* () {
  var config = {
    name: '',
    type: '',
    engine: ''
  };

  function merge(obj) {
    Object.assign(config, obj);
  }

  merge((yield _enquirer.default.prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of your project?'
  })));
  merge((yield _enquirer.default.prompt({
    type: 'select',
    name: 'type',
    message: 'Select your project output type',
    choices: ['Static HTML', 'Reactive Application']
  })));

  if (config.type === 'Reactive Application') {
    merge((yield _enquirer.default.prompt({
      type: 'select',
      name: 'engine',
      message: 'Select your web engine',
      choices: ['Hamburger', 'React']
    })));
  }
})().catch(console.log);
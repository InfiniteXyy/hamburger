"use strict";

var {
  program
} = require('commander');

program.version('0.0.1', '-v, --version', 'show version of hamburger-cli');
program.command('create [name]', 'create a new hamburger-js project');
program.parse(process.argv);
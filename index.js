#!/usr/bin/env node

'use strict';

const chalk = require('chalk');

const currentNodeVersion = process.versions.node;
const semver = currentNodeVersion.split('.');
const major = semver[0];

if (major < 8) {
    console.error(
        chalk.red(
            '当前 Node 版本' +
            currentNodeVersion +
            '.\n' +
            '请更新 Node >= 8.'
        )
    );
    process.exit(1);
}

require('./cli');

'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const program = require('commander');
const guidoService = require('guido');

const CWD = process.cwd();
process.env.GUIDO_CWD = CWD;

const pkg = require(path.resolve(__dirname, 'package.json'));


// set version
program
    .version(pkg.version, '-v, --version')
    .usage('<command> [options]');


// set command
// program
//     .command('init')
//     .description('初始化项目')
//     .action((name, cmd) => {
//
//     });

program
    .command('build')
    .description('构建项目')
    .option('-c, --context <dir>', '基础目录 (默认: 当前目录)')
    .action((name, cmd) => {
        new guidoService().build();
    });


program
    .command('start')
    .description('启动本地服务')
    .option('-c, --context <dir>', '基础目录 (默认: 当前目录)')
    .action((name, cmd) => {
        new guidoService().server();
    });


// output help information on unknown commands
program
    .arguments('<command>')
    .action((cmd) => {
        program.outputHelp();
        console.log(`  ` + chalk.red(`${chalk.yellow(cmd)} 未知命令。`));
        console.log();
        // suggestCommands(cmd);
    });

// add some useful info on help
program.on('--help', () => {
    console.log();
    console.log(`  运行 ${chalk.cyan(`guido <command> --help`)} 了解该命令的详细用法。`);
    console.log();
});

program.commands.forEach((c) => {
    c.on('--help', () => {
        console.log();
    });
});

// parse args
program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}

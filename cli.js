#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const { promisify } = require('util');
const { Command } = require('commander');
const colors = require('colors');
const Ora = require('ora');

const spinner = new Ora();
const program = new Command();

const sleep = promisify(setTimeout);

program
	.command('pkgs')
	.description('package list')
	.option('-d, --debug', 'debug mode')
	.action(async (cmd) => {
		const options = cmd.opts();

		if (options.debug) {
			console.log();
			console.log(`options.debug: ${options.debug}`);
			console.log();
		}

		spinner.start(colors.yellow('pkgs..'));

		await sleep(1000);

		try {
			execSync('npm ls --depth=0');
		} catch (e) {
			spinner.fail(colors.red('fail.'));
			console.error();
			console.error(colors.red(e.message));
			return;
		}

		spinner.succeed(colors.green('pkgs done.'));
	})
  .on('--help', () => {
    console.log();
    console.log('Examples:');
    console.log('  $ npx @foundy/test-pack pkgs -d');
	});

program
	.command('global-link')
	.description('global link')
	.option('-d, --debug', 'debug mode')
	.action(async (cmd) => {
		const options = cmd.opts();

		spinner.start(colors.yellow('global link..'));

		await sleep(1000);

		try {
			execSync('npm ls -g --depth=0 --link=true');
		} catch (e) {
			spinner.fail(colors.red('fail.'));
			console.error();
			console.error(colors.red(e.message));
			return;
		}

		spinner.succeed(colors.green('global link done.'));
	});

	program
	.command('create-link')
	.description('create link')
	.option('-d, --debug', 'debug mode')
	.action(async (cmd) => {
		const options = cmd.opts();

		spinner.start(colors.yellow('create link..'));

		await sleep(1000);

		try {
			execSync('npm link');
		} catch (e) {
			spinner.fail(colors.red('fail.'));
			console.error();
			console.error(colors.red(e.message));
			return;
		}

		spinner.succeed(colors.green('create link done.'));
	});

	program
		.command('info')
		.description('show info')
		.options('-d, --debug', 'debug mode')
		.action(async (cmd) => {
			const options = cmd.opts();

			spinner.start(colors.yellow('global link..'));

			await sleep(1000);

			try {
				console.log();
				console.log(`process.cwd(): ${process.cwd()}`);
				console.log();
			} catch (e) {
				spinner.fail(colors.red('fail.'));
				console.error();
				console.error(colors.red(e.message));
				return;
			}

			spinner.succeed(colors.green('global link done.'));
		});

program.parse(process.argv);

program.args.length || program.help();

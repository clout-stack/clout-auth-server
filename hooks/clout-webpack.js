/*!
 * clout-webpack
 * Copyright(c) 2015 - 2016 Muhammad Dadu
 * MIT Licensed
 */
const debug = require('debug')('clout-webpack:hooks');
const webpack = require('webpack');
const express = require('express');
const path = require('path');
const fs = require('fs');
const {merge} = require('lodash');

module.exports = {
	webpack: {
		event: 'start',
		priority: 'CONTROLLER',
		fn: function (next) {
			let cloutWebpack = new CloutWebpack(this);
			console.log('building webpack');

			cloutWebpack.startHook()
				.then(() => next())
				.catch((error) => {
					console.log(error);
					next(error)
				});
		}
	}
};

const COMPILER_WATCH_OPTIONS = {
	aggregateTimeout: 300,
	poll: true
};

class CloutWebpack {
	constructor(clout) {
		this.clout = clout;
		this.compiler = null;
		this.hasRunOnce = false;
	}

	startHook() {
		let webpackConfig = this.clout.config.webpack;

		if (!webpackConfig) {
			return Promise.reject(`webpack config not found`);
		}

		this.compiler = webpack(webpackConfig);

		return new Promise((resolve, reject) => {
			switch (this.clout.config.env) {
				case 'production':
					return this.compiler.run((err, stats) => {
						if (!this.hasRunOnce) {
							this.hasRunOnce = true;
							if (err) { return reject(err); }
							resolve();
						}

						this.onCompilerRun(err, stats);
					});
					break;
				default:
					return this.compiler.watch(COMPILER_WATCH_OPTIONS, (err, stats) => {
						if (!this.hasRunOnce) {
							this.hasRunOnce = true;
							if (err) { return reject(err); }
							resolve();
						}

						this.onCompilerWatch(err, stats);
					});
					break;
			}
		})
		.then(() => {
			this.clout.app.use(express.static(this.compiler.outputPath));
			// TODO:- create router for the react. Tap-into react router? bridge webpack and set paths?
			// this.clout.app.use('*', express.static(this.compiler.outputPath));
		});
	}

	onCompilerError(err) {
		console.error(err);
	}

	onCompilerSuccess(stats) {
		let durationInMS = stats.endTime - stats.startTime;
		let duration = durationInMS / 1000;
		console.info('successfully build webpack');
		console.info(`duration: ${duration}s`);
	}

	onCompilerWatch(err, stats) {
		if (err) { this.onCompilerError(err); }
		this.onCompilerSuccess(stats);
	}

	onCompilerRun(err, stats) {
		if (err) { this.onCompilerError(err); }
		this.onCompilerSuccess(stats);
	}
};

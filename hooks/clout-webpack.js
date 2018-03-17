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
			this.cloutWebpack = new CloutWebpack(this);
			this.logger.info('building webpack');

			this.cloutWebpack.startHook()
				.then(() => next())
				.catch((error) => {
					this.logger.error(error);
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
		let jsApiMap = this.getJSAPIMap();
		let buildAction;

		if (!webpackConfig) {
			return Promise.reject(`webpack config not found`);
		}

		webpackConfig.plugins.push(new webpack.DefinePlugin({
			"cloutApiMap": JSON.stringify(jsApiMap)
		}));

		this.compiler = webpack(webpackConfig);

		if (this.hasRunOnce) {
			buildAction = () => Promise.reject('cannot start hook again, already running');
		} else if (this.clout.config.env === 'production') {
			buildAction = () => this.build();
		} else {
			buildAction = () => this.watch();
		}

		return buildAction()
			.then(({ durationInMS, duration }) => {
				this.clout.logger.info('successfully build webpack');
				this.clout.logger.info(`duration: ${duration}s`);
			})
			.then(() => {
				if (this.clout.config.env === 'development') {
					this.clout.app.use(require("webpack-hot-middleware")(this.compiler));
				}

				this.clout.app.use(express.static(this.compiler.outputPath));
			});
	}

	build() {
		return new Promise((resolve, reject) => {
			this.compiler.run((err, stats) => {
				this.onCompilerRun(err, stats).then(resolve).catch(reject);
			});
		});
	}

	watch() {
		return new Promise((resolve, reject) => {
			return this.compiler.watch(COMPILER_WATCH_OPTIONS, (err, stats) => {
				this.onCompilerWatch(err, stats).then(resolve).catch(reject);
			});
		});
	}

	getJSAPIMap() {
		let jsAPIMap = {};
		let routes = this.clout.core.api.routes;

		Object.keys(routes).forEach((key) => {
			let paths = routes[key];
			jsAPIMap[key] = {};

			paths.forEach((route) => {
				jsAPIMap[key][route.name] = {
					path: route.path,
					methods: route.methods,
					params: route.params
				};
			});
		});

		return jsAPIMap;
	}

	onCompilerError(err) {
		this.clout.logger.error(err);
	}

	onCompilerSuccess(stats) {
		let durationInMS = stats.endTime - stats.startTime;
		let duration = durationInMS / 1000;

		return Promise.resolve({ durationInMS, duration });
	}

	onCompilerWatch(err, stats) {
		if (err) { return this.onCompilerError(err); }
		return this.onCompilerSuccess(stats);
	}

	onCompilerRun(err, stats) {
		if (err) { return this.onCompilerError(err); }
		return this.onCompilerSuccess(stats);
	}
};

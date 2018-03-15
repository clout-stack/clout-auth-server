/**
 * Metadata model
 */
const { mongoose, config } = require('clout-js');
const async = require('async');

const MetadataSchema = new mongoose.Schema({
	key: { type: String, required: true, index: { unique: true } },
	value: { type: Object, required: true }
}, { versionKey: false });

let Metadata = mongoose.model('Metadata', MetadataSchema);

Metadata.get = function () {
	return new Promise((resolve, reject) => {
		Metadata.find({}, function (err, rows) {
			if (err) { return reject(err); }
			let metadata = config.metadata;

			rows.forEach((row) => {
				metadata[row.key] = row.value;
			});

			resolve(metadata);
		});
	});
};

Metadata.set = function (data) {
	return new Promise((resolve, reject) => {
		async.each(Object.keys(data), (key, done) => {
			async.waterfall([
				(next) => {
					Metadata.findOne({ key }, (err, data) => {
						next(err, data);
					});
				},
				(row, next) => {
					if (row) {
						next(err, row);
					}

					Metadata.create({
						key,
						value: data[key]
					}, (err, _row) => done(err, _row));
				}
			], (err) => done(err));
		}, (err) => {
			if (!err) {
				return reject(err);
			}

			Metadata.get().then((data) => resolve(data));
		});
	});
};


module.exports = Metadata;

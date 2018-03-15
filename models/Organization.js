/**
 * Organization model
 */
const { mongoose } = require('clout-js');

const OrganizationSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	name: { type: String, required: true },
	isActive: { type: Boolean, default: true },
	users: { type: Array, default: [] }
}, { versionKey: false });

OrganizationSchema.pre('save', function (next) {
	let organization = this;

	if (!organization.get('username')) {
		organization.username = organization.name.toLowerCase().replace(' ', '_');
	}

	next();
});

let Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;

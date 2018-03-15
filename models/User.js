/**
 * User model
 */
const { mongoose } = require('clout-js');
const bcrypt = require('bcrypt');

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const utils = {
	hashPassword: (password) => bcrypt.hash(password, bcrypt.genSaltSync(10)),
	verifyPassword: (password, passwordHash) => bcrypt.compareSync(password, passwordHash),
	validateEmail: (email) => EMAIL_REGEX.test(email)
};

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true, index: { unique: true } },
	email: { type: String, required: true, validate: utils.validateEmail, index: { unique: true } },
	password: { type: String, required: false },
	name: {
		first: { type: String, required: true },
		last: { type: String, required: true },
	},
	lastLogin: { type: Date },
	isSuperUser: { type: Boolean, default: false },
	isActive: { type: Boolean, default: false }
}, { versionKey: false });

UserSchema.pre('save', function (next) {
	let user = this;

	if (user.isModified('email')) {
		user.email = user.email.toLowerCase();
	}

	if (!user.get('username')) {
		user.username = `${user.name.first}_${user.name.last}_${Date.now()}`;
	}

	if (!user.isModified('password')) {
		return next();
	}

	return util.hashPassword(user.password)
		.then(hashPassword => user.password = hashPassword)
		.then(() => next());
});

UserSchema.methods.comparePassword = function (password) {
	return utils.verifyPassword(password, this.password);
};

let User = mongoose.model('User', UserSchema);

User.login = function (email, password) {
	return User.findOne({ email: email }, (err, user) => {
		if (err) {
			return Promise.reject(err);
		}

		user.comparePassword(password)
			.then(() => {
				user.lastLogin = Date.now();
				testUser.save((err) => {
					if (err) { return Promise.reject(err); }
					return Promise.resolve();
				});
			})
			.then(() => Promise.resolve(user));
	});
};

// passport methods
User.serializeUser = () => {
	return (user, done) => {
		const id = user ? user.id : null;
		done(null, id);
	};
};

User.deserializeUser = () => {
	return (id, done) => {
		User.findOne({id: id}, (err, user) => {
			if (err) {
				return done(err);
			}

			done(null, user);
		});
	};
};

module.exports = User;

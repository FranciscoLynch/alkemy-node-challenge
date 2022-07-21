const { User } = require('../models/users');


async function createUser(name, lastname, email, pwHashed) {

	const x = await User.create({
		name: name,
		lastname: lastname,
		email: email,
		password: pwHashed,
		admin: true
	});

	return x;
}

async function findUser(email) {

	const x = await User.findOne({
		where: {
			email: email
		}
	});

	return x;
}

async function findAllUsers() {
	const x = await User.findAll();
	return x;
}

async function findAndEdit(id, name, lastname, email, password) {

	const x = await User.findOne({
		where: {
			id: id
		}
	}).then((user) => {
		user.update({
			name: name,
			lastname: lastname,
			email: email,
			password: password
		});
	});

	return x;
}

async function destroyUser(id) {

	const x = await User.destroy({
		where: {
			id: id
		}
	});

	return x;
}


module.exports = {
	createUser,
	findUser,
	findAllUsers,
	findAndEdit,
	destroyUser
};
const UserModel = require("../../../database/models/User");

class UserRepository {

	async create(id, email, hash, token) {
		await UserModel.create({
			id: id,
			email: email,
			password: hash,
			verificationToken: token,
		});
	}

	async verifyEmail(email, token) {
		const { Op } = require("sequelize");
		await UserModel.update(
			{ verifiedEmail: true },
			{
				where: {
					[Op.and]: [
						{ email: email },
						{ verificationToken: token }
					]
				}
			}
		);
	}

	async delete(id) {
		await UserModel.destroy({
			where: {
				id: id
			}
		});
	}

	async findEmailById(id) {
		const userEmail = await UserModel.findOne({
			where: { id: id },
			attributes: ["email"]
		});
		return userEmail;
	}

	async findEmailByEmail(email) {
		try {
			const userEmail = await UserModel.findOne({
				where: { email: email },
				attributes: ["email"]
			});
			return userEmail;
		}

		catch(e) {
			console.log(e);
		}
	}

	async findByEmailVerified(email) {
		const { Op } = require("sequelize");
		const userEmail = await UserModel.findOne({
			where: {
				[Op.and]: [
					{ email : email},
					{ verifiedEmail: true }
				]
			},
			attributes: ["email"]
		});
		return userEmail;
	}

	async getId(email) {
		const { id } = await UserModel.findOne({
			attributes: ["id"],
			where: {
				email: email,
			},
		});

		return id;
	}

	async getPasswordById(id) {
		const { password } = await UserModel.findOne({
			attributes: ["password"],
			where: { id : id }
		});
        
		return password;
	}

	async getPasswordByEmail(email) {
		const { password } = await UserModel.findOne({
			attributes: ["password"],
			where: { email : email }
		});
        
		return password;
	}

	async findVerficationTokenById(id, verificationToken) {
		const { Op } = require("sequelize");
		const userVerificationToken = await UserModel.findOne({
			attributes: ["verificationToken"],
			where: {
				[Op.and]: [
					{ id: id }, 
					{ verificationToken: verificationToken }
				],
			},
		});
		return userVerificationToken;
	}

	async findVerificationTokenByEmail(email, verificationToken) {
		const { Op } = require("sequelize");
		const userVerificationToken = await UserModel.findOne({
			attributes: ["verificationToken"],
			where: {
				[Op.and]: [
					{ email: email }, 
					{ verificationToken: verificationToken }
				],
			},
		});
		return userVerificationToken;
	}

	async updateVerificationTokenById(id, verificationToken) {
		await UserModel.update(
			{ verificationToken: verificationToken },
			{
				where: {
					id: id,
				},
			}
		);
	}

	async updateVerificationTokenByEmail(email, verificationToken) {
		await UserModel.update(
			{ verificationToken: verificationToken },
			{
				where: {
					email: email,
				},
			}
		);
	}

	async getVerficationTokenExpiryDateById(id, verificationToken) {
		const { Op } = require("sequelize");
		const { verificationTokenExpiryDate } = await UserModel.findOne({
			attributes: ["verificationTokenExpiryDate"],
			where: {
				[Op.and]: [
					{ id: id }, 
					{ verificationToken: verificationToken }
				],
			},
		});
		return verificationTokenExpiryDate;
	}

	async getVerificationTokenExpiryDateByEmail(email, verificationToken) {
		const { Op } = require("sequelize");
		const { verificationTokenExpiryDate } = await UserModel.findOne({
			attributes: ["verificationTokenExpiryDate"],
			where: {
				[Op.and]: [
					{ email: email }, 
					{ verificationToken: verificationToken }
				],
			},
		});
		return verificationTokenExpiryDate;
	}
    
	async updateVerificationTokenExpiryDateById(id, verificationTokenExpiryDate) {
		await UserModel.update(
			{ verificationTokenExpiryDate: verificationTokenExpiryDate  },
			{
				where: {
					id: id,
				},
			}
		);
	}

	async updateVerificationTokenExpiryDateByEmail(email, verificationTokenExpiryDate) {
		await UserModel.update(
			{ verificationTokenExpiryDate: verificationTokenExpiryDate },
			{
				where: {
					email: email,
				},
			}
		);
	}

	async updateEmail(id, email) {
		await UserModel.update(
			{ email: email },
			{
				where: {
					id: id,
				},
			}
		);
	}

	async updatePasswordById(id, passwordNew) {
		await UserModel.update(
			{ password: passwordNew },
			{
				where: {
					id: id,
				},
			}
		);
	}
    
	async updatePasswordByEmail(email, passwordNew) {
		await UserModel.update(
			{ password: passwordNew },
			{
				where: {
					email: email,
				},
			}
		);
	}
}


module.exports = {
	UserRepository
};
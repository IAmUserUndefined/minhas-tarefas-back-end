const { UnauthorizedError } = require("../errors/index");

require("dotenv/config");

const uuid = require("uuid");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = class Helper {

	static getAppUrlEnvironmentVariable(){
		return process.env.APP_URL;
	}

	static getEmailEnvironmentVariable(){
		return process.env.EMAIL;
	}

	static getEmailPasswordEnvironmentVariable(){
		return process.env.EMAIL_PASSWORD;
	}

	static getSecretKeyJwtEnvironmentVariable(){
		return process.env.SECRET_KEY_JWT;
	}

	static getDatabaseUsernameEnvironmentVariable(){
		return process.env.DB_USERNAME;
	}

	static getDatabasePasswordEnvironmentVariable(){
		return process.env.DB_PASSWORD;
	}
    
	static getDatabaseNameEnvironmentVariable(){
		return process.env.DB_NAME;
	}

	static getDatabasePortEnvironmentVariable(){
		return process.env.DB_PORT;
	}

	static getDatabaseDialectEnvironmentVariable(){
		return process.env.DB_DIALECT;
	}

	static getHostEnvironmentVariable(){
		return process.env.HOST;
	}
    
	static createId() {
		return uuid.v4();
	}

	static createToken() {
		return crypto.randomBytes(15).toString("hex");
	}

	static createTokenExpiryDate() {
		return new Date().setMinutes(new Date().getMinutes() + 10);
	}

	static createJwt(user) {
		return jwt.sign(user, this.getSecretKeyJwtEnvironmentVariable(), { expiresIn: 7200 } );
	}

	static jwtVerify(tokenJwt){

		try {

			const decode = jwt.verify(tokenJwt, this.getSecretKeyJwtEnvironmentVariable());

			return decode;
		}

		catch { return new UnauthorizedError("Token Inválido, logue-se novamente"); }

	}

	static isPasswordValid(password){
		return {
			result: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?:([0-9a-zA-Z])){8,}$/.test(password),
			message: "Sua senha precisa ter 8 caracteres, uma letra maiúscula, uma minúscula e um número"
		};
	}

	static encryptPassword(password){
		return bcrypt.hashSync(password, 10);
	}

	static compareEncryptPassword(password, userPassword){
		return bcrypt.compareSync(password, userPassword);
	}
};
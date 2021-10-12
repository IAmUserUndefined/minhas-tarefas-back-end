"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
 
		await queryInterface.createTable("tasks", 
			{ 
				id: {
					type: Sequelize.STRING,
					primaryKey: true,
					allowNull: false
				},

				userId:{
					type: Sequelize.STRING,
					allowNull: false,
					references: {model: "users", key:"id"},
					onUpdate: "CASCADE",
					onDelete: "CASCADE",
				},

				taskName: {
					type: Sequelize.STRING,
					allowNull: false
				},

				date: {
					type: Sequelize.DATEONLY,
					allowNull: false
				},
       
				status: {
					type: Sequelize.BOOLEAN,
					allowNull: true
				},

				createdAt: {
					type: Sequelize.DATE,
					allowNull: false
				},

				updatedAt: {
					type: Sequelize.DATE,
					allowNull: false
				}

			});
	},

	down: async (queryInterface) => {

		await queryInterface.dropTable("tasks");
     
	}
};
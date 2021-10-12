"use strict";

module.exports = {
	up: async (queryInterface) => {
		return queryInterface.removeColumn(
			"tasks",
			"date"
		);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.addColumn(
			"tasks",
			"date",
			{
				type: Sequelize.DATEONLY
			}
		);
	}
};

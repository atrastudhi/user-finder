const Sequelize = require('sequelize');
const config = require('../config/db');

const DM = config.define('DirectMessage', {
    user_id: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content_dm: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date()
    }
}, {
})

module.exports = DM;
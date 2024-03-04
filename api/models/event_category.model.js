const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const Event_Category = sequelize.define(
    'event_category',
    {

    },
    { timestamps: false }
)

module.exports = Event_Category

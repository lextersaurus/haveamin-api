const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const EventModel = sequelize.define('event',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        place: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        ageMin: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ageMax: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isAccessible: {
            type: DataTypes.BOOLEAN,
        },
        isFree: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
        }
    },
    { timestamps: false }
)

module.exports = EventModel

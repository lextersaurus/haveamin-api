const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const User_Event = sequelize.define('user_event',
    {
        status: {
            type: DataTypes.STRING,
            defaultValue: 'Accepted',
            allowNull: false,
            validate: {
                isIn: [['Accepted', 'Pending', 'Rejected']]
            }
        },
       rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
       comment: {
            type: DataTypes.STRING
        }
    },
    { timestamps: false }
)

module.exports = User_Event

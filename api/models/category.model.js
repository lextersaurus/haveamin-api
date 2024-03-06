const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const CategoryModel = sequelize.define('category',
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    { timestamps: false }
)

module.exports = CategoryModel

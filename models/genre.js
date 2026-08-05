// models/genre.js
module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define("Genre", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Genre;
};
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
        },
        deskripsi: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: "genre",
        timestamps: true
    });

    Genre.associate = (models) => {
        // ...
    };

    return Genre;
};
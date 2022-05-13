const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("activity", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    difficulty: {
      type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    info: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "Unknown",
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        "https://www.villazulcabodegata.com/sites/default/files/styles/news-image/public/imagenes_novedades/actividades-y-turismo-activo-villazul-cabo-de-gata-1.jpg?itok=-OVTpDXY",
    },
    season: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM("Spring", "Summer", "Winter", "Autumn")
      ),
      allowNull: true,
      defaultValue: [],
    },
  });
};

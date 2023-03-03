const S = require("sequelize");
const db = require("../db");

class Favorite extends S.Model {}

Favorite.init(
  {
    mediaId: {
      type: S.INTEGER,
      allowNull: false,
    },
    mediaType: {
      type: S.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "favorite",
  }
);

module.exports = Favorite;

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('weather', {
    city: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    date: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    max: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    min: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    kind: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    }
  }, {
    tableName: 'weather',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
};

/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ChooseTable', {
    choose_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    choose_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    wei_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    is_favorite: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    choose_result: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ChooseTable',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
};

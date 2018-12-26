/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('select_infor', {
    selection_id: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    choose_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shop_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    focus_value: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    shop_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'select_infor',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
};

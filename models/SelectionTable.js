/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('SelectionTable', {
    selection_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
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
    }
  }, {
    tableName: 'SelectionTable',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
};

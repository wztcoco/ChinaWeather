/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ShopTable', {
    shop_id: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    },
    shop_type_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shop_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shop_intro: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    shop_image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'ShopTable',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
};

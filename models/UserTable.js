/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserTable', {
    user_id: {
      type: DataTypes.INTEGER(255),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    user_phone: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'UserTable',
    freezeTableName: true,
    timestamps: false,
    underscored: true
  });
};

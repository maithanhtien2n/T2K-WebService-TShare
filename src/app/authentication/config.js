const sequelize = require("../../configs/connectDatabase");
const { DataTypes } = require("sequelize");

const Account = sequelize.define(
  "Account",
  {
    account_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "accounts",
    timestamps: false,
  }
);

const UsersInfo = sequelize.define(
  "UsersInfo",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    introduce: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marital_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "users_info",
    timestamps: false,
  }
);

module.exports = {
  Account,
  UsersInfo,
};

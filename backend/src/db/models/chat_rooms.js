const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const chat_rooms = sequelize.define(
    'chat_rooms',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  chat_rooms.associate = (db) => {
    db.chat_rooms.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.chat_rooms.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return chat_rooms;
};

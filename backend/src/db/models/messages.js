const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const messages = sequelize.define(
    'messages',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      text: {
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

  messages.associate = (db) => {
    db.messages.belongsTo(db.users, {
      as: 'from_user',
      constraints: false,
    });

    db.messages.belongsTo(db.chat_rooms, {
      as: 'chat_room',
      constraints: false,
    });

    db.messages.belongsTo(db.users, {
      as: 'to_user',
      constraints: false,
    });

    db.messages.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.messages.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return messages;
};

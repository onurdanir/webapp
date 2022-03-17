const db = require('../db/models');
const Chat_roomsDBApi = require('../db/api/chat_rooms');

module.exports = class Chat_roomsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await Chat_roomsDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let chat_rooms = await Chat_roomsDBApi.findBy({ id }, { transaction });

      if (!chat_rooms) {
        throw new ValidationError('chat_roomsNotFound');
      }

      await Chat_roomsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return chat_rooms;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      if (currentUser.role !== 'admin') {
        throw new ValidationError('errors.forbidden.message');
      }

      await Chat_roomsDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

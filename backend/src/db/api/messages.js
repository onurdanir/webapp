const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class MessagesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const messages = await db.messages.create(
      {
        id: data.id || undefined,

        text: data.text || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await messages.setFrom_user(data.from_user || null, {
      transaction,
    });

    await messages.setChat_room(data.chat_room || null, {
      transaction,
    });

    await messages.setTo_user(data.to_user || null, {
      transaction,
    });

    return messages;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const messages = await db.messages.findByPk(id, {
      transaction,
    });

    await messages.update(
      {
        text: data.text || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await messages.setFrom_user(data.from_user || null, {
      transaction,
    });

    await messages.setChat_room(data.chat_room || null, {
      transaction,
    });

    await messages.setTo_user(data.to_user || null, {
      transaction,
    });

    return messages;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const messages = await db.messages.findByPk(id, options);

    await messages.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await messages.destroy({
      transaction,
    });

    return messages;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const messages = await db.messages.findOne({ where }, { transaction });

    if (!messages) {
      return messages;
    }

    const output = messages.get({ plain: true });

    output.from_user = await messages.getFrom_user({
      transaction,
    });

    output.chat_room = await messages.getChat_room({
      transaction,
    });

    output.to_user = await messages.getTo_user({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    if (filter.page != 1 && filter.page) {
      const currentPage = +filter.page - 1;
      offset = currentPage * limit;
    }
    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'from_user',
      },

      {
        model: db.chat_rooms,
        as: 'chat_room',
      },

      {
        model: db.users,
        as: 'to_user',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.text) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('messages', 'text', filter.text),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.from_user) {
        var listItems = filter.from_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          from_userId: { [Op.or]: listItems },
        };
      }

      if (filter.chat_room) {
        var listItems = filter.chat_room.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          chat_roomId: { [Op.or]: listItems },
        };
      }

      if (filter.to_user) {
        var listItems = filter.to_user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          to_userId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = await db.messages.findAndCountAll({
      where,
      include,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy ? [orderBy.split('_')] : [['createdAt', 'DESC']],
      transaction,
    });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('messages', 'text', query),
        ],
      };
    }

    const records = await db.messages.findAll({
      attributes: ['id', 'text'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['text', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.text,
    }));
  }
};

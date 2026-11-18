const prisma = require('../config/db');

const TaskModel = {
  findAllByUser(userId, { status, search } = {}) {
    return prisma.task.findMany({
      where: {
        userId,
        ...(status && { status }),
        ...(search && { title: { contains: search, mode: 'insensitive' } }),
      },
      orderBy: { createdAt: 'desc' },
    });
  },

  findOne(id, userId) {
    return prisma.task.findFirst({ where: { id, userId } });
  },

  create(data) {
    return prisma.task.create({ data });
  },

  update(id, data) {
    return prisma.task.update({ where: { id }, data });
  },

  remove(id) {
    return prisma.task.delete({ where: { id } });
  },
};

module.exports = TaskModel;

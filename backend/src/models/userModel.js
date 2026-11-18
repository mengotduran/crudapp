const prisma = require('../config/db');

const publicFields = { id: true, name: true, email: true, createdAt: true };

const UserModel = {
  findByEmail(email) {
    return prisma.user.findUnique({ where: { email } });
  },

  findById(id) {
    return prisma.user.findUnique({ where: { id }, select: publicFields });
  },

  create(data) {
    return prisma.user.create({ data, select: publicFields });
  },
};

module.exports = UserModel;

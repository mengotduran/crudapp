const TaskModel = require('../models/taskModel');
const HttpError = require('../utils/HttpError');

const STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'];
const PRIORITIES = ['LOW', 'MEDIUM', 'HIGH'];

const parseId = (value) => {
  const id = Number(value);
  if (!Number.isInteger(id)) throw new HttpError(400, 'Invalid task id');
  return id;
};

const buildTaskData = (body, { partial = false } = {}) => {
  const data = {};

  if (body.title !== undefined || !partial) {
    const title = body.title?.trim();
    if (!title) throw new HttpError(400, 'Title is required');
    data.title = title;
  }
  if (body.description !== undefined) {
    data.description = body.description?.trim() || null;
  }
  if (body.status !== undefined) {
    if (!STATUSES.includes(body.status)) throw new HttpError(400, 'Invalid status');
    data.status = body.status;
  }
  if (body.priority !== undefined) {
    if (!PRIORITIES.includes(body.priority)) throw new HttpError(400, 'Invalid priority');
    data.priority = body.priority;
  }
  if (body.dueDate !== undefined) {
    if (!body.dueDate) {
      data.dueDate = null;
    } else {
      const date = new Date(body.dueDate);
      if (Number.isNaN(date.getTime())) throw new HttpError(400, 'Invalid due date');
      data.dueDate = date;
    }
  }

  return data;
};

const findOwnedTask = async (req) => {
  const task = await TaskModel.findOne(parseId(req.params.id), req.userId);
  if (!task) throw new HttpError(404, 'Task not found');
  return task;
};

exports.list = async (req, res) => {
  const { status, search } = req.query;
  if (status && !STATUSES.includes(status)) throw new HttpError(400, 'Invalid status');
  const tasks = await TaskModel.findAllByUser(req.userId, { status, search });
  res.json({ tasks });
};

exports.show = async (req, res) => {
  res.json({ task: await findOwnedTask(req) });
};

exports.create = async (req, res) => {
  const task = await TaskModel.create({ ...buildTaskData(req.body), userId: req.userId });
  res.status(201).json({ task });
};

exports.update = async (req, res) => {
  const existing = await findOwnedTask(req);
  const task = await TaskModel.update(existing.id, buildTaskData(req.body, { partial: true }));
  res.json({ task });
};

exports.remove = async (req, res) => {
  const existing = await findOwnedTask(req);
  await TaskModel.remove(existing.id);
  res.status(204).end();
};

const { Router } = require('express');
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

const router = Router();

router.use(auth);

router.route('/')
  .get(taskController.list)
  .post(taskController.create);

router.route('/:id')
  .get(taskController.show)
  .put(taskController.update)
  .delete(taskController.remove);

module.exports = router;

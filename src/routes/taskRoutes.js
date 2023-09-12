const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Define routes for tasks
router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:taskId', taskController.getTaskById);
router.put('/:taskId', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;

const Task = require('../models/task');

// Controller logic for tasks
exports.getAllTasks = (req, res) => {
    Task.find({})
        .then((tasks) => {
            res.status(200).json(tasks);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        });
};

exports.createTask = async (req, res) => {
    try {
        // Destructure the request body to get the data for the new task
        const { title, description, completed } = req.body;

        // Check if required fields are provided
        if (!title || !description || completed === undefined) {
            return res.status(400).json({ error: 'title, description, and completed fields are required.' });
        }

        // Check data types
        if (typeof title !== 'string' || typeof description !== 'string' || typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Invalid data types for one or more fields.' });
        }

        // Create a new task
        const newTask = new Task({
            title,
            description,
            completed,
        });

        // Save the task to the database
        const savedTask = await newTask.save();

        // Respond with the saved task
        res.status(201).json(savedTask);
    } catch (error) {
        // Handle any errors that occur during the creation process
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getTaskById = (req, res) => {
    const taskId = req.params.taskId;

    Task.findById(taskId, (err, task) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!task) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(200).json(task);
        }
    });
};

exports.updateTask = (req, res) => {
    const taskId = req.params.taskId;
    const updateData = req.body;

    Task.findByIdAndUpdate(
        taskId,
        updateData,
        { new: true },
        (err, updatedTask) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error' });
            } else if (!updatedTask) {
                res.status(404).json({ error: 'Task not found' });
            } else {
                res.status(200).json(updatedTask);
            }
        }
    );
};

exports.deleteTask = (req, res) => {
    const taskId = req.params.taskId;

    Task.findByIdAndRemove(taskId, (err, deletedTask) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else if (!deletedTask) {
            res.status(404).json({ error: 'Task not found' });
        } else {
            res.status(204).send();
        }
    });
};

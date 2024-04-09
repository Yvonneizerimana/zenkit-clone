import TaskModel from '../models/task.model.js';

export const test = (req, res, next) => {
    res.send('Hello World!');
}

export const addTask = async (req, res, next) => {
    try {
        const newTask = await TaskModel.create(req.body);
        return res.status(201).json(newTask);

    } catch (error) {
        return res.status(500).json({ message: error.message.split(":")[2].trim() });
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({});
        if (tasks) {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error'});
    }
}

export const updateTask = async (req, res, next) => {
    const taskId = req.query.id;
    const updates = req.body;
    
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId,updates,{new:true});
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found'});
        } 
        return res.status(200).json(updatedTask);
    } catch (error) {
        return res.status(500).json({ message: 'Server error'});
    }
}

export const findById = async (req, res, next) => {
    const taskId = req.query.id;
    
    try {
        const foundTask = await TaskModel.findById(taskId);
        if (!foundTask) {
            return res.status(404).json({ message: "Task not found"});
        }
        return res.status(200).json(foundTask);
    } catch (error) {
        return res.status(500).json({ message: 'Server error'});
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.query.id);
        return res.status(200).json({ message: 'Task deleted'});
    } catch (error) {
        return res.status(500).json({ message: 'Server error'});
    }
}
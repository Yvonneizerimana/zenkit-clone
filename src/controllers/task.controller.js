import TaskModel from '../models/task.model.js';

export const test = (req, res, next) => {
    res.send('Hello World!');
}


export const setTime = async (req, res, next) => {
    console.log(req.body.dueDate);
    var startTime = "";
    var endTime = "";
    var durationTime = "";
    var durationType = "";

    if (req.body.dueDate.startDate) {
        startTime = new Date(req.body.dueDate.startDate).toLocaleTimeString();
    }
    if (req.body.dueDate.endDate && req.body.dueDate.startDate) {
        endTime = new Date(req.body.dueDate.endDate).toLocaleTimeString();
    }

    if (req.body.dueDate.endDate && req.body.dueDate.startDate) {
        let dur = new Date(req.body.dueDate.endDate) - new Date(req.body.dueDate.startDate);
        let hours = Math.round(dur / (1000 * 60 * 60));
        let minutes = Math.round(dur / (1000 * 60));
        let days = Math.round(hours / 24);
        let weeks = Math.round(days / 7);
        let months = Math.round(days / 30);

        if (months > 0) {
            durationTime = months;
            durationType = "Months";
        } else if (weeks > 0) {
            durationTime = weeks;
            durationType = "Weeks";
        } else if (days > 0) {
            durationTime = days;
            durationType = "Days";
        } else if (hours > 0) {
            durationTime = hours;
            durationType = "Hours";
        } 
        else{
            res.json({ message: "your starting date is equal to ending date" });
        return;
        }
    } else {
        res.json({ message: "you haven't entered starting date or ending date!!" });
        return;
    }

    req.body.dueDate.startTime = startTime;
    req.body.dueDate.endTime = endTime;
    req.body.dueDate.duration = durationTime;
    req.body.dueDate.durationType = durationType;

    console.log(req.body.dueDate);
    next();
}



export const addTask = async (req, res, next) => {
    try {
        const newTask = await TaskModel.create(req.body);
        return res.status(201).json(newTask);
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const tasks = await TaskModel.find({});
        if (tasks) {
            return res.status(200).json(tasks);
        }
    } catch (error) {
        next(error);
    }
}

/**
 * Update a task by its id.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} next - Express next middleware function.
 *
 * @returns {Promise<void>} - Resolves when the task is updated or rejected when an error occurs.
 *
 * @throws {Error} - Throws an error if the task is not found.
 */
export const updateTask = async (req, res, next) => {
    const taskId = req.query.id;
    const updates = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(updatedTask);
    } catch (error) {
        next(error);
    }
}

export const findById = async (req, res, next) => {
    const taskId = req.query.id;

    try {
        const foundTask = await TaskModel.findById(taskId);
        if (!foundTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        return res.status(200).json(foundTask);
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.query.id);
        return res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        next(error);
    }
}
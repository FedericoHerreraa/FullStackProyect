import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
    getTask,
    getTasks,
    uptadeTask,
    deleteTask,
    createTask
} from '../controllers/task.controller.js'
import { validateSchema } from "../middlewares/validator.midleware.js";
import { createTaskSchema } from "../schemas/task.schema.js";

const router = Router()

router.get('/tasks', authRequire, getTasks)

router.get('/tasks/:id', authRequire, getTask)

router.post('/tasks', authRequire, validateSchema(createTaskSchema), createTask)

router.delete('/tasks/:id', authRequire, deleteTask)

router.put('/tasks/:id', authRequire, uptadeTask)

export default router
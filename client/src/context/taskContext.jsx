import { useContext, createContext, useState, useEffect } from "react";
import { createTaskRequest, getTasksRequest, deleteTaskRequest, getTaskRequest, updateTaskRequest } from "../api/task.js";

const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        const res = await getTasksRequest()
        setTasks(res.data)
    }

    const createTask = async (task) => {
        try {
            const res = await createTaskRequest(task)
            console.log(res.data)
        } catch (error) {
            console.log(error.response.data.error)
        }
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskRequest(id)
            if (res.status === 204) setTasks(tasks.filter(task => task._id != id))
        } catch (error) {
            console.log(error)
        }

    }

    const getTask = async (id) => {
        try {
            const res = await getTaskRequest(id)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async (id, task) => {
        try {
            await updateTaskRequest(id, task)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <TaskContext.Provider value={{ createTask, tasks, getTasks, deleteTask, getTask, updateTask }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    return useContext(TaskContext)
}

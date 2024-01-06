import { useContext, createContext, useState, useEffect } from "react";
import { createTaskRequest, getTasksRequest } from "../api/task.js";

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

    return (
        <TaskContext.Provider value={{ createTask, tasks, getTasks }}>
            {children}
        </TaskContext.Provider>
    )
}

export const useTask = () => {
    return useContext(TaskContext)
}

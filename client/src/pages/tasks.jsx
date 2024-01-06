import { useEffect } from "react"
import { useTask } from "../context/taskContext"

const Tasks = () => {
    const { tasks, getTasks } = useTask()

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div className="flex flex-wrap">
            {tasks.length === 0 ? (<h1>No hay tareas</h1>) : (
                tasks.map(task => (
                    <div key={task._id} className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-10 mb-4">
                        <h1>{task.title}</h1>
                        <p>{task.description}</p>
                    </div>
                ))
            )}
        </div>
    )

}

export default Tasks
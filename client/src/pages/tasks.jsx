import { useEffect } from "react"
import { useTask } from "../context/taskContext"
import { Link } from "react-router-dom"

const Tasks = () => {
    const { tasks, getTasks, deleteTask } = useTask()

    useEffect(() => {
        getTasks();
    }, [])

    return (
        <div className="grid grid-cols-3 gap-2">
            {tasks.length === 0 ? (<h1>No hay tareas</h1>) : (
                tasks.map(task => (
                    <div key={task._id} className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-10 mb-4">
                        <header className="flex justify-between">
                            <h1 className="text-2xl font-bold">{task.title}</h1>
                            <div className="flex gap-x-3 items-center">
                                <button onClick={() => {
                                    deleteTask(task._id)
                                }} className="bg-red-500 p-1 rounded-md">elimiar</button>
                                <Link className="bg-blue-500 p-1 rounded-md" to={`/tasks/${task._id}`}>editar</Link>
                            </div>
                        </header>
                        <p className="text-slate-300">{task.description}</p>
                        <p>{new Date(task.date).toLocaleDateString()}</p>
                    </div>
                ))
            )}
        </div>
    )

}

export default Tasks
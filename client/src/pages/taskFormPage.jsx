import { useForm } from 'react-hook-form'
import { useTask } from '../context/taskContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'


const TaskFormPage = () => {
    const { register, handleSubmit, setValue } = useForm()
    const { createTask, getTask, updateTask } = useTask()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id)
                console.log(task)
                setValue('title', task.title)
                setValue('description', task.description)
            }
        }
        loadTask()
    }, [])

    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            updateTask(params.id, data)
        } else {
            await createTask(data)
        }
        navigate('/tasks')
    })

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <form onSubmit={onSubmit}>
                <label htmlFor="">Titulo</label>
                <input 
                    type="text" 
                    placeholder="titulo"
                    {...register("title")}
                    autoFocus
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <label htmlFor="">Descripcion</label>
                <textarea 
                    rows="3" 
                    placeholder="Descripcion"
                    {...register("description")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>
                <button type="submit" className='bg-zinc-500 p-2 rounded-md'>
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default TaskFormPage
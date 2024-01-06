import { useForm } from 'react-hook-form'
import { useTask } from '../context/taskContext'
import { useNavigate } from 'react-router-dom'


const TaskFormPage = () => {
    const { register, handleSubmit } = useForm()
    const { createTask } = useTask()
    const navigate = useNavigate()

    const onSubmit = handleSubmit(async (data) => {
        await createTask(data)
        navigate('/tasks')
    })

    return (
        <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="titulo"
                    {...register("title")}
                    autoFocus
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <textarea 
                    rows="3" 
                    placeholder="Descripcion"
                    {...register("description")}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                ></textarea>
                <button type="submit">
                    Guardar
                </button>
            </form>
        </div>
    )
}

export default TaskFormPage
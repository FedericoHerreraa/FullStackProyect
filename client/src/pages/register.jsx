import { useForm } from 'react-hook-form'
import { useAuth } from '../context/authContext'
import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
    const { register, handleSubmit, formState: {
        errors
    }} = useForm()
    const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
    const navigate = useNavigate()

    const onSubmit = handleSubmit((values) => {
        signUp(values)
    })
    
    useEffect(() => {
        if (isAuthenticated) navigate('/tasks') 
    }, [isAuthenticated])


    return (
        <div className='flex h-[calc(100vh - 100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md my-40'>
                <h1 className="text-2xl font-bold">Registro</h1>
                {registerErrors.map((error,i) => (
                    <div key={i} className='bg-red-500 p-2 my-2 text-white'>
                        {error}
                    </div>
                ))}
                <form onSubmit={onSubmit}>
                    <input type="text" {...register('username', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Nombre de usuario'
                    />
                    {errors.username && (<p className='text-red-500'>Username is required</p>)}
                    <input type="email" {...register('email', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Correo electronico'
                    />
                    {errors.email && (<p className='text-red-500'>Email is required</p>)}
                    <input type="password" {...register('password', { required: true })}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder='Contraseña'
                    />
                    {errors.password && (<p className='text-red-500'>Password is required</p>)}
                    <button type='submit' className="bg-zinc-500 p-2 rounded-md">
                        Registrar
                    </button>
                </form>
                <p className="flex gap-x-2 justify-between my-3">
                    Ya tienes una cuenta? <Link to='/login' className="text-sky-500">Ingresa</Link>
                </p>
            </div>
        </div>
    )
}

export default Register
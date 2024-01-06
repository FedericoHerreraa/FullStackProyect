import { useForm } from "react-hook-form"
import { useEffect } from "react"
import { useAuth } from "../context/authContext"
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const { register, handleSubmit, formState: {
        errors
    }} = useForm()
    const { signIn, errors: singInErrors, isAuthenticated } = useAuth() 
    const navigate = useNavigate()

    const onSubmit = handleSubmit((values) => {
        signIn(values)
    })
    
    useEffect(() => {
        if (isAuthenticated) navigate('/tasks') 
    }, [isAuthenticated])

    return (
        <div className="flex h-[calc(100vh - 100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-40">
                <h1 className="text-2xl font-bold">Ingresar</h1>
                {singInErrors.map((error,i) => (
                    <div key={i} className='bg-red-500 p-2 my-2 text-white'>
                        {error}
                    </div>
                ))}
                <form onSubmit={onSubmit}>
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
                        Ingresar
                    </button>
                </form>
                <p className="flex gap-x-2 justify-between my-3">
                    No tienes una cuenta? <Link to='/register' className="text-sky-500">Registrate</Link>
                </p>
                
            </div>
        </div>
    )
}

export default Login
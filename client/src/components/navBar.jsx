import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"

const NavBar = () => {
    const { isAuthenticated, logout, user } = useAuth()

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-md">
            <Link title={isAuthenticated ? 'tareas' : 'inicio'} to={isAuthenticated ? '/tasks' : '/'}>
                <h1 className="text-2xl font-bold">Task manager</h1>
            </Link>
            <ul className="flex gap-x-10">
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to='/profile'>Bienvenido {user?.username || "Usuario"}</Link>
                        </li>
                        <li> 
                            <Link to='/add-task'>Agregar tarea</Link>
                        </li>
                        <li>
                            <Link to='/' onClick={() => logout()} className="bg-indigo-500 px-4 py-1 rounded-md">Logout</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to='/login' className="bg-indigo-500 px-4 py-1 rounded-md">Ingresar</Link>
                        </li>
                        <li>
                            <Link to='/register' className="bg-indigo-500 px-4 py-1 rounded-md">Registrarse</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    )
}

export default NavBar
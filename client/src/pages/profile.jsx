import { useAuth } from "../context/authContext"


const Profile = () => {
    const { user } = useAuth()
    
    return (
        <div className="flex flex-col  items-center justify-start">
            <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md my-40">
                <h1 className="text-2xl font-bold my-5">Profile</h1>
                <h2>Nombre de usuario: {user.username}</h2>
                <p>Correo electronico: {user.email}</p>
            </div>
        </div>
    )
}

export default Profile
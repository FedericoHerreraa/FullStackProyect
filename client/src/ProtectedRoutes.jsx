import { useAuth } from "./context/authContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const { loading, isAuthenticated } = useAuth()

    if (loading) return <h1>Loading...</h1>

    if (!loading && !isAuthenticated) return <Navigate to='/login' replace/>

    return (
        <Outlet/>
    )

}

export default ProtectedRoutes;
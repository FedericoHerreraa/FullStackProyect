import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../src/pages/login'
import Register from './pages/register'
import Tasks from './pages/tasks'
import TaskFormPage from './pages/taskFormPage'
import TaskPage from './pages/taskPage'
import Home from './pages/home'
import Profile from './pages/profile'
import ProtectedRoutes from './ProtectedRoutes'
import { AuthProvider } from './context/authContext'
import { TaskProvider } from './context/taskContext'
import NavBar from './components/navBar.jsx'

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <NavBar/>
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
              <Route element={<ProtectedRoutes/>}>
                <Route path='/tasks' element={<Tasks/>}/>
                <Route path='/add-task' element={<TaskFormPage/>}/>
                <Route path='/tasks/:id' element={<TaskFormPage/>}/>
                <Route path='/profile' element={<Profile/>}/>
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  )
}

export default App


import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Project from './pages/Project'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Footer from './components/Footer'
import PageNotFound from './pages/PageNotFound'
import { useContext } from 'react'
import { isLoginAuthContext } from './context/ContextShare'

function App() {
  const {isLoginStatus}=useContext(isLoginAuthContext)


  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/project' element={<Project/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/dashboard' element={isLoginStatus?<Dashboard/>:<PageNotFound/>}/>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    <Footer/>  
    </>
  )
}

export default App

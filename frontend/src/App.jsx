import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage'
import Home from './components/Home'
import MyProjectsPage from './components/MyProjectsPage'
import ProjectPage from './components/ProjectPage'
import JoinedProjectPage from './components/JoinedProjectPage'

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/auth' element={<AuthPage />}/>
					<Route path='/resolve' element={<Home />}/>
					<Route path='/myprojects' element={<MyProjectsPage />}/>
					<Route path='/joinedprojects' element={<JoinedProjectPage />}/>
					<Route path='/project/:projectId' element={<ProjectPage />}/>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App

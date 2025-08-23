import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LandingPage from './components/LandingPage'
import AuthPage from './components/AuthPage'
import Home from './components/Home'

function App() {

	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<LandingPage />}/>
					<Route path='/auth' element={<AuthPage />}/>
					<Route path='/resolve' element={<Home />}/>

				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App

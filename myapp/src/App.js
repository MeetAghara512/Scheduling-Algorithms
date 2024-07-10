import './App.css';
import React from 'react';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FCFS from './components/FCFS';
import SJF from './components/SJF';
import RR from './components/RR';
import SRTF from './components/SRTF';
import NPPS from './components/NPPS';
import PPS from './components/PPS';
import BackButton from './components/BackButton';
import './components/GeneralFile.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
	return (
		<div className="App">
			<ToastContainer />
			<div className='playfair-display-regular pt-[30px]'><span className='Task'>Task </span><span className='Algo'>Algo</span></div>
			<Home />
		</div>
	);
}

function AppWrapper() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<App />} />
				<Route path="FCFS" element={<FCFS />} />
				<Route path="RR" element={<RR />} />
				<Route path="SRTF" element={<SRTF />} />
				<Route path="SJF" element={<SJF />} />
				<Route path="NPPS" element={<NPPS />} />
				<Route path="PPS" element={<PPS />} />
				<Route path="/back" element={<BackButton />} />
				</Routes>
		</BrowserRouter>
	);
}

export default AppWrapper;

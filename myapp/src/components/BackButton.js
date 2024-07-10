import React, { useContext } from "react";
import {  useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import './GeneralFile.css';
import { SlArrowLeftCircle } from "react-icons/sl";

function BackButton({ setGChartAvailable }) {
	const { resetState } = useContext(AppContext);
	const navigate = useNavigate();

	const handleReset = () => {
		resetState();
		setGChartAvailable(false);
		navigate("/");
	};

	return (
		<>
		<button onClick={handleReset} className="BackLogo">
			<SlArrowLeftCircle  className="BackButtonArrow"	/>
		</button>
		</>

	);
}

export default BackButton;

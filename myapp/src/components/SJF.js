import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import TableMaking from "./TableMaking";
import BackButton from "./BackButton";
import GChartDraw from "./GChartDraw";
import './GeneralFile.css';

function SJF() {
	const { Pid, AR, BR, setCT, setWT, setTAT, setGChart } = useContext(AppContext);
	const [GChartAvailable, setGChartAvailable] = useState(false);
	const [Timers,setTimers]=useState([]);


	useEffect(() => {
		const combinedData = AR.map((arValue, index) => ({
			AR: arValue,
			BR: BR[index],
			Pid: Pid[index],
		}));

		const n = combinedData.length;
		const ct = Array(n).fill(0);
		const wt = Array(n).fill(0);
		const tat = Array(n).fill(0);
		let t = 0;
		let completedProcesses = 0;
		let ganttChart = [];
		let Timer=[];

		while (completedProcesses < n) {
			let minIndex = -1;

			for (let i = 0; i < n; i++) {
				if (combinedData[i].AR <= t && ct[i] === 0) {
					if (minIndex === -1 || combinedData[i].BR < combinedData[minIndex].BR) {
						minIndex = i;
					}
				}
			}

			if (minIndex === -1) {
				ganttChart.push(-1);
				t++;
				Timer.push(t);
			} else {
				if (combinedData[minIndex].AR > t) {
					while (t < combinedData[minIndex].AR) {
						ganttChart.push(-1);
						Timer.push(t);
						t++;
					}
				}
				for (let j = 0; j < combinedData[minIndex].BR; j++) {
					ganttChart.push(combinedData[minIndex].Pid);
					t++;
					Timer.push(t);
				}
				ct[minIndex] = t;
				wt[minIndex] = ct[minIndex] - combinedData[minIndex].BR - combinedData[minIndex].AR;
				if (wt[minIndex] < 0) wt[minIndex] = 0;
				tat[minIndex] = combinedData[minIndex].BR + wt[minIndex];
				completedProcesses++;
			}
		}

		setCT(ct);
		setWT(wt);
		setTAT(tat);
		setGChart(ganttChart);
		setTimers(Timer);
		setGChartAvailable(true);
	}, [Pid, AR, BR, setCT, setWT, setTAT, setGChart]);

	return (
		<div className="SJF">
			<div className="HeaderOuter">
				<BackButton setGChartAvailable={setGChartAvailable} />
				<div className="Header playfair-display-regular">Shortest Job First</div>
			</div>
			<div>
				<TableMaking />
				{GChartAvailable && <GChartDraw Timers={Timers} />}
			</div>
		</div>
	);
}

export default SJF;

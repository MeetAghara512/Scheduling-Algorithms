import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import TableMaking from "./TableMaking";
import BackButton from "./BackButton";
import GChartDraw from "./GChartDraw";
import './GeneralFile.css';

function FCFS() {
  const { Pid, AR, BR, setCT, setWT, setTAT, setGChart } = useContext(AppContext);
  const [GChartAvailable, setGChartAvailable] = useState(false);
  const [Timers,setTimers]=useState([]);

  useEffect(() => {
    const combinedData = AR.map((arValue, index) => ({
      AR: arValue,
      BR: BR[index],
      Pid: Pid[index],
    }));

    combinedData.sort((a, b) => a.AR - b.AR);

    let currentTime = 0;
    const n = combinedData.length;
    const completionTime = Array(n).fill(0);
    const waitingTime = Array(n).fill(0);
    const turnaroundTime = Array(n).fill(0);
    const ganttArray = [];
    const Timer = [];

    combinedData.forEach((process, index) => {
      if (currentTime < process.AR) {
        while (currentTime < process.AR) {
          ganttArray.push(-1); // Push -1 for idle times
          currentTime++;
          Timer.push(currentTime);
        }
      }
      ganttArray.push(process.Pid);
      currentTime += process.BR;
      Timer.push(currentTime);
      completionTime[index] = currentTime;
      waitingTime[index] = currentTime - process.AR - process.BR;
      turnaroundTime[index] = currentTime - process.AR;
    });

    // Set state values
    setCT(completionTime);
    setWT(waitingTime);
    setTAT(turnaroundTime);
    setGChart(ganttArray);
    setTimers(Timer);
    setGChartAvailable(true);
  }, [AR, BR, Pid, setCT, setWT, setTAT, setGChart]);

  return (
    <div className="FCFS">
      <div className="HeaderOuter">
        <BackButton setGChartAvailable={setGChartAvailable} />
        <div className="Header playfair-display-regular">First Come First Served</div>
      </div>
      <div>
        <TableMaking />
        {GChartAvailable && <GChartDraw Timers={Timers}/>}
      </div>
    </div>
  );
}

export default FCFS;

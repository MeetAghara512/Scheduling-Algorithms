import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import TableMaking from "./TableMaking";
import BackButton from "./BackButton";
import GanttChartQueue from "./GanttChartQueue";
import './GeneralFile.css';


function RR() {
  const { Pid, AR, BR, setCT, setWT, setTAT, setGChart, quantumTime } = useContext(AppContext);
  const [GChartAvailable, setGChartAvailable] = useState(false);
  const [queueHistory, setQueueHistory] = useState([]);
  const [ganttChart, setGanttChart] = useState([]);
  const [Timers, setTimers] = useState([]);

  useEffect(() => {
    const combinedData = AR.map((arValue, index) => ({
      AR: arValue,
      BR: BR[index],
      Pid: Pid[index],
    }));

    combinedData.sort((a, b) => a.AR - b.AR);

    let time = 0;
    const n = combinedData.length;
    const remainingTime = combinedData.map(proc => proc.BR);
    const completionTime = Array(n).fill(0);
    const waitingTime = Array(n).fill(0);
    const turnaroundTime = Array(n).fill(0);
    const ganttChart = [];
    let completed = 0;
    const processQueue = [];
    const Timer = [];
    let idx = 0;

    // Initialize 2D array to store queue history
    const queueHistoryArray = [];

    // Push the first process in the queue
    if (combinedData.length > 0 && combinedData[0].AR === 0) {
      processQueue.push(0);
    }

    while (completed !== n) {
      if (processQueue.length > 0) {
        idx = processQueue.shift();

        // Record the time at the start of each process execution
        if (ganttChart.length === 0 || ganttChart[ganttChart.length - 1] !== combinedData[idx].Pid) {
          ganttChart.push(combinedData[idx].Pid);
          if(time !== 0)
            {Timer.push(time); }
        }

        const execTime = Math.min(quantumTime, remainingTime[idx]);
        remainingTime[idx] -= execTime;
        time += execTime;

        // Add newly arrived processes to the queue
        for (let i = 0; i < n; i++) {
          if (i !== idx && combinedData[i].AR <= time && remainingTime[i] > 0 && !processQueue.includes(i)) {
            processQueue.push(i);
          }
        }

        // Re-add the current process to the queue if it is not finished
        if (remainingTime[idx] > 0) {
          processQueue.push(idx);
        } else {
          completionTime[idx] = time;
          waitingTime[idx] = completionTime[idx] - combinedData[idx].AR - combinedData[idx].BR;
          turnaroundTime[idx] = completionTime[idx] - combinedData[idx].AR;
          completed++;
          if(completed === n){Timer.push(time);}

        }
      } else {
        // If the queue is empty, increase the time
        if (ganttChart.length === 0 || ganttChart[ganttChart.length - 1] !== -1) {
          ganttChart.push(-1);
          Timer.push(time);
        }
        time++;
        for (let i = 0; i < n; i++) {
          if (combinedData[i].AR <= time && remainingTime[i] > 0 && !processQueue.includes(i)) {
            processQueue.push(i);
          }
        }
      }

      // Update the queue history after each time step
      queueHistoryArray.push([...processQueue.map(index => combinedData[index].Pid)]);
    }

    setCT(completionTime);
    setWT(waitingTime);
    setTAT(turnaroundTime);
    setGChart(ganttChart);
    setGanttChart(ganttChart);
    setTimers(Timer);
    setQueueHistory(queueHistoryArray);
    setGChartAvailable(true);
  }, [AR, BR, Pid, setCT, setWT, setTAT, setGChart, quantumTime]);

  return (
    <div className="FCFS">
      <div className="HeaderOuter">
        <BackButton setGChartAvailable={setGChartAvailable} />
        <div className="Header playfair-display-regular">Round Robin </div>
      </div>
      <div>
        {GChartAvailable && <GanttChartQueue ganttChart={ganttChart} queueHistory={queueHistory} Timers={Timers} />}
        <TableMaking />
      </div>
    </div>
  );
}

export default RR;

import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import TableMaking from "./TableMaking";
import BackButton from "./BackButton";
import GChartDraw from "./GChartDraw";
import './GeneralFile.css';


function SRTF() {
      const { Pid, AR, BR, setCT, setWT, setTAT, setGChart } = useContext(AppContext);
      const [GChartAvailable, setGChartAvailable] = useState(false);
      const [Timers,setTimers]=useState([]);


      useEffect(() => {
            const combinedData = AR.map((arValue, index) => ({
                  AR: arValue,
                  BR: BR[index],
                  Pid: Pid[index],
            }));

            combinedData.sort((a, b) => {
                  if (a.AR === b.AR) {
                        return parseInt(a.Pid.substring(1)) - parseInt(b.Pid.substring(1));
                  }
                  return a.AR - b.AR;
            });

            let time = 0;
            const n = combinedData.length;
            const remainingTime = combinedData.map(proc => proc.BR);
            const completionTime = Array(n).fill(0);
            const waitingTime = Array(n).fill(0);
            const turnaroundTime = Array(n).fill(0);
            const ganttChart = [];
            const Timer =[];
            let completed = 0;

            while (completed !== n) {
                  let idx = -1;
                  let minRemainingTime = Infinity;

                  // Find the process with the shortest remaining burst time
                  for (let i = 0; i < n; i++) {
                        if (combinedData[i].AR <= time && remainingTime[i] > 0) {
                              if (remainingTime[i] < minRemainingTime) {
                                    minRemainingTime = remainingTime[i];
                                    idx = i;
                              }
                        }
                  }

                  if (idx !== -1) {
                        // Process execution
                        remainingTime[idx] -= 1;
                        ganttChart.push(combinedData[idx].Pid);
                        time++;
                        Timer.push(time);
                        // If a process finishes
                        if (remainingTime[idx] === 0) {
                              completionTime[idx] = time;
                              waitingTime[idx] = completionTime[idx] - combinedData[idx].AR - combinedData[idx].BR;
                              turnaroundTime[idx] = completionTime[idx] - combinedData[idx].AR;
                              completed++;
                        }
                  } else {
                        // Idle time
                        ganttChart.push(-1);
                        time++;
                        Timer.push(time);
                  }
            }

            setCT(completionTime);
            setWT(waitingTime);
            setTAT(turnaroundTime);
            setGChart(ganttChart);
            setTimers(Timer);
            setGChartAvailable(true);
      }, [AR, BR, Pid, setCT, setWT, setTAT, setGChart]);

      return (
            <>
                  <div className="SRTF">
                        <div className="HeaderOuter">
                              <BackButton setGChartAvailable={setGChartAvailable} />
                              <div className="Header playfair-display-regular">Shortest Remaining Time First</div>
                        </div>
                        <div>
                              <TableMaking />
                              {GChartAvailable && <GChartDraw Timers={Timers} />}
                        </div>
                  </div>
            </>
      );
}

export default SRTF;

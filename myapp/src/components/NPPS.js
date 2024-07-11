import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import TableMaking from "./TableMaking";
import BackButton from "./BackButton";
import GChartDraw from "./GChartDraw";
import './GeneralFile.css';


function NPPS() {
      const { Pid, AR, BR, setCT, setWT, setTAT, setGChart, priority } = useContext(AppContext);
      const [GChartAvailable, setGChartAvailable] = useState(false);
      const [Timers,setTimers]=useState([]);


      useEffect(() => {
            if (Pid.length === 0) return;

            const combinedData = AR.map((arValue, index) => ({
                  AR: arValue,
                  BR: BR[index],
                  Pid: Pid[index],
                  priority: priority[index],
            }));

            combinedData.sort((a, b) => a.AR - b.AR);

            let time = 0;
            const n = combinedData.length;
            const completionTime = Array(n).fill(0);
            const waitingTime = Array(n).fill(0);
            const turnaroundTime = Array(n).fill(0);
            const ganttChart = [];
            const Timer = [];
            let completed = 0;

            while (completed !== n) {
                  let idx = -1;
                  let highestPriority = Number.MAX_SAFE_INTEGER;
                  for (let i = 0; i < n; i++) {
                        if (combinedData[i].AR <= time && completionTime[i] === 0 && combinedData[i].priority < highestPriority) {
                              highestPriority = combinedData[i].priority;
                              idx = i;
                        }
                  }

                  if (idx !== -1) {
                        if (ganttChart.length === 0 || ganttChart[ganttChart.length - 1] !== combinedData[idx].Pid) {
                              ganttChart.push(combinedData[idx].Pid);
                        }

                        time += combinedData[idx].BR;
                        Timer.push(time);
                        completionTime[idx] = time;
                        waitingTime[idx] = completionTime[idx] - combinedData[idx].AR - combinedData[idx].BR;
                        turnaroundTime[idx] = completionTime[idx] - combinedData[idx].AR;
                        completed++;
                  } else {
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
      }, [AR, BR, Pid, setCT, setWT, setTAT, setGChart, priority]);

      return (
            <>
                  <div className="NPPS">
                        <div className="HeaderOuter">
                              <BackButton setGChartAvailable={setGChartAvailable} />
                              <div className="Header playfair-display-regular">Non Preemptive Priority Scheduling</div>
                        </div>
                        <div>
                              <TableMaking />
                              {GChartAvailable && <GChartDraw Timers={Timers}/>}
                        </div>
                  </div>
            </>
      );
}

export default NPPS;

import React, { useEffect, useState } from "react";
import './GanttChartQueue.css';

function GanttChartQueue({ ganttChart, queueHistory, Timers }) {
    const [currentQueue, setCurrentQueue] = useState([]);
    const [currentGantt, setCurrentGantt] = useState([]);
    const [currentTimers, setCurrentTimers] = useState([]);
    console.log(Timers);

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentGantt.length < ganttChart.length) {
                setCurrentGantt(prevGantt => {
                    const nextGantt = ganttChart.slice(0, prevGantt.length + 1);
                    setCurrentQueue(queueHistory[nextGantt.length - 1]);
                    setCurrentTimers(Timers.slice(0, nextGantt.length));
                    return nextGantt;
                });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [ganttChart, queueHistory, Timers, currentGantt.length]);

    return (
        <>
            <div className="BorderNew mt-[50px] ml-[20px] mr-[20px]">
                <div className="">
                    <div className="playfair-display-regular text-[30px] BorderOfHeading">Gantt Chart</div>
                    <div className="gantt-chart m-[5px]">
                        {currentGantt.map((pid, index) => (
                            <div key={index} className="gantt-item-containe">
                                <div className={`block-style ${pid === -1 ? 'idle' : 'bg-blue-500 text-white'}`}>
                                    {pid === -1 ? ' ' : `${pid}`}
                                </div>
                                <div className="timer-value_">{currentTimers[index]}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {currentQueue && currentQueue.length > 0 && (
                <div className="BorderNew mt-[50px] ml-[20px] mr-[20px]">
                    <div className="playfair-display-regular text-[30px] BorderOfHeading">Queue Visualization</div>
                    <div className="queue-visualization">
                        <div className="queue m-[5px]">
                            {currentQueue.map((pid, index) => (
                                <div key={index} className="block-style bg-blue-500 text-white">
                                    {`${pid}`}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default GanttChartQueue;

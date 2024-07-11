import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import "./GChartDraw.css";

function GChartDraw(probs) {
    const { Timers } = probs;
    console.log(Timers);
    const { GChart } = useContext(AppContext);

    const [showItems, setShowItems] = useState(Array(GChart.length).fill(false));
    const [showTimers, setShowTimers] = useState(Array(Timers.length).fill(false));

    useEffect(() => {
        const showItemsSequentially = () => {
            GChart.forEach((processId, index) => {
                setTimeout(() => {
                    setShowItems((prev) => {
                        const updatedItems = [...prev];
                        updatedItems[index] = true;
                        return updatedItems;
                    });
                    setShowTimers((prev) => {
                        const updatedTimers = [...prev];
                        updatedTimers[index] = true;
                        return updatedTimers;
                    });
                }, index * 500);
            });
        };

        showItemsSequentially();
    }, [GChart, Timers]);

    return (
        <div className="ml-[20px] mr-[20px] BoxBorder mt-[50px]">
            <h2 className="text-[30px] mt-[0px] w-[100%] HeaderBorder playfair-display-regular">Gantt Chart</h2>
            <div className="gantt-chart flex flex-row">
                {GChart.map((processId, index) => (
                    <div key={index} className="gantt-item-container">
                        <div
                            className={`gantt-item border mb-[10px] Border border-gray-400 rounded-md ${processId === -1 ? "bg-white" : "bg-blue-500 text-white"
                                } ${showItems[index] ? "show" : ""}`}
                            style={{ height: "50px", width: "100px" }}
                        >
                            {processId !== -1 ? processId : null}
                        </div>
                        <div className={`timer-value ${showTimers[index] ? "show" : ""}`}>{Timers[index]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default GChartDraw;

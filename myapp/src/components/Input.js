import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GeneralFile.css';
import './Table.css';

function Input() {
    const { AR, setAR, BR, setBR, Pid, setPid, priority, setPriority, type, setQuantumTime } = useContext(AppContext);
    const [inputValue, setInputValue] = useState("");
    const [numRows, setNumRows] = useState(0);
    const [tableValues, setTableValues] = useState({ AR: [], BR: [], priority: [] });
    const [quantumInput, setQuantumInput] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        console.log("input page");
        console.log(AR, BR);
        console.log('priority', priority);
        console.log('pid', Pid);
    }, [AR, BR, priority, Pid]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleGenerateTable = () => {
        const newValue = Number(inputValue);
        if (!isNaN(newValue) && newValue > 0) {
            setNumRows(newValue);
            setTableValues({ AR: new Array(newValue).fill(""), BR: new Array(newValue).fill(""), priority: new Array(newValue).fill("") });
            setInputValue("");
        } else {
            toast.error("Number of processes must be a positive integer.");
        }
    };

    const handleTableInputChange = (index, value, type) => {
        const updatedValues = { ...tableValues, [type]: [...tableValues[type]] };
        updatedValues[type][index] = value;
        setTableValues(updatedValues);
    };

    const handleAddToData = () => {
        if (type === 'RR' && quantumInput === "") {
            toast.error("Please enter quantum time for RR algorithm.");
            return;
        }

        const validARValues = tableValues.AR.map(Number).filter((value) => !isNaN(value) && value >= 0);
        const validBRValues = tableValues.BR.map(Number).filter((value) => !isNaN(value) && value > 0);
        const validPriorityValues = tableValues.priority.map(Number).filter((value) => !isNaN(value) && value >= 0);
        if(validBRValues.length !== numRows){
            toast.error("All BR values must be non-negative or non-zero numbers.");
        }
        else if(validARValues.length !== numRows){
            toast.error("All AR values must be non-negative numbers.");
        }
        else if (((type === 'NPPS' || type === 'PPS') && validPriorityValues.length !== numRows)) {
            toast.error("All priority values must be non-negative numbers.");
        } else {
            const newPidValues = Array.from({ length: numRows }, (_, index) => `P${index + Pid.length + 1}`);
            setPid([...Pid, ...newPidValues]);
            setAR([...AR, ...validARValues]);
            setBR([...BR, ...validBRValues]);
            setPriority([...priority, ...validPriorityValues]);
            setNumRows(0);
            setInputValue('');
            setTableValues({ AR: [], BR: [], priority: [] });
            setIsSubmitted(true);
            setQuantumInput('');
            
        }
    };

    const handleQuantumTimeChange = (e) => {
        const quantumValue = Number(e.target.value);
        if (!isNaN(quantumValue) && quantumValue > 0) {
            setQuantumInput(e.target.value);
            setQuantumTime(quantumValue);
        } else {
            setQuantumInput("");
            setQuantumTime(0);
            toast.error("Quantum time must be a positive number.");
        }
    };

    return (
        <>
            <ToastContainer />

            {!isSubmitted && (
                <>
                    <div className="flex OneBox">
                        <div>
                            {type === 'RR' && (
                                <>
                                    <div className="wrapper">
                                        <input
                                            type="number"
                                            value={quantumInput}
                                            onChange={handleQuantumTimeChange}
                                            placeholder="Set Quantum Time"
                                            className="numberOfProcess quantumTime"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="wrapper">
                            <input
                                type="number"
                                value={inputValue}
                                onChange={handleInputChange}
                                placeholder="Number of Processes"
                                className="numberOfProcess"
                            />
                            <button onClick={handleGenerateTable} className="generateTable">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M5 12l14 0"></path>
                                    <path d="M13 18l6 -6"></path>
                                    <path d="M13 6l6 6"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="SecondBox">
                        {numRows > 0 && (
                            <div className="container">
                                <table>
                                    <thead>
                                        <tr>
                                            <th className="playfair-display-regular text-[23px]">Pid</th>
                                            <th className="playfair-display-regular text-[20px]">Arrival Time</th>
                                            <th className="playfair-display-regular text-[20px]">Burst Time</th>
                                            {(type === 'NPPS' || type === 'PPS') && (
                                                <th className="playfair-display-regular text-[20px]">Priority</th>
                                            )}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.from({ length: numRows }, (_, index) => (
                                            <tr key={index}>
                                                <td className="playfair-display-regular text-[20px]">{`P${index + Pid.length + 1}`}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={tableValues.AR[index]}
                                                        onChange={(e) => handleTableInputChange(index, e.target.value, 'AR')}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        value={tableValues.BR[index]}
                                                        onChange={(e) => handleTableInputChange(index, e.target.value, 'BR')}
                                                    />
                                                </td>
                                                {(type === 'NPPS' || type === 'PPS') && (
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={tableValues.priority[index]}
                                                            onChange={(e) => handleTableInputChange(index, e.target.value, 'priority')}
                                                        />
                                                    </td>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <button onClick={handleAddToData} className="submitButton">Submit</button>
                            </div>
                        )}
                    </div>
                </>
            )}
            {isSubmitted && (
                <div>
                    <Link to={`/${type}`}>
                        <button className="StartButton">Start Process</button>
                    </Link>
                </div>
            )}
        </>
    );
}

export default Input;

import React, { createContext, useState } from "react";

export const AppContext = createContext();

function AppContextProvider({ children }) {
    const [AR, setAR] = useState([]);
    const [BR, setBR] = useState([]);
    const [CT, setCT] = useState([]);
    const [WT, setWT] = useState([]);
    const [GChart, setGChart] = useState([]);
    const [TAT, setTAT] = useState([]);
    const [Pid, setPid] = useState([]);
    const [priority, setPriority] = useState([]);
    const [type, setType] = useState('');
    const [quantumTime, setQuantumTime] = useState();

    const resetState = () => {
        setAR([]);
        setBR([]);
        setCT([]);
        setWT([]);
        setGChart([]);
        setTAT([]);
        setPid([]);
        setPriority([]);
        setType('');
        setQuantumTime(null);
    };

    const value = {
        AR,
        setAR,
        BR,
        setBR,
        CT,
        setCT,
        WT,
        setWT,
        TAT,
        setTAT,
        GChart,
        setGChart,
        Pid,
        setPid,
        priority,
        setPriority,
        type,
        setType,
        quantumTime,
        setQuantumTime,
        resetState,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContextProvider;

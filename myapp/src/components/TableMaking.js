import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./TableMaking.css";

function TableMaking() {
  const { Pid, AR, BR, CT, TAT, WT } = useContext(AppContext);

  return (
    <div>
      {/* <h2 className="SubHeading">Table</h2> */}
      <div className="container container_">
        <table>
          <thead>
            <tr>
              <th>Process ID</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Completion Time</th>
              <th>Turnaround Time</th>
              <th>Waiting Time</th>
            </tr>
          </thead>
          <tbody>
            {Pid.map((pid, index) => (
              <tr key={index}>
                <td>{pid}</td>
                <td>{AR[index]}</td>
                <td>{BR[index]}</td>
                <td>{CT[index]}</td>
                <td>{TAT[index]}</td>
                <td>{WT[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableMaking;

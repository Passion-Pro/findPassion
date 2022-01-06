import React from 'react';
import './EnvolveGraph.css'

function EnvolveGraph({ height,date }) {

    return (
        <div className="evolvegraph">
            <div className="graphPercent">
            {height+'%'}
            </div>
            <div style={{ display: "flex", width: '40px', height: `${height * 2}px`, backgroundColor: "white"}}>
            </div>
            <div className="graphDate">
            {date}
            </div>
        </div>
    )
}

export default EnvolveGraph;
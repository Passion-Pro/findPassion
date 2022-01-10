import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import './EnvolveGraph.css';
import firebase from 'firebase';

function EnvolveGraph({ data }) {

    var today = new Date();

    const date = new Date(data?.data?.timestamp.seconds * 1000);
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const heightInNumber = data.data.totalmessage / diffDays;
    var height;
    if(heightInNumber>20){
        height=100;
    }else{
        height=(heightInNumber*100)/20;
    }
    
    return (
        <div className="evolvegraph">
            <div className="graphPercent">
                {height + '%'}
            </div>
            <div style={{ display: "flex", width: '40px', height: `${height*2}px`,  maxHeight: `200px` ,backgroundColor: "white",borderBottom:'1px solid lightgray', margin:'0 12px 12px 12px' }}>
            </div>
            <div className="envolvename">{data?.data?.name}</div>
        </div>
    )
}

export default EnvolveGraph;
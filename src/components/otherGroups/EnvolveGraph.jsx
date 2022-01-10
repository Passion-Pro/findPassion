import React, { useEffect, useState } from 'react';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';

function EnvolveGraph() {
    const [{ userInfo, user, groupMember, groupDetails }, dispatch] = useStateValue();
    const [info, setInfo] = useState(null);

    useEffect(() => {
        if (groupDetails && user) {
            db.collection('Groups').doc('KRpTP7NQ8QfN2cEH3352').collection(groupDetails.startedby).doc(groupDetails?.GroupId + 'groupmember').collection('GroupMember')
            .doc(groupDetails?.GroupId+user?.email)
                .onSnapshot((snapshot) => {
                    setInfo(snapshot.data())
                })
        }
    }, [groupDetails && user]);

    var today = new Date();
    const date = new Date(info?.timestamp.seconds * 1000);
    const diffTime = Math.abs(date - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const heightInNumber = info?.totalmessage / diffDays;
    var height;
    if (heightInNumber > 20) {
        height = 100;
    } else {
        height = (heightInNumber * 100) / 20;
    }

    return (
        <div className="evolvegraph">
            <div className="graphPercent">
                {height + '%'}
            </div>
            <div style={{ display: "flex", width: '40px', height: `${height * 2}px`, maxHeight: `200px`, backgroundColor: "white", borderBottom: '1px solid lightgray', margin: '0 12px 12px 12px' }}>
            </div>
            <div className="envolvename">{info?.name}</div>
        </div>
    )
}

export default EnvolveGraph;
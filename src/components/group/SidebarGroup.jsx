import React, { useState } from 'react';
import GroupMemberField from './GroupMemberField';
import './SidebarGroup.css';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';

function SidebarGroup() {

    const [showInventor, setShowInventor] = useState(false);
    const [showMember, setShowMember] = useState(false);

    const data = [
        { name: "Nishant Mainwal" },
        { name: "Ronak Doshi" },
        { name: "Subhanshu" },
        { name: "Shubham" },
        { name: "Jayesh Jaiswal" },
        { name: "Vikrant" },
        { name: 'Asha' },
        { name: "Neha" },
        { name: "Amulya Sharma" },
        { name: "Jayesh Jaiswal" },
        { name: "Vikrant" },
    ]
    const data1 = [
        { name: "Nishant" },
        { name: "Ronak" },
    ]
    return (
        <div className='SidebarGroup'>
            <div className="leftSidebarGroup__header">
                Passion Family
            </div>
            <div className="leftSidebarGroup__Admin"
            onClick={()=>{
                setShowInventor(!showInventor)
                setShowMember(false)
            }}
            >
                Inventor
                {
                    !showInventor ? <ArrowRightRoundedIcon/>:<ArrowDropDownRoundedIcon/>
                }
            </div>
            {showInventor &&<div className="leftSidebarGroup__body" >
                {data1.map((name, serial) => (
                    <GroupMemberField name={name} serial={serial} />
                ))}
            </div>}
            <div className="leftSidebarGroup__Admin"
            onClick={()=>{
                setShowMember(!showMember)
                setShowInventor(false)
            }}>
                Member
                {
                    !showMember ? <ArrowRightRoundedIcon/>:<ArrowDropDownRoundedIcon/>
                }
            </div>
            {showMember && <div className="leftSidebarGroup__body">
                {data.map((name, serial) => (
                    <GroupMemberField name={name} serial={serial} />
                ))}
            </div>}
        </div>
    )
}

export default SidebarGroup;

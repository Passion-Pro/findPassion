import React from 'react';
import './RightSidebarGroupEnvolvement.css';
import { useHistory } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EnvolveGraph from './EnvolveGraph';
import Divider from '@mui/material/Divider';

function RightSidebarGroupEnvolvement() {

    const history = useHistory();
    const [{ userInfo, user, groupMember, groupDetails }, dispatch] = useStateValue();
    console.log(groupMember)
    return (
        <div className='RightSidebarGroup'>
            <div className="rightSidebarGroup__header">
                <div className="rightSidebarGroup__headMoreTask">
                    <ArrowBackRoundedIcon onClick={() => {
                        history.push('/group')
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
                    {groupDetails?.GroupName} Evolvement
                </div>
                <div></div>
            </div>
            <div className="rightSidebarGroup__bodyEnvolve">
                <div className="rightSidebarGroup__bodyEnvolvement2">

                    <Button variant="outlined">{groupDetails.name}</Button>
                    {groupMember.map((groupMember) => (
                        <Button variant="outlined">{groupMember?.data?.name}</Button>
                    ))}
                </div>
                <div className="rightSidebarGroup__bodyEnvolvement1">
                    <div className="rightSidebarGroup__bodyEnvolvement1Div">
                        <EnvolveGraph height={80} date={'date'} />
                    </div>
                    <div className="rightSidebarGroup__bodyEnvolvement1Div">
                        <EnvolveGraph height={100} date={"date"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightSidebarGroupEnvolvement

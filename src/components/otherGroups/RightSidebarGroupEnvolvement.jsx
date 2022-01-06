import React from 'react';
import './RightSidebarGroupEnvolvement.css';
import { useHistory, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useStateValue } from '../../StateProvider';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EnvolveGraph from './EnvolveGraph';

function RightSidebarGroupEnvolvement() {

    const history = useHistory();
    const [{groupMember, groupDetails }, dispatch] = useStateValue();

    const { id } = useParams();

    return (
        <div className='RightSidebarGroup'>
            <div className="rightSidebarGroup__header">
                <div className="rightSidebarGroup__headMoreTask">
                    <ArrowBackRoundedIcon onClick={() => {
                        history.push(`/groupother/${id}`)
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
                    {groupDetails?.GroupName} Evolvement
                </div>
                <div></div>
            </div>
            <div className="rightSidebarGroup__bodyEnvolve">
                <div className="rightSidebarGroup__bodyEnvolvement2">

                    <Button variant="outlined">{"Admin"}</Button>
                    {groupMember && groupMember.map((groupMember) => (
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

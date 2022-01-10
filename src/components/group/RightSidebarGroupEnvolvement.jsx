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

                    <Button variant="outlined">{" Add "}</Button>
                    Improve your performance by discuss the skill you have common with others.
                </div>
                <div className="rightSidebarGroup__bodyEnvolvement1">
                    {groupMember && groupMember.map((data) => (
                        <div className="rightSidebarGroup__bodyEnvolvement1Div">
                            <EnvolveGraph data={data} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default RightSidebarGroupEnvolvement

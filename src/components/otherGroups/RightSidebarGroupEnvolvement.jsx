import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EnvolveGraph from './EnvolveGraph';

function RightSidebarGroupEnvolvement() {
    const { id } = useParams();
    const history = useHistory();
    const [{groupMember, groupsOtherDetails, groupDetails,showTop }]=useStateValue();

    return (
        <div className='RightSidebarGroup'>
            <div className={showTop ? 'rightSidebarGroup__headerShow':"rightSidebarGroup__header"}>
                <div className="rightSidebarGroup__headMoreTask">
                    <ArrowBackRoundedIcon onClick={() => {
                        history.push(`/groupother/${id}`)
                    }} />
                </div>
                <div className="rightSidebarGroup__headName">
                    {groupDetails?.GroupName} Involvement
                </div>
                <div></div>
            </div>
            <div className={showTop ? 'rightSidebarGroup__bodyTaskShow':"rightSidebarGroup__bodyTask"}>
                <div className={showTop?"rightSidebarGroup__bodyEnvolvement2Show":"rightSidebarGroup__bodyEnvolvement2"}>
                    {groupsOtherDetails?.groupSlogan}
                </div>
                <div className={showTop?"rightSidebarGroup__bodyEnvolvement1Show":"rightSidebarGroup__bodyEnvolvement1"}>
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

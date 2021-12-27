import React from 'react'
import Box from './Box';
import './WithoutLogin.css';
import './Header'
import Header from './Header';

function Home() {

    const data=[
        {
        accountname:"Subhanshu Ranjan",
        date:'24-12-2021',
        infoHead:'Yoo i got intership!!',
        info:'I started Internship as Reactjs developer in Passion.',
        how:`I had applied on website name freelancing.com and after one week they did voice to me and after that i gave a interview.I cleared the interview and i was selected .
        In this whole i injoy alot and now i am very happy because i got job in my passion.`,
        conclusion:''
    },
        {
        accountname:"Jitesh Yadav",
        date:'24-12-2021',
        infoHead:'I left the leaning of reactjs !!',
        info:'I started Internship as Reactjs developer in Passion.',
        how:`I had applied on website name freelancing.com and after one week they did voice to me and after that i gave a interview.I cleared the interview and i was selected .
        In this whole i injoy alot and now i am very happy because i got job in my passion.`,
        conclusion:''
    },
]

    return (
        <div className='without__home'>
            <Header/>
            <div className="without__Head__Riv">
            ReactJS
            </div>
            {data.map(data=>(
               <Box data={data}/>
           ))}
            <div className="without__Head__Riv">
            JavaScript
            </div>
            {data.map(data=>(
               <Box data={data}/>
           ))}
        </div>
    )
}

export default Home

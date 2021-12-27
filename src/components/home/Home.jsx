import React from 'react';
import './Home.css';
import Header from '../header/Header';
import ProfileCard from '../profilecard/ProfileCard';
import CreateStory from '../stories/CreateStory';
import Stories from '../stories/Stories';


function Home() {
    const data = [{
        profileimage: 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-1240w,f_auto,q_auto:best/newscms/2021_06/3448565/210208-elon-musk-2020-ac-452p.jpg',
        backgroundimage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQz1SYGixYUE2icjnz94mx07p1yW8D-t3osfw&usqp=CAU",
        name: 'Elon Musk',
        learning: 'I am leaning blockchain, Competitive Programming...',
        learned: 'I am leaning blockchain, Competitive Programming...',
    }, {
        profileimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO799T-uV7Plu4cvPk0Pe7FYWDkRjJ_PH9hA&usqp=CAU',
        backgroundimage: "https://bolnews.s3.amazonaws.com/wp-content/uploads/2019/12/Facebook-suspends-official-page.jpg",
        name: 'Mark Zuckerberg',
        learning: 'I am leaning blockchain, html, CSS, Nodejs Programming...',
        learned: 'Piro in reactjs if you have feel free to contact me.I also good in ....',
    }, {
        profileimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS317DrQ07lEMCXBmZn44xy-lrXD7ERfW476w&usqp=CAU',
        backgroundimage: "https://www.accountancydaily.co/sites/default/files/styles/media_thumbnail/public/field/image/amazon_adobestock_291428005_editorial_use_only.jpeg?itok=-GgDInnO",
        name: 'Jeff',
        learning: 'I am leaning blockchain, Competitive Programming...',
        learned: 'I am leaning blockchain, Competitive Programming...',
    }, {
        profileimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO799T-uV7Plu4cvPk0Pe7FYWDkRjJ_PH9hA&usqp=CAU',
        backgroundimage: "https://bolnews.s3.amazonaws.com/wp-content/uploads/2019/12/Facebook-suspends-official-page.jpg",
        name: 'Mark Zuckerberg',
        learning: 'I am leaning blockchain, html, CSS, Nodejs Programming...',
        learned: 'Piro in reactjs if you have feel free to contact me.I also good in ....',
    }, {
        profileimage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS317DrQ07lEMCXBmZn44xy-lrXD7ERfW476w&usqp=CAU',
        backgroundimage: "https://www.accountancydaily.co/sites/default/files/styles/media_thumbnail/public/field/image/amazon_adobestock_291428005_editorial_use_only.jpeg?itok=-GgDInnO",
        name: 'Jeff',
        learning: 'I am leaning blockchain, Competitive Programming...',
        learned: 'I am leaning blockchain, Competitive Programming...',
    }
    ]
    return (
        <div className='home'>
            <Header />
            <div className="homeBody">
                <div className="stories">
                    <div className="createStory">
                        <CreateStory />
                    </div>
                    <div className='stories__div'>
                        {data.map((data) => (
                            <Stories data={data} />
                        ))
                        }
                    </div>
                </div>
                <div className="recommendPeople">
                    {data.map((data) => (
                        <ProfileCard data={data} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home

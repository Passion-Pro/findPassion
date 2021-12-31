import './App.css';
import React, { useState, useEffect } from "react";
import CreateAccount from './components/sign/CreateAccount/CreateAcount';
import Login from './components/sign/Login';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from './components/chat/Chat';
import ChatPage from './components/chat/ChatPage';
import WorldPage from './components/world/WorldPage';
import LearningGroup from './components/world/Learnings/LearningGroup';
import StoriesPage from './components/world/StoriesPage';
import VideoPlayer from './components/world/Stories/VideoPlayer';
import StoryPage from './components/world/Stories/StoryPage';
import LearnersPage from './components/world/Learnings/LearnersPage';
import AddStoryPage from './components/world/Stories/AddStoryPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import { useStateValue } from './StateProvider';
import db ,{ auth } from './firebase';
import { actionTypes } from './reducer';
import RequestsPage from './components/RequestsPage/RequestsPage';




function App() {

   const[{user} , dispatch] = useStateValue();
   
   useEffect(() => {
      // will only run once when the app component loads...
      auth.onAuthStateChanged((auth) => {
        if (auth) {
          dispatch({
            type: actionTypes.SET_USER,
            user: auth,
          });
        } else {
        }
      });
    }, []);

    useEffect(() => {
      if (user?.uid) {
        db.collection("users")
          .doc(user?.uid)
          .onSnapshot((snapshot) => {
            dispatch({
              type: actionTypes.SET_USER_INFO,
              userInfo: snapshot.data(),
            })
          }
          );
      }
    }, [user?.uid]);



  return (
    <div className="App">
       <Router>
       <Route path='/withoutloginhome'>
          <WithoutLogin>
        </Route>
        <Route path='/createpost'>
          <Createpost/>
        </Route>
        <Route path='/group'>
          <Group/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
         <Switch>
         <Route path="/newAccount"> 
          <CreateAccount/>
       </Route>
       <Route path="/chat"> 
          <Chat/>
       </Route>
       <Route path="/messages"> 
          <ChatPage/>
       </Route>
       <Route path="/world"> 
          <WorldPage/>
       </Route>
       <Route path="/story"> 
          <StoryPage/>
       </Route>
       <Route path="/stories"> 
          <StoriesPage/>
       </Route>
       <Route path="/learningGroup"> 
          <LearningGroup/>
       </Route>
       <Route path="/learners"> 
          <LearnersPage/>
       </Route>
       <Route path="/profile"> 
          <ProfilePage/>
       </Route>
       <Route path="/addStory"> 
          <AddStoryPage/>
       </Route>
       <Route path="/requests"> 
          <RequestsPage/>
       </Route>
       <Route path="/"> 
          <Login />
       </Route>
         </Switch>
       </Router>
    </div>
  );
}

export default App;

import "./App.css";
import React, { useState, useEffect } from "react";
import CreateAccount from "./components/sign/CreateAccount/CreateAcount";
import Login from "./components/sign/Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import ChatPage from "./components/chat/ChatPage";
import WorldPage from "./components/world/WorldPage";
import LearningGroup from "./components/world/Learnings/LearningGroup";
import StoriesPage from "./components/world/StoriesPage";
import VideoPlayer from "./components/world/Stories/VideoPlayer";
import StoryPage from "./components/world/Stories/StoryPage";
import LearnersPage from "./components/world/Learnings/LearnersPage";
import AddStoryPage from "./components/world/Stories/AddStoryPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import { useStateValue } from "./StateProvider";
import db, { auth } from "./firebase";
import { actionTypes } from "./reducer";
import RequestsPage from "./components/RequestsPage/RequestsPage";
import UploadPdf from "./components/world/Learnings/UploadPdf";
import ViewPdf from "./components/world/Learnings/ViewPdf";
import UserProfile from "./components/UserProfile/UserProfile";
import WithoutLogin from './components/withoutlogin/WithoutLoginHome';
import Group from './components/group/Group';
import GroupOther from './components/otherGroups/Group';
import Createpost from './components/post/Createpost';
import Home from './components/home/Home';
import HomeWithAllProfile from './components/home/HomeWithAllProfile';
import LandspacePost from './components/post/LandscapePost';
import AddPost from "./components/post/AddPost";
import PortraitPhotos from './components/post/PortraitPhotos';
import GroupTask from "./components/group/GroupTask";
import GroupChat from "./components/group/GroupChat";
import GroupEnvolvement from "./components/group/GroupEnvolvement";
import GroupTaskOther from "./components/otherGroups/GroupTask";
import GroupChatOther from "./components/otherGroups/GroupChat";
import GroupEnvolvementOther from "./components/otherGroups/GroupEnvolvement";
import ShareExperience from "./components/ShareExperience/ShareExperience";
import CreateStoryPage from "./components/stories/CreateStoryPage";
import ViewProfile from "./components/profile/ViewProfile";
import ShowStories from "./components/stories/ShowStories";
import {useHistory} from "react-router-dom"

function App() {

  const [{ user, courseDiv, showExpandGroup }, dispatch] = useStateValue();

  const history=useHistory();

  useEffect(() => {
    // will only run once when the app component loads...
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        dispatch({
          type: actionTypes.SET_USER,
          user: auth,
        });
      } else {
        history.push('/withoutloginhome')
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
    }else{

    }
  }, [user?.uid]);


  const handleCourseDiv = () => {
    if (courseDiv) {
      dispatch({
        type: actionTypes.SET_COURSEDIV,
        courseDiv: false,
      })
    }
    if (showExpandGroup) {
      dispatch({
        type: actionTypes.SET_SHOW_EXPANDGROUP,
        showExpandGroup: false,
      })
    }
  }

  return (
    <div className="App" onClick={handleCourseDiv}>
      <Router>
        <Switch>
          <Route path='/createStory'>
            <CreateStoryPage />
          </Route>
          <Route path='/viewstory/:id'>
            <ShowStories />
          </Route>
          <Route path='/viewprofile/:id'>
            <ViewProfile />
          </Route>
          <Route path='/withoutloginhome'>
            <WithoutLogin />
          </Route>
          <Route path='/shareexperience'>
            <ShareExperience/>
          </Route>
          <Route path='/grouptaskother/:id'>
            <GroupTaskOther />
          </Route>
          <Route path='/groupchatother/:id'>
            <GroupChatOther />
          </Route>
          <Route path='/groupevolvementother/:id'>
            <GroupEnvolvementOther />
          </Route>
          <Route path='/grouptask'>
            <GroupTask />
          </Route>
          <Route path='/groupchat'>
            <GroupChat />
          </Route>
          <Route path='/groupevolvement'>
            <GroupEnvolvement />
          </Route>
          <Route path='/group'>
            <Group />
          </Route>
          <Route path='/groupother/:id'>
            <GroupOther />
          </Route>
          <Route path='/createpost'>
            <Createpost />
          </Route>
          <Route path='/all_profile'>
            <HomeWithAllProfile />
          </Route>
          <Route path='/landspacepost'>
            <LandspacePost />
          </Route>
          <Route path='/addpost'>
            <AddPost />
          </Route>
          <Route path='/portraitpost'>
            <PortraitPhotos />
          </Route>
          <Route path="/newAccount">
            <CreateAccount />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route path="/messages">
            <ChatPage />
          </Route>
          <Route path="/world">
            <WorldPage />
          </Route>
          <Route path="/story">
            <StoryPage />
          </Route>
          <Route path="/stories">
            <StoriesPage />
          </Route>
          <Route path="/learning/:learningId">
            <LearningGroup />
          </Route>
          <Route path="/learners">
            <LearnersPage />
          </Route>
          <Route path="/profile">
            <ProfilePage />
          </Route>
          <Route path="/addStory">
            <AddStoryPage />
          </Route>
          <Route path="/requests">
            <RequestsPage />
          </Route>
          <Route path="/learnings/uploadPdf/:learningId">
            <UploadPdf />
          </Route>
          <Route path="/learnings/viewPdf/:learningId/messages/:messageId">
            <ViewPdf/>
          </Route>
          <Route path="/userProfile">
            <UserProfile/>
          </Route>
          <Route path='/'>
            {user?.email ? <Home /> : <WithoutLogin />}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

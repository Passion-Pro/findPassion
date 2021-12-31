import './App.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import CreateAccount from './components/sign/CreateAccount/CreateAcount';
// import Login from './components/sign/Login';
// import Chat from './components/chat/Chat';
// import ChatPage from './components/chat/ChatPage';
// import WorldPage from './components/world/WorldPage';
// import LearningGroup from './components/world/Learnings/LearningGroup';
// import StoriesPage from './components/world/StoriesPage';
// import VideoPlayer from './components/world/Stories/VideoPlayer';
// import StoryPage from './components/world/Stories/StoryPage';
// import LearnersPage from './components/world/Learnings/LearnersPage';
// import AddStoryPage from './components/world/Stories/AddStoryPage';
import Group from './components/group/Group';
import Createpost from './components/post/Createpost';
import WithoutLogin from './components/withoutlogin/WithoutLoginHome';
import Home from './components/home/Home'
import LandscapePost from './components/post/LandscapePost';
import PortraitPhotos from './components/post/PortraitPhotos';
import AddPost from './components/post/AddPost';
import HomeWithAllProfile from './components/home/HomeWithAllProfile'
import ShowStories from './components/stories/ShowStories';
import CreateStory from './components/stories/CreateStory';
import CreateStoryPage from './components/stories/CreateStoryPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/withoutloginhome'>
            <WithoutLogin />
          </Route>
          <Route path='/createpost'>
            <Createpost />
          </Route>
          <Route path='/createstory'>
            <CreateStoryPage />
          </Route>
          <Route path='/group'>
            <Group />
          </Route>
          <Route path='/addpost'>
            <AddPost />
          </Route>
          <Route path='/landspacepost'>
            <LandscapePost />
          </Route>
          <Route path='/portraitpost'>
            <PortraitPhotos />
          </Route>
          <Route path='/all_profile'>
            <HomeWithAllProfile/>
          </Route>
          <Route path='/showstory'>
            <ShowStories/>
          </Route>
          <Route path='/'>
            <Home/>
          </Route>
            {/* <Route path="/newAccount">
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
            <Route path="/learningGroup">
              <LearningGroup />
            </Route>
            <Route path="/learners">
              <LearnersPage />
            </Route>
            <Route path="/addStory">
              <AddStoryPage />
            </Route>
            <Route path="/">
              <Login />
            </Route> */}
          </Switch>
      </Router>
    </div>
  );
}

export default App;

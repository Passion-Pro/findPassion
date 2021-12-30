import './App.css';
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




function App() {
  return (
    <div className="App">
       <Router>
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
       <Route path="/addStory"> 
          <AddStoryPage/>
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

import React, { useEffect } from "react";
import CreateAccount from "./components/sign/CreateAccount/CreateAcount";
import Login from "./components/sign/Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import ChatPage from "./components/chat/ChatPage";
import WorldPage from "./components/world/WorldPage";
import LearningGroup from "./components/world/Learnings/LearningGroup";
import StoriesPage from "./components/world/StoriesPage";
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
import WithoutLogin from "./components/withoutlogin/WithoutLoginHome";
import Group from "./components/group/Group";
import GroupTasklist from "./components/group/GroupTasklist";
import GroupOther from "./components/otherGroups/Group";
import Createpost from "./components/post/Createpost";
import Home from "./components/home/Home";
import HomeWithAllProfile from "./components/home/HomeWithAllProfile";
import LandspacePost from "./components/post/LandscapePost";
import AddPost from "./components/post/AddPost";
import PortraitPhotos from "./components/post/PortraitPhotos";
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
import { useHistory } from "react-router-dom";
import UploadChatPdf from "./components/chat/UploadChatPdf";
import SearchPage from "./components/search/SearchPage";
import Header from "./components/header/Header";
import HeaderNot from "./components/withoutlogin/Header";
import ShowTask from "./components/group/ShowTask";
import { CircularProgress } from "@mui/material";
import PostsPage from "./components/world/Posts/PostsPage";
import SearchMobile from "./components/SearchForMobile/SearchMobile";
import UploadGroupPdf from "./components/group/UploadGroupPdf";

function App() {
  const [
    {
      user,
      courseDiv,
      showExpandGroup,
      showMoreoption,
      showgroupMoreRight,
      pathnamef,
    },
    dispatch,
  ] = useStateValue();
  const history = useHistory();

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_LOADING,
      loading: true,
    });
    auth.onAuthStateChanged((auth) => {
      if (auth) {
        dispatch({
          type: actionTypes.SET_USER,
          user: auth,
        });
        dispatch({
          type: actionTypes.SET_LOADING,
          loading: false,
        });
      } else {
        history.push("/withoutloginhome");
        dispatch({
          type: actionTypes.SET_LOADING,
          loading: false,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (user?.uid) {
      dispatch({
        type: actionTypes.SET_LOADING,
        loading: true,
      });
      db.collection("users")
        .doc(user?.uid)
        .onSnapshot((snapshot) => {
          dispatch({
            type: actionTypes.SET_USER_INFO,
            userInfo: snapshot.data(),
          });
          dispatch({
            type: actionTypes.SET_LOADING,
            loading: false,
          });
        });
    } else {
      dispatch({
        type: actionTypes.SET_LOADING,
        loading: false,
      });
    }
  }, [user?.uid]);

  const handleCourseDiv = () => {
    if (courseDiv) {
      dispatch({
        type: actionTypes.SET_COURSEDIV,
        courseDiv: false,
      });
    }
    if (showExpandGroup) {
      dispatch({
        type: actionTypes.SET_SHOW_EXPANDGROUP,
        showExpandGroup: false,
      });
    }
    if (showMoreoption) {
      dispatch({
        type: actionTypes.SET_SHOW_MORE_OPTION,
        showMoreoption: false,
      });
    }
    if (showgroupMoreRight) {
      dispatch({
        type: actionTypes.SET_SHOW_GROUP_MORE_RIGHT,
        showgroupMoreRight: false,
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_PATHNAMEF,
      pathnamef: "/",
    });
  }, []);

  return (
    <div className="App" onClick={handleCourseDiv}>
      <Router>
        {user?.email && (
          <div className="header__APPlaptop">
            {pathnamef !== "/withoutlogin" &&
              pathnamef !== "/addJourney/photos" &&
              pathnamef !== "/addJourney/video" &&
              (pathnamef?.toString().slice(0, 9) !== "/learning" ||
                pathnamef !== "/learning") && <Header />}
          </div>
        )}
        {/* phone */}
        {user?.email && (
          <div className="header__APPphone">
            {pathnamef !== "/withoutlogin" &&
              pathnamef !== "/addJourney/photos" &&
              pathnamef !== "/addJourney/words" &&
              pathnamef !== "/addJourney/video" &&
              pathnamef !== "/shareexperience" &&
              pathnamef !== "/userProfile" &&
              pathnamef !== "/userProfileLearnt" &&
              pathnamef !== "/userProfilePost" &&
              pathnamef !== "/learning" && <Header />}
          </div>
        )}
        {!user?.email && <HeaderNot />}
        <Switch>
          <Route path="/searchPage">
            {user?.email ? <SearchPage /> : <Login />}
          </Route>
          {/* <Route path="/searchPageForMobile">
            {user?.email ? <SearchMobile /> : <Login />}
          </Route> */}
          <Route path="/createStory">
            {user?.email ? <CreateStoryPage /> : <Login />}
          </Route>
          <Route path="/viewstory/:id">
            {user?.email ? <ShowStories /> : <Login />}
          </Route>
          <Route path="/viewprofile/:id">
            {user?.email ? <ViewProfile /> : <Login />}
          </Route>
          <Route path="/withoutlogin">
            {user?.email ? <WithoutLogin /> : <Login />}
          </Route>
          <Route path="/shareexperience">
            {user?.email ? <ShareExperience /> : <Login />}
          </Route>
          <Route path="/grouptaskother/:id">
            {user?.email ? <GroupTaskOther /> : <Login />}
          </Route>
          <Route path="/showalltask/:id">
            {user?.email ? <ShowTask /> : <Login />}
          </Route>
          <Route path="/groupchatother/:id">
            {user?.email ? <GroupChatOther /> : <Login />}
          </Route>
          <Route path="/groupevolvementother/:id">
            {user?.email ? <GroupEnvolvementOther /> : <Login />}
          </Route>
          <Route path="/grouptask">
            {user?.email ? <GroupTask /> : <Login />}
          </Route>
          <Route path="/grouptasklist">
            {user?.email ? <GroupTasklist /> : <Login />}
          </Route>
          <Route path="/groupchat">
            {user?.email ? <GroupChat /> : <Login />}
          </Route>
          <Route path="/groupevolvement">
            {user?.email ? <GroupEnvolvement /> : <Login />}
          </Route>
          <Route path="/group">{user?.email ? <Group /> : <Login />}</Route>
          <Route path="/groupother/:id">
            {user?.email ? <GroupOther /> : <Login />}
          </Route>
          <Route path="/createpost">
            {user?.email ? <Createpost /> : <Login />}
          </Route>
          <Route path="/all_profile">
            {user?.email ? <HomeWithAllProfile /> : <Login />}

          </Route>
          <Route path="/landspacepost">
            {user?.email ? <LandspacePost /> : <Login />}
          </Route>
          <Route path="/addpost">{user?.email ? <AddPost /> : <Login />}</Route>
          <Route path="/portraitpost">
            {user?.email ? <PortraitPhotos /> : <Login />}
          </Route>
          <Route path="/newAccount">
            {user?.email ? <CreateAccount /> : <Login />}
          </Route>
          <Route path="/signIn">
            <Login />
          </Route>
          <Route path="/chat/:chatId">
            {user?.email ? <Chat /> : <Login />}
          </Route>
          <Route path="/chat">{user?.email ? <Chat /> : <Login />}</Route>
          <Route path="/messages/:myChatId/:viewerId">
            <ChatPage />
          </Route>
          <Route path="/world">{user?.email ? <WorldPage /> : <Login />}</Route>
          <Route path="/journey/:journeyId">
            {user?.email ? <StoryPage /> : <Login />}
          </Route>
          <Route path="/stories">
            {user?.email ? <StoriesPage /> : <Login />}
          </Route>
          <Route path="/learners/:learningId">
            <LearnersPage />
          </Route>
          <Route path="/groupUploadPdf">
            {user?.email ? <UploadGroupPdf/> : <Login />}
          </Route>
          <Route path="/profile">
            {user?.email ? <ProfilePage /> : <Login />}
          </Route>
          <Route path="/addJourney/:journeyMode">
            {user?.email ? <AddStoryPage /> : <Login />}
          </Route>
          <Route path="/requests">
            {user?.email ? <RequestsPage /> : <Login />}
          </Route>
          <Route path="/learningsUploadPdf/:learningId">
            {user?.email ? <UploadPdf /> : <Login />}
          </Route>
          <Route path="/learning/:learningId">
            {user?.email ? <LearningGroup /> : <Login />}
          </Route>
          <Route path="/messagesUploadPdf/:chatId/:chatEmail">
            {user?.email ? <UploadChatPdf /> : <Login />}
          </Route>
          <Route path="/learnings/viewPdf/:learningId/messages/:messageId">
            {user?.email ? <ViewPdf /> : <Login />}
          </Route>
          <Route path="/posts">
            <PostsPage />
          </Route>
          <Route path="/chats/viewPdf/:chatEmail/messages/:messageId">
            {user?.email ? <ViewPdf /> : <Login />}
          </Route>
          <Route path="/userProfile">
            {user?.email ? <UserProfile /> : <Login />}
          </Route>
          <Route path="/userProfilePost">
            {user?.email ? <UserProfile /> : <Login />}
          </Route>
          <Route path="/userProfileLearnt">
            {user?.email ? <UserProfile /> : <Login />}
          </Route>
          <Route path="/">{user?.email && <WorldPage />}</Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

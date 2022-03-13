import React, { useEffect } from "react";
import CreateAccount from "./components/sign/CreateAccount/CreateAcount";
import Login from "./components/sign/Login";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chat from "./components/chat/Chat";
import ChatPage from "./components/chat/ChatPage";
import WorldPage from "./components/world/WorldPage";
import WorldPageforsearch from "./components/worldForSearchThing//WorldPage";
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
// import SearchPage from "./components/search/SearchPage";
import SearchPage from "./components/worldForSearchThing/People/SearchPage";
import SearchPageforsearch from "./components/worldForSearchThing/People/SearchBody";
import Header from "./components/header/Header";
import HeaderNot from "./components/withoutlogin/Header";
import ShowTask from "./components/group/ShowTask";
import { CircularProgress } from "@mui/material";
import PostsPage from "./components/world/Posts/PostsPage";
import SearchMobile from "./components/SearchForMobile/SearchMobile";
import UploadGroupPdf from "./components/group/UploadGroupPdf";
import PostsPageSearch from './components/worldForSearchThing/Posts/PostsPage'
function App() {
  const [
    {
      user,
      userInfo,
      courseDiv,
      showExpandGroup,
      showMoreoption,
      showgroupMoreRight,
      pathnamef,
      searchInput,
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
    dispatch({
      type: actionTypes.SET_SEARCH_INPUT_PASSION,
      searchInputPassion: userInfo?.passion,
  })
  }, []);

  return (
    <div className="App" onClick={handleCourseDiv}>
      <Router>
        {user?.email && (
          <div className="header__APPlaptop">
            {pathnamef !== "/withoutlogin" &&
              pathnamef !== "/addJourney/photos" &&
              pathnamef !== "/requests" &&
              pathnamef !== "/addJourney/video" &&
              pathnamef !== "journey" &&
              (pathnamef?.toString().slice(0, 9) !== "/learning" ||
                pathnamef !== "/learning") && <Header />
                }
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
              pathnamef !== "/requests" &&
              pathnamef !== "/userProfile" &&
              pathnamef !== "/userProfileLearnt" &&
              pathnamef !== "/userProfilePost" &&
              pathnamef !== "/journey" &&
              pathnamef !== "/learning" && <Header />}
          </div>
        )}
        <Switch>
          <>
          {user?.email ? (
              !userInfo?.email ?
                (<>
                  <Route exact path="/signin">
                    <Login />
                  </Route>
                  <Route exact path="/">
                    <CreateAccount />
                  </Route>
                </>
                )
                :
                <>
                <Route exact path="/searchPage">
            {user?.email ? <SearchPage /> : <Login />}
          </Route>
                <Route exact path="/peopleforsearch">
            {user?.email ? <SearchPageforsearch /> : <Login />}
          </Route>
          <Route exact path="/createStory">
            {user?.email ? <CreateStoryPage /> : <Login />}
          </Route>
          <Route exact path="/viewstory/:id">
            {user?.email ? <ShowStories /> : <Login />}
          </Route>
          <Route exact path="/viewprofile/:id">
            {user?.email ? <ViewProfile /> : <Login />}
          </Route>
          <Route exact path="/withoutlogin">
            {user?.email ? <WithoutLogin /> : <Login />}
          </Route>
          <Route exact path="/shareexperience">
            {user?.email ? <ShareExperience /> : <Login />}
          </Route>
          <Route exact path="/grouptaskother/:id">
            {user?.email ? <GroupTaskOther /> : <Login />}
          </Route>
          <Route exact path="/showalltask/:id">
            {user?.email ? <ShowTask /> : <Login />}
          </Route>
          <Route exact path="/groupchatother/:id">
            {user?.email ? <GroupChatOther /> : <Login />}
          </Route>
          <Route exact path="/groupevolvementother/:id">
            {user?.email ? <GroupEnvolvementOther /> : <Login />}
          </Route>
          <Route exact path="/grouptask">
            {user?.email ? <GroupTask /> : <Login />}
          </Route>
          <Route exact path="/grouptasklist">
            {user?.email ? <GroupTasklist /> : <Login />}
          </Route>
          <Route exact path="/groupchat">
            {user?.email ? <GroupChat /> : <Login />}
          </Route>
          <Route exact path="/groupevolvement">
            {user?.email ? <GroupEnvolvement /> : <Login />}
          </Route>
          <Route exact path="/group">{user?.email ? <Group /> : <Login />}</Route>
          <Route exact path="/groupother/:id">
            {user?.email ? <GroupOther /> : <Login />}
          </Route>
          <Route exact path="/createpost">
            {user?.email ? <Createpost /> : <Login />}
          </Route>
          <Route exact path="/all_profile">
            {user?.email ? <HomeWithAllProfile /> : <Login />}

          </Route>
          <Route exact path="/landspacepost">
            {user?.email ? <LandspacePost /> : <Login />}
          </Route>
          <Route exact path="/addpost">{user?.email ? <AddPost /> : <Login />}</Route>
          <Route exact path="/portraitpost">
            {user?.email ? <PortraitPhotos /> : <Login />}
          </Route>
          <Route exact path="/newAccount">
            {user?.email ? <CreateAccount /> : <Login />}
          </Route>
          <Route exact path="/signIn">
            <Login />
          </Route>
          <Route exact path="/chat/:chatId">
            {user?.email ? <Chat /> : <Login />}
          </Route>
          <Route exact path="/chat">{user?.email ? <Chat /> : <Login />}</Route>
          <Route exact path="/messages/:myChatId/:viewerId">
            <ChatPage />
          </Route>
          <Route exact path="/world">{user?.email ? <WorldPage /> : <Login />}</Route>
          <Route exact path="/worldforsearch">{user?.email ? <WorldPageforsearch /> : <Login />}</Route>
          <Route exact path="/journey/:journeyId">
            {user?.email ? <StoryPage /> : <Login />}
          </Route>
          <Route exact path="/stories">
            {user?.email ? <StoriesPage /> : <Login />}
          </Route>
          <Route exact path="/learners/:learningId">
            <LearnersPage />
          </Route>
          <Route exact path="/groupUploadPdf">
            {user?.email ? <UploadGroupPdf/> : <Login />}
          </Route>
          <Route exact path="/profile">
            {user?.email ? <ProfilePage /> : <Login />}
          </Route>
          <Route exact path="/addJourney/:journeyMode">
            {user?.email ? <AddStoryPage /> : <Login />}
          </Route>
          <Route exact path="/requests">
            {user?.email ? <RequestsPage /> : <Login />}
          </Route>
          <Route exact path="/learningsUploadPdf/:learningId">
            {user?.email ? <UploadPdf /> : <Login />}
          </Route>
          <Route exact path="/learning/:learningId">
            {user?.email ? <LearningGroup /> : <Login />}
          </Route>
          <Route exact path="/messagesUploadPdf/:chatId/:chatEmail">
            {user?.email ? <UploadChatPdf /> : <Login />}
          </Route>
          <Route exact path="/learnings/viewPdf/:learningId/messages/:messageId">
            {user?.email ? <ViewPdf /> : <Login />}
          </Route>
          <Route exact path="/posts">
            <PostsPage />
          </Route>
          <Route exact path="/postforsearch">{user?.email && <PostsPageSearch />}</Route>
          <Route exact path="/chats/viewPdf/:chatEmail/messages/:messageId">
            {user?.email ? <ViewPdf /> : <Login />}
          </Route>
          <Route exact path="/userProfile">
            {user?.email ? <UserProfile /> : <Login />}
          </Route>
          <Route exact path="/userProfilePost">
            {user?.email ? <UserProfile /> : <Login />}
          </Route>
          <Route exact path="/userProfileLearnt">
            {user?.email ? <UserProfile /> : <Login />}
          </Route>
          <Route exact path="/">{user?.email && <PostsPage />}</Route>
                </>)
              :
              <>
                <Route exact path="/">
                  <Login/>
                </Route>
              </>
            }
            </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
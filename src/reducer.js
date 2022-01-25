export const initialState = {
  openQualitiesPopup: false,
  selectedQualities: [],
  openPassionPopup: false,
  openAttachPopup: false,
  passion: null,
  user: null,
  openLearningsPopup: false,
  learnings: [],
  openStoryPopup: false,
  startJourney: false,
  journeyUpload: "video",
  showStoryCaption: false,
  showStory: false,
  openNewLearningPopup: false,
  userInfo: [],
  journey: [],
  courseDiv: false,
  showDiv: false,
  showLeftSidebarGroup:true,
  showExpandGroup:false,
  groupDetails:null,
  groupDetailsmain:null,
  groupMember:null,
  groupMemberDetails:null,
  mygroupDetail:null,
  searchInput:'',
  showMoreoption:false,
  showTop:true,
  editGroup:false,
  // for backgroundimage and profile image
  groupsOtherDetails:null,
  showgroupMoreRight:true,
  openAddLearntPopup: false,
  chatId: null,
  addPartnerInfo : []
};

export const actionTypes = {
  SET_EDIT_GROUP:'SET_EDIT_GROUP',
  SET_SHOW_TOP:"SET_SHOW_TOP",
  SET_SEARCH_INPUT:'SET_SEARCH_INPUT',
  SET_SHOW_MORE_OPTION:'SET_MORE_OPTION',
  SET_SHOWSTORY:'SET_SHOWSTORY',
  SET_SHOWSTORY_CAPTION:'SET_SHOWSTORY_CAPTION',
  SET_COURSEDIV: "SET_COURSEDIV",
  OPEN_QUALITIES_POPUP: "OPEN_QUALITIES_POPUP",
  ADD_QUALITY: "ADD_QUALITY",
  REMOVE_QUALITY: "REMOVE_QUALITY",
  OPEN_PASSION_POPUP: "OPEN_PASSION_POPUP",
  SET_PASSION: "SET_PASSION",
  SET_USER: "SET_USER",
  OPEN_ATTACH_POPUP: "OPEN_ATTACH_POPUP",
  SET_SELECTED_QUALITIES: "SET_SELECTED_QUALITIES",
  OPEN_LEARNINGS_POPUP: "OPEN_LEARNINGS_POPUP",
  ADD_LEARNING: "ADD_LEARNING",
  REMOVE_LEARNING: "REMOVE_LEARNING",
  OPEN_STORY_POPUP: "OPEN_STORY_POPUP",
  START_JOURNEY: "START_JOURNEY",
  SET_JOURNEY_UPLOAD: "SET_JOURNEY_UPLOAD",
  OPEN_NEW_LEARNING_POPUP: "OPEN_NEW_LEARNING_POPUP",
  SET_MY_GROUP_OTHER_DETAILS:"SET_MY_GROUP_OTHER_DETAILS",
  // showgroupMoreRight
  SET_SHOW_GROUP_MORE_RIGHT:"SET_SHOW_GROUP_MORE_RIGHT",
  SET_USER_INFO: "SET_USER_INFO",
  SET_JOURNEY: "SET_JOURNEY",
  SET_SHOW_DIV: "SET_SHOW_DIV",
  SET_SHOW_LEFTSIDEBARGROUP: "SET_SHOW_LEFTSIDEBARGROUP",
  SET_SHOW_EXPANDGROUP: "SET_SHOW_EXPANDGROUP",
  SET_GROUP_DETAILS: "SET_GROUP_DETAILS",
  SET_GROUP_MEMBER: "SET_GROUP_MEMBER",
  SET_GROUP_MEMBERDETAILS: "SET_GROUP_MEMBERDETAILS",
  OPEN_ADD_LEARNT_POPUP: "OPEN_ADD_LEARNT_POPUP",
  SET_MY_GROUP_DETAILS: "SET_MY_GROUP_DETAILS",
  SET_MY_GROUP_DETAILS_MAIN: "SET_MY_GROUP_DETAILS_MAIN",
  SET_CHAT_ID: "SEt_CHAT_ID",
  ADD_PARTNER_INFO : "ADD_PARTNER_INFO",
  REMOVE_PARTNER_INFO : "REMOVE_PARTNER_INFO",
  SET_ADD_PARTNER_INFO : "SET_ADD_PARTNER_INFO"
};

const reducer = (state, action) => {
  console.log(action ,state);
  switch (action.type) {
    case actionTypes.SET_SHOW_GROUP_MORE_RIGHT:
      return {
        ...state,
        showgroupMoreRight: action.showgroupMoreRight,
      };
    case actionTypes.SET_MY_GROUP_OTHER_DETAILS:
      return {
        ...state,
        groupsOtherDetails: action.groupsOtherDetails,
      };
    case actionTypes.SET_EDIT_GROUP:
      return {
        ...state,
        editGroup: action.editGroup,
      };
    case actionTypes.SET_SHOW_TOP:
      return {
        ...state,
        showTop: action.showTop,
      };
    case actionTypes.SET_SHOW_MORE_OPTION:
      return {
        ...state,
        showMoreoption: action.showMoreoption,
      };
    case actionTypes.SET_SEARCH_INPUT:
      return {
        ...state,
        searchInput: action.searchInput,
      };
    case actionTypes.SET_MY_GROUP_DETAILS_MAIN:
      return {
        ...state,
        groupDetailsmain: action.groupDetailsmain,
      };
    case actionTypes.SET_GROUP_MEMBERDETAILS:
      return {
        ...state,
        groupMemberDetails: action.groupMemberDetails,
      };
    case actionTypes.SET_MY_GROUP_DETAILS:
      return {
        ...state,
        mygroupDetail: action.mygroupDetail,
      };
    case actionTypes.SET_GROUP_MEMBER:
      return {
        ...state,
        groupMember: action.groupMember,
      };
    case actionTypes.SET_GROUP_DETAILS:
      return {
        ...state,
        groupDetails: action.groupDetails,
      };
    case actionTypes.SET_SHOW_EXPANDGROUP:
      return {
        ...state,
        showExpandGroup: action.showExpandGroup,
      };
    case actionTypes.SET_SHOW_LEFTSIDEBARGROUP:
      return {
        ...state,
        showLeftSidebarGroup: action.showLeftSidebarGroup,
      };
    // showExpandGroup
    case actionTypes.SET_COURSEDIV:
      return {
        ...state,
        courseDiv: action.courseDiv,
      };
    case actionTypes.SET_SET_SHOW_DIV:
      return {
        ...state,
        showDiv: action.showDiv,
      };
    case actionTypes.SET_SHOWSTORY:
      return {
        ...state,
        showStory: action.showStory,
      };
    case actionTypes.SET_SHOWSTORY_CAPTION:
      return {
        ...state,
        showStoryCaption: action.showStoryCaption,
      };
    case actionTypes.OPEN_QUALITIES_POPUP:
      return {
        ...state,
        openQualitiesPopup: action.openQualitiesPopup,
      };
    case actionTypes.ADD_QUALITY:
      return {
        ...state,
        selectedQualities: [...state.selectedQualities, action.quality],
      };
    case actionTypes.REMOVE_QUALITY:
      const index1 = state.selectedQualities.findIndex(
        (quality) => quality.name === action.name
      );
      let newselectedQualities = [...state.selectedQualities];

      if (index1 >= 0) {
        newselectedQualities.splice(index1, 1);
      } else {
        console.warn(
          `Can't remove quality (id: ${action.id} as its not in the list)`
        );
      }

      return {
        ...state,
        selectedQualities: newselectedQualities,
      };

    case actionTypes.OPEN_PASSION_POPUP:
      return {
        ...state,
        openPassionPopup: action.openPassionPopup,
      };

    case actionTypes.SET_PASSION:
      return {
        ...state,
        passion: action.passion,
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.OPEN_ATTACH_POPUP:
      return {
        ...state,
        openAttachPopup: action.openAttachPopup,
      };
    case actionTypes.SET_SELECTED_QUALITIES:
      return {
        ...state,
        selectedQualities: action.selectedQualities,
      };
    case actionTypes.OPEN_LEARNINGS_POPUP:
      return {
        ...state,
        openLearningsPopup: action.openLearningsPopup,
      };
    case actionTypes.ADD_LEARNING:
      return {
        ...state,
        learnings: [...state.learnings, action.learning],
      };
    case actionTypes.REMOVE_LEARNING:
      const index2 = state.learnings.findIndex(
        (learning) => learning.name === action.name
      );
      let newlearnings = [...state.learnings];

      if (index2 >= 0) {
        newlearnings.splice(index2, 1);
      } else {
        console.warn(
          `Can't remove learning (id: ${action.id} as its not in the list)`
        );
      }

      return {
        ...state,
        learnings: newlearnings,
      };
    case actionTypes.OPEN_STORY_POPUP:
      return {
        ...state,
        openStoryPopup: action.openStoryPopup,
      };
    case actionTypes.START_JOURNEY:
      return {
        ...state,
        startJourney: action.startJourney,
      };
    case actionTypes.SET_JOURNEY_UPLOAD:
      return {
        ...state,
        journeyUpload: action.journeyUpload,
      };
    case actionTypes.OPEN_NEW_LEARNING_POPUP:
      return {
        ...state,
        openNewLearningPopup: action.openNewLearningPopup,
      };
    case actionTypes.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case actionTypes.SET_JOURNEY:
      return {
        ...state,
        journey: action.journey,
      };
    case actionTypes.OPEN_ADD_LEARNT_POPUP:
      return {
        ...state,
        openAddLearntPopup: action.openAddLearntPopup,
      };
    case actionTypes.SET_CHAT_ID:
      return {
        ...state,
        chatId: action.chatId,
      };
    case actionTypes.ADD_PARTNER_INFO:
      return {
        ...state,
        addPartnerInfo: [...state.addPartnerInfo, action.partnerInfo]
      }
    case actionTypes.REMOVE_PARTNER_INFO:
      const index3 = state.addPartnerInfo.findIndex(
        (partnerInfo) => partnerInfo?.data === action.data
      );
      let newaddPartnerInfo = [...state.addPartnerInfo];
    
      if (index3 >= 0) {
        newaddPartnerInfo.splice(index3, 1);
      } else {
        console.warn(
          `Can't remove partner (id: ${action.id} as its not in the list)`
        );
      }

      return {
        ...state,
        addPartnerInfo: newaddPartnerInfo,
      };

      case actionTypes.SET_ADD_PARTNER_INFO:
        return {
          type : actionTypes.SET_ADD_PARTNER_INFO,
          addPartnerInfo: action.addPartnerInfo
        }
    default:
      return state;
  }
};

export default reducer;

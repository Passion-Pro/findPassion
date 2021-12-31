export const initialState = {
  openQualitiesPopup: false,
  selectedQualities: [],
  openPassionPopup: false,
  openAttachPopup: false,
  passion: null,
  user: [],
  openLearningsPopup: false,
  learnings: [],
  openStoryPopup: false,
  startJourney : false,
  journeyUpload : "video",
  showStoryCaption:false,
  showStory:false,
  openNewLearningPopup : false,
  userInfo : []
};

export const actionTypes = {
  SET_SHOWSTORY:'SET_SHOWSTORY',
  SET_SHOWSTORY_CAPTION:'SET_SHOWSTORY_CAPTION',
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
  SET_JOURNEY_UPLOAD : "SET_JOURNEY_UPLOAD",
  OPEN_NEW_LEARNING_POPUP: "OPEN_NEW_LEARNING_POPUP",
  SET_USER_INFO : "SET_USER_INFO",
};

const reducer = (state, action) => {
  console.log(state, action);
  switch (action.type) {
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
          openStoryPopup : action.openStoryPopup
        }
      case actionTypes.START_JOURNEY:
        return {
          ...state,
          startJourney : action.startJourney
        }
        case actionTypes.SET_JOURNEY_UPLOAD:
          return {
            ...state,
            journeyUpload : action.journeyUpload
          }
        case actionTypes.OPEN_NEW_LEARNING_POPUP:
          return{
            ...state,
            openNewLearningPopup : action.openNewLearningPopup
          }
        case actionTypes.SET_USER_INFO:
          return{
            ...state,
            userInfo : action.userInfo
          }
    default:
      return state;
  }
};

export default reducer;

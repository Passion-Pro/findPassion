{journeyUpload === "text" && (
    <>
      <div className="journey_cards">
        <button
          className="add_partner_video"
          onClick={() => {
            setAddPartner(true);
          }}
        >
          Add Partner
        </button>
        <div className="added_partner_info_box">
          {console.log("Add Partner Info is ", addPartnerInfo)}
          {addPartnerInfo?.length > 0 &&
            !addPartner &&
            addPartnerInfo.map((partnerInfo) => (
              <>
                {partnerInfo?.data && (
                  <div className="added_partner_info">
                    {partnerInfo?.data?.profilePhotoUrl && (
                      <Avatar
                        src={partnerInfo?.data?.profilePhotoUrl}
                        style={{
                          width: "21px",
                          height: "21px",
                        }}
                      />
                    )}
                    <p>{partnerInfo?.data?.name}</p>
                    <CancelIcon
                      className="cancel_icon"
                      onClick={() => {
                        dispatch({
                          type: actionTypes.REMOVE_PARTNER_INFO,
                          data: partnerInfo?.data,
                        });
                      }}
                    />
                  </div>
                )}
              </>
            ))}
        </div>
        <div className="tinderCards_cardContainer">
          {console.log("StoryParts is ", storyParts)}
          {storyParts?.length > 0 && (
            <>
              {storyParts.map((part, index) => (
                <>
                  <TinderCard
                    className="swipe"
                    // key={part.caption}
                    preventSwipe={["up", "down"]}
                    //  onCardLeftScreen = {() => outOfFrame(person.name)}
                    onSwipe={() => {
                      setP(0);
                      console.log("Index is ", index);
                      if (index === 0) {
                        const newStoryParts = storyParts;
                        setStoryParts([]);
                        setStoryParts(newStoryParts);
                      }
                    }}
                  >
                    <div className="card text_card">
                      <p>{part?.text}</p>
                    </div>
                  </TinderCard>
                </>
              ))}
            </>
          )}
        </div>
      </div>

      <div
        className="write_text add_caption"
        style={{
          marginTop: "0px",
        }}
      >
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder={`Why did you start ${userInfo?.passion} as your passion?`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          value={reasonOfPassion}
          onChange={(e) => setReasonOfPassion(e.target.value)}
          style={{
            paddingLeft: "10px",
            paddingTop: "10px",
            height: "150px",
          }}
        ></textarea>

        <input
          type="number"
          min={1}
          placeholder={`In which year you started ${userInfo?.passion} ?`}
          value={yearOfStart}
          onChange={(e) => setYearOfStart(e.target.value)}
          style={{
            borderRadius: "10px",
            padding: "10px",
            outline: 0,
            width: "28vw",
            border: "1px solid gray",
            marginTop: "10px",
          }}
        />
      </div>
    </>
  )}


  const[questions, setQuestions] = useState([
    {
      question : `Mention your experience with ${userInfo?.passion} from start till now in terms of your daily schedule so that beginners can get inspired and follow the same path`
    },
    {
      question : `Let all of us know bout your biggest achievement in your journey`
    },
    {
      question : `Mention your yearwise  progress and achievements through cards from start`
    },
    {
      question : `Please share some things that you learnt in this journey with beginners`
    }
  ])
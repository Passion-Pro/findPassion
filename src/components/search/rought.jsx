<Container>
<div className="passion_logo">
  {/* <div className="passion_title">
    <p>WEB DEVLOPMENT</p>
    </div> */}
  {/* <div className="add_learning">
      <button onClick={add_learning}>Start learning together 🚀</button>
    </div> */}
</div>
<p
  style={{
    display: "none",
  }}
>
  {z}
</p>
<div className="options_header">
  <div className="options_buttons">
    <button className="learnings_button">Learnings</button>
    <button
      className="stories_button"
      onClick={(e) => history.push("/stories")}
    >
      Journeys
    </button>
    <button
      className="stories_button"
      style={{
        marginLeft: "20px",
      }}
      onClick={(e) => history.push("/posts")}
    >
      Posts
    </button>
  </div>

  <div className="add_learning_button">
    <button onClick={add_learning}>Start learning together 🚀</button>
  </div>
</div>
<h1>Mere learning</h1>
{learnings.map((learning) => (
  <>
    {learning.data.started_by.email === userInfo.email && (
      <Learning learning={learning} type="my" />
    )}
  </>
))}
<h1>Joined learning</h1>
{joinedLearnings.map((learning) => (
  <>
    {/* {learning.data.started_by.email === userInfo.email && ( */}
      <Learning learning={learning} type="joined" />
    {/* )} */}
  </>
))}
{/* {x === 1 && learnings?.length > 0 && (
  <div className="my_learnings">
    <p className="my_learnings_title">My Learnings</p>
    <div className="my_learnings_learnings">
      {learnings.map((learning) => (
        <>
          {learning.data.started_by.email === userInfo.email && (
            <Learning learning={learning} type="my" />
          )}
        </>
      ))}
      {joinedLearnings.map((learning) => (
        <Learning
          learning={learning?.data?.learning}
          type="joined"
          learnings={allLearnings}
        />
      ))}
    </div>
  </div>
)} */}
{/* {x === 1 && learnings?.length > 0 && userInfo?.passion !== "Don't  know" && (
  <div className="all_learnings">
    {learnings1.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}

    {learnings2.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings3.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings4.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings5.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings6.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings7.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings8.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings9.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings10.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings11.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
    {learnings12.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}

    {learnings13.map((learning) => (
      <Learning learning={learning} type="all" />
    ))}
  </div>
)} */}
{/* {userInfo?.passion === "Don't know" && (
  <div className="all_learnings">
    {allLearnings.map(({ learning }) => (
      <Learning learning={learning} type="all" />
    ))}
  </div>
)} */}
<NewLearningPopup tags={tags} />
</Container>
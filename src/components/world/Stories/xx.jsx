<div className='PostPopup' >
            <div className="PostPopup__IN">
                <div className="postPopup__Field" onClick={()=>history.push('/addpost')}>
                   <img src={regularPost} alt="" style={{color:"blue"}} />
                    Regular Post
                </div>
                <div className="postPopup__Field" onClick={()=>history.push('/landspacepost')}>
                <img src={landscape} alt="" />
                    Landscape Post
                </div>
                <div className="postPopup__Field" onClick={()=>history.push('/portraitpost')}>
                <img src={portrait} alt="" />
                    Portrait Post
                </div>
            </div>
        </div>
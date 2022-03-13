import React, { useState, useEffect } from "react";
import TinderCard from "react-tinder-card";
import { useStateValue } from "../../../StateProvider";
import { actionTypes } from "../../../reducer";
import { Wave, Random } from "react-animated-text";
import Typical from "react-typical";

function Card({ image, images, index, imageCaption , setImages }) {
  const [{ startJourney }, dispatch] = useStateValue();
  const [string, setString] = useState("");

  useEffect(() => {
      console.log("Index is " , index);
      console.log(image);
      console.log("StartJourney is " , startJourney);
    if (image && startJourney) {
      setString("");
      setString(image?.imageCaption);
    }
  }, [index, image]);

  return (
    <>
      { startJourney && image && (
        <TinderCard
          className="swipe"
          // key={part.caption}
          preventSwipe={["up", "down"]}
          //  onCardLeftScreen = {() => outOfFrame(person.name)}
          onSwipe={() => {
            if (index === 0) {
              console.log("Index is ", index);
              dispatch({
                type: actionTypes.START_JOURNEY,
                startJourney: false,
              });
            }
            
          }}
        >
          <div
            className="card"
            style={{
              backgroundImage: `url(${image.imageUrl})`,
            }}
          >
            <div className="image_caption">
              {/* <p>
              {image?.imageCaption?.length > 180
                ? image?.imageCaption?.slice(0, 180) + "..."
                : image?.imageCaption}
            </p> */}
              <p>
                <Typical steps={[`${string}`, 1]} wrapper="b" />
              </p>
            </div>
          </div>
        </TinderCard>
      )}
    </>
  );
}

export default Card;

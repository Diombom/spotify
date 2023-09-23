import React, { useEffect, useRef, useState } from 'react';

import './NowPlaying.scss';
import { icons, images } from '../../constants';

const NowPlaying = () => {

  // useRef

  const progressBar = useRef();

  const currentTimeCount = useRef('00:00');
  
  const totalTime = useRef();

  // useState

  const [isPaused, setIsPaused] = useState(true)

  const [currentTime, setCurrentTime] = useState(24);

  const [totalTimeCount, setTotalTimeCount] = useState(192);

  // Display Current Play Time & Position
  
  useEffect(() => {

    if(currentTime < 60) {
  
      if(currentTime < 10) {

        currentTimeCount.current.innerText = `00:0${currentTime}`;
      } else {

        currentTimeCount.current.innerText = `00:${currentTime}`;
      }
    } else {

      const minutes = Math.floor(currentTime / 60);

      const seconds = currentTime % 60;

      if(seconds < 10) {

        currentTimeCount.current.innerText = `0${minutes}:0${seconds}`;
      } else {

        currentTimeCount.current.innerText = `0${minutes}:${seconds}`;
      }
    }

    const progress = ((currentTime / totalTimeCount) * 100) - 100 + "%";
  
    const progressBarLine = progressBar.current;

    progressBarLine.setAttribute('style', `transform: translateX(${progress})`);

    if(isPaused === false) {

      if(currentTime === totalTimeCount) {

        setIsPaused(true);
      }

      if(currentTime < totalTimeCount) {

        setTimeout(() => {
    
          setCurrentTime(currentTime + 1);
    
        }, 1000);
      }  
  
      // console.log(`Current Time => ${currentTime}s \nTotal Time => ${totalTimeCount} \nCurrent Time Displayed => ${currentTimeCount.current.innerText} \nCurrent Time Position =>   ${progress}`);
    }

  }, [currentTime, isPaused]);

  // Display Total Play Time

  useEffect(() => {

    if(totalTimeCount > 59) {

      const minutes = Math.floor(totalTimeCount/60);
  
      const seconds = totalTimeCount % 60;

      if(seconds < 10) {

        totalTime.current.innerText = `0${minutes}:0${seconds}`
      } else {

        totalTime.current.innerText = `0${minutes}:${seconds}`
      }
    } else {

      const seconds = totalTimeCount % 60;

      if(seconds < 10) {

        totalTime.current.innerText = `00:0${seconds}`
      } else {

        totalTime.current.innerText = `00:${seconds}`
      }
      
    }
  }, [])
  
  // Handle the Play/Pause Functions

  const handlePause = () => {

    if(isPaused === true) {

      if(currentTime >= totalTimeCount) {
        
        setCurrentTime(0);
  
        setIsPaused(false)

        console.log("Playing")
      } else {
  
        setIsPaused(false);
        
        console.log("Playing")
      }
    } else {
      setIsPaused(true);

      console.log("Paused")
    }    
  }

  // Handle Jump To

  const handleJumpTo = (e) => {

    if(e.target.classList[0] === "playtime") {

      const clientWidth = e.target.clientWidth;

      const clientHeight = e.target.clientHeight;

      const offsetX = e.nativeEvent.offsetX;

      const offsetY = e.nativeEvent.offsetY;

      console.log(`Client (${clientWidth},${clientHeight}) \nOffset(${offsetX},${offsetY})`)
      
       const fraction = offsetX / clientWidth;
  
       const setTimeTo = Math.round(fraction * totalTimeCount);
  
      //  setCurrentTime(setTimeTo);
    }

  }

  return (
    <div className="now-playing-container flex flex-row">
      <div className="title-section flex flex-row flex-start align-center">
        <div className="image-container">
          <img src={images.image} alt="now playing" />
        </div>
        <div className="info-container flex flex-col">
          <p className="title semibold text-white">Mood (Remix) feat. Justin Beiber, J Balvin &amp; iann dior</p>
          <p className="author text-sm">24kGoldn, Justin Beiber, JBalvin & iann dior</p>
        </div>
      </div>
      <div className="play-actions flex flex-row justify-center align-center">
        <div className="like-container">
          <img src={icons.heart} alt="add to favorites" />
        </div>
        <div className="play-container flex flex-col justify-center align-center">
          <div className="buttons-container flex flex-row jusitfy-center align-center">
            <img src={icons.shuffle} alt="shuffle" />
            <img src={icons.prev} alt="prev" />
            {isPaused === true 
              ? <img src={icons.play} alt="play" className="play" onClick={() => handlePause()} /> 
              : <img src={icons.pause} alt="pause" className="pause" onClick={() => handlePause()} />}            
            <img src={icons.next} alt="next" />
            <img src={icons.repeat} alt="repeat" />
          </div>
          <div className="timeline-container flex flex-row justify-center align-center">
            <div ref={currentTimeCount} className="current-time flex justify-end"></div>
            <div className="playtime-container flex flex-row justify-center align-center" onClick={(e) => handleJumpTo(e)}>
              <div className="playtime relative">
                <div ref={progressBar} className="current-playtime flex justify-start">
                  <div className="current-playtime-indicator"></div>
                </div>
              </div>
            </div>
            <div ref={totalTime} className="total-time"></div>
          </div>          
        </div>
      </div>
      <div className="play-options flex flex-row justify-end align-center">
        <img src={icons.radio} alt="lyrics" />
        <img src={icons.queue} alt="queue" />
        <img src={icons.currentDevice} alt="current device" />
        <img src={icons.plus} alt="volume" />
        <div className="volume-slider"></div>
      </div>
    </div>
  )
}

export default NowPlaying
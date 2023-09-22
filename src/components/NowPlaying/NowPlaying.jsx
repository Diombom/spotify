import React from 'react';

import './NowPlaying.scss';
import { icons, images } from '../../constants';

const NowPlaying = () => {
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
            <img src={icons.play} alt="play" className="play" />
            <img src={icons.next} alt="next" />
            <img src={icons.repeat} alt="repeat" />
          </div>
          <div className="timeline-container flex flex-row justify-center align-center">
            <div className="current-time">0:48</div>
            <div className="playtime relative"></div>
            <div className="total-time">3:12</div>
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
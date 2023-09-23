import React from 'react';
import { useState, useEffect } from 'react';

import { icons, images } from '../../constants';
import { frequentlyListened, personalizedPlaylists } from '../../constants/data';

import './Main.scss';

const Main = () => {
  return (
    <>
        <div className="gap-v"></div>
        <div className="main flex flex-col">
            <div className="header flex flex-row align-center">
                <div className="action-buttons flex flex-row justify-start align-center">
                    <img className="go-back" src={icons.actionLeft} alt="go back" />
                    <img className="go-forward" src={icons.actionRight} alt="go forward" />
                </div>
                <div className="account-action-buttons flex flex-row justify-end align-center">
                    <div className="install-app-container flex flex-row fit-content align-center">
                        <img src={icons.arrowDown} alt="download" />
                        <p className="semibold">Install App</p>
                    </div>
                    <img src={icons.notification} alt="notification" className="notification" />
                    <img src={images.image} alt="profile" className="profile" />
                </div>
            </div>
            <div className="greeting-container flex flex-row justify-start align-center">
                <div className="greeting">Good afternoon</div>
            </div>
            <div className="frequently-listened-container">
                {frequentlyListened.map((item) => (
                    <div className="frequently-listened flex flex-row" key={item.id + "+" + item.title}>
                        <div className="image-container">
                            <img src={item.imgUrl} alt={item.title} />
                        </div>
                        <div className="title-container flex flex-row justify-start align-center">
                            <p className="title">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="personalized-playlist-container flex flex-col align-start">
                { personalizedPlaylists.map((item) => (
                    <div className="personalized-playlist flex flex-col" key={item[1][1].id + "+" + item[1][1].title}>
                        <div className="personalized-header flex flex-row">
                            <div className="header-title-container flex flex-row justify-start align-center">
                                <p className="header-title flex">{item[0]}</p>
                            </div>
                            <div className="show-all-container flex flex-row justify-end align-center">
                                <p className="show-all flex">Show all</p>
                            </div>
                        </div>

                        <div className="personalized-card-container">
                            {item[1].map((personalized) => (
                                <div className="personalized-card flex flex-col" key={personalized.id + "+" + personalized.title +  "+" + personalized.description}>
                                    <div className="wrapper flex justify-center align-center">
                                        <div className={personalized.type === "Artist" ? "image-container artist" : "image-container"}>
                                            <div className={personalized.type === "Artist" ? "hidden" : "play-item flex justify-center align-center"}>
                                                <img src={icons.play} alt="Play Item" />
                                            </div>
                                            <img src={personalized.imgUrl} alt={personalized.title} />
                                        </div>
                                    </div>
                                    <div className="detail-container flex flex-col">
                                        <div className="wrapper">
                                            <p className="title sub-heading text-white">{personalized.title}</p>
                                        </div>
                                        <div className="wrapper">
                                            { personalized.type === "Playlist" ? <p className="description">{personalized.description}</p> : (personalized.type === "Album" ? <p className="creator">{personalized.creator}</p> : <p className="artist">{personalized.creator}</p> )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="gap-100"></div>
            </div>
        </div>
    </>
  )
}

export default Main
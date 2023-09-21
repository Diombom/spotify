import React from 'react';
import { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { icons } from '../../constants';
import { playlists } from '../../constants/data';

import './Sidebar.scss';

const Sidebar = () => {

  function getWindowHeight() {

    const { innerHeight: height, innerWidth: width } = window;

    return {
      height, width
    };
  }

  // States
  
  const [windowHeight, setWindowHeight] = useState(getWindowHeight());

  const [collapseSidebar, setCollapseSidebar] = useState(false);

  const [expandSidebar, setExpandSidebar] = useState(false);

  const [listGridToggle, setListGridToggle] = useState('list');

  const [activePlaylist, setActivePlaylist] = useState('Playlist');
  
  const [showPlaylists, setShowPlaylists] = useState([]);

  var showActivePlaylist = '';

  // Refs

  const playlistContainer = useRef(0);

  const searchFilterBar = useRef();

  const sidebar = useRef();

  const sidebarHeader = useRef();

  useLayoutEffect(() => {

    const { innerHeight: height} = window;

    if (searchFilterBar.current.offsetHeight > 0) {

      playlistContainer.current.setAttribute('style', `min-height: ${height - 288}px; max-height: ${height - 288}px`);
    } else {

      playlistContainer.current.setAttribute('style', `min-height: ${height - 240}px; max-height: ${height - 240}px`);
    }
  }, [windowHeight.height])

  useLayoutEffect(() => {
    
    if(windowHeight.width < 1023) {

      playlistContainer.current.setAttribute('style', `min-height: ${windowHeight.height - 288}px; max-height: ${windowHeight.height - 288}px`);

      setExpandSidebar(false);
    }

    if(windowHeight.width < 670) {

      setCollapseSidebar(true);

      setListGridToggle('list');

      playlistContainer.current.classList.add('fit-content');

      setCollapseSidebar(true);

      sidebar.current.setAttribute('style', "max-width: 106px;");

      playlistContainer.current.setAttribute('style', `min-height: ${windowHeight.height - 240}px; max-height: ${windowHeight.height - 240}px`);
    } else {

      playlistContainer.current.classList.remove('fit-content');
    }

  }, [windowHeight.width])


  // Functions  

  const handleCollapseSidebar = () => {

    if(collapseSidebar === false) {

      setCollapseSidebar(true);

      sidebar.current.setAttribute('style', "max-width: 106px;");
    } else {

      setCollapseSidebar(false);

      sidebar.current.removeAttribute('style', "max-width: 106px;");
    }

    setListGridToggle('list');
  }

  const handleExpandSidebar = () => {

    const { innerHeight: height} = window;

    expandSidebar === false ? playlistContainer.current.setAttribute('style', `min-height: ${height - 240}px; max-height: ${height - 240}px`) : playlistContainer.current.setAttribute('style', `min-height: ${height - 288}px; max-height: ${height - 288}px`);

    expandSidebar === false ? setExpandSidebar(true) : setExpandSidebar(false);    

  }

  const handleListGridToggle = () => {

    listGridToggle === 'list' ? setListGridToggle('grid') : setListGridToggle('list');
  }

  const handleActivePlaylist = (value) => {

    const siblings = value.target.parentNode.children;
    
    siblings[0].classList.remove('hidden');

    siblings[1].classList.remove('active');

    siblings[2].classList.remove('active');

    value.target.classList.add('active');

    setActivePlaylist(value.target.innerText.slice(0, -1));
    
  }

  const handleClearPlaylistFilter = (value) => {

    const siblings = value.target.parentNode.children;

    siblings[1].classList.remove('active');

    siblings[2].classList.remove('active');

    value.target.classList.add('hidden');

    setActivePlaylist('Playlist');
    
  }
  
  useEffect(() => {

    const filteredPlaylists = playlists.filter((playlist) => playlist.type === activePlaylist);
    
    setShowPlaylists(filteredPlaylists);
    
    showActivePlaylist = activePlaylist;
    
  }, [activePlaylist])

  useEffect(() => {
    function handleResize() {
      setWindowHeight(getWindowHeight());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])
  

  return (
    <div ref={sidebar} className={ (collapseSidebar === true ? "sidebar collapse" : "sidebar") && (expandSidebar === true ? "sidebar expanded" : "sidebar") }>
      <nav>
        <div ref={sidebarHeader} className="header">
          <div className={ collapseSidebar === true ? "header-item justify-center-force" : "header-item"}>
            <img src={icons.home} alt="home" />
            <p className={ collapseSidebar === true ? "sub-heading active hidden" : "sub-heading active" }>Home</p>
          </div>
          <div className={ collapseSidebar === true ? "header-item justify-center-force" : "header-item"}>
            <img src={icons.search} alt="search" />
            <p className={collapseSidebar === true ? "sub-heading hidden" : "sub-heading"}>Search</p>
          </div>
        </div>
        <div className="gap-h"></div>
        <div className="sidebar-main">
          <div className="action-container">
            <div className={ collapseSidebar === true ? "left justify-center-force" : "left"}>
              <div className="collapse-container" onClick={() => handleCollapseSidebar()}>
                <img src={icons.sidebarCollapseFill} alt="collapse sidebar" />
              </div>
              <div className="label">
                <p className={collapseSidebar === true ? "sub-heading hidden" : "sub-heading"}>Your Library</p>
              </div>
            </div>
            <div className={collapseSidebar === true ? "hidden" : "right"}>
              <div className="create-container">
                <img src={icons.plus} alt="create playlist" />
              </div>
              <div className={ expandSidebar === true ? "display-grid-list" : "hidden"} onClick={() => handleListGridToggle()}>
                { listGridToggle === "list" ? <img src={icons.grid} alt="show grid playlist" /> : <img src={icons.list} alt="show list playlist" /> }
              </div>
              <div className="expand-container" onClick={() => handleExpandSidebar()}>
                { expandSidebar === true ? <img src={icons.arrowLeft} alt="expand" /> : <img src={icons.arrowRight} alt="expand" /> }
              </div>
            </div>
          </div>
          <div className={collapseSidebar === true ? "hidden" : "playlist-tags"}>
            <div className="tag cancel hidden" onClick={(e) => handleClearPlaylistFilter(e)}>
              <img src={icons.close} alt="cancel filter" />
            </div>
            <p className="tag" onClick={(e) => handleActivePlaylist(e)}>Playlists</p>
            <p className="tag" onClick={(e) => handleActivePlaylist(e)}>Albums</p>
            
            <div className={expandSidebar === true ? "search-filter flex flex-row justify-end align-center" : "hidden"}>
              <img src={icons.search} alt="search" />
              <div className="recents flex flex-row justify-end align-center">
                <p className="filter-label">Recents</p>
                <img className="caret" src={icons.play} alt="filter" />
              </div>
            </div>
          </div>
          <div ref={searchFilterBar} className={collapseSidebar === true ? "hidden" : (expandSidebar === true ? "hidden" : "search-filter-bar")}>
            <div className="left">
              <img src={icons.search} alt="search" />
            </div>
            <div className="right">
              <p className="filter-label">Recents</p>
              <img className="caret" src={icons.play} alt="filter" />
            </div>
          </div>
          <div ref={playlistContainer} className={ listGridToggle === "list" ? "playlists flex list" : (expandSidebar === true ? "playlists grid" : "playlists flex list") }>
            {showPlaylists.map((playlist) => (
              <>
                <div ref={playlists} className={ collapseSidebar === true ? "playlist flex fit-content" : "playlist flex" }  key={playlist.id + "+" + playlist.title}>
                  <div className="img-container flex justify-start align-center">
                    <img src={playlist.imgUrl} alt="playlist thumbnail" />
                  </div>
                  <div className={ collapseSidebar === true ? "hidden" : "details-container flex flex-col justify-start align-start"}>
                    <p className="title semibold">{playlist.title}</p>
                    <div className="description flex flex-row justify-start align-center">                      
                      {playlist.isPinned === true ? <img src={icons.heartFill} alt="pinned" /> : ""}
                      <p className="type">{playlist.type}</p>                      
                      <div className="circle"></div>
                      {playlist.songCount ? <p className="song-count">{playlist.songCount} songs</p> : <p className="creator">{playlist.creator}</p> }
                    </div>
                  </div>
                  <div className={ (expandSidebar === true ? (collapseSidebar === true ? "date-added-container hidden": "date-added-container flex align-center") : "date-added-container hidden") }>
                    <p className="semibold text-sm">{playlist.created}</p>
                  </div>
                  <div className={ (expandSidebar === true ? (collapseSidebar === true ? "played-container hidden" : "played-container flex align-center") : "played-container hidden") }>
                    <p className="semibold text-sm">{playlist.lastPlayed}</p>
                  </div>
                </div>
              </>
            ))}
            <div className="gap-110"></div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Sidebar
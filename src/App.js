import React from 'react';

import { Sidebar, NowPlaying, Main } from './components';
import './App.scss';
import './index.css';

const App = () => {
  return (
    <div className="app flex flex-row">
      <Sidebar />
      <Main />
      {/* <NowPlaying /> */}
    </div>
  )
}

export default App
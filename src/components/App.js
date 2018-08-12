import React, { Component } from 'react';
import Map from "../containers/Map";
import SearchBar from "../containers/SearchBar"
import PinDropper from "../containers/pin_dropper";
import AreaModal from '../containers/AreaModal';

import '../App.css';

class App extends Component {
  render() {
    return (
      <div>
        <PinDropper/>
        <SearchBar/>
          <div className="center">
            <Map/>
          </div>
        <AreaModal/>
      </div>
    );
  }
}

export default App;

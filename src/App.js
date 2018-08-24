import React, { Component } from 'react';
import MapComponent from './components/Map';

class App extends Component {
    render() {
        return (
            <div className="App">
                <MapComponent
                    isMarkerShown
                    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBEttZ5SI2efRacfNFCL21j4HtGZo5Od58&v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default App;

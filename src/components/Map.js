import React from 'react';
import { GoogleMap, Marker } from 'react-google-maps';
import GoogleMapHoc from '../hoc/GoogleMapHoc';
import axios from 'axios';

const google = window.google;

class MapComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            lat: 0,
            lng: 0,
            map: undefined,
            pagetoken: null
        };
        this.success = this.success.bind(this);
        this.error = this.error.bind(this);
        this.callback = this.callback.bind(this);
    }

    componentWillMount() {
        navigator.geolocation.getCurrentPosition(this.success, this.error);
        // axios({
        //     method: 'GET',
        //     url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyBEttZ5SI2efRacfNFCL21j4HtGZo5Od58&location=14.599512,120.984222&radius=100000&type=bank&keyword=UnionBank',
        // }).then(res => {
        //     console.log(res);
        // });
    }

    success(position) {
        const { coords } = position;
        this.setState({ lat: coords.latitude, lng: coords.longitude });
        console.log(this._map.getBounds());
    }

    error(err) {
        console.log(err);
    }

    renderCoordinates() {
        return {
            lat: this.state.lat,
            lng: this.state.lng
        };
    }

    inputHandler(e) {
        let value = e.target.value;
        let request = {
            location: {
                lat: 13.7567,
                lng: 121.0584
            },
            region: 'ph',
            pagetoken: this.state.pagetoken,
            radius: 800,
            keyword: 'Unionbank',
            name: 'UnionBank',
            // query: 'Ortigas UnionBank',
            type: ['bank', 'atm']
        };
        // let getDetails = {
        //     placeId: 'ChIJ67253fLJlzMRRz5bZCKOMso'
        // }
        if (this._map) {
            let service = new google.maps.places.PlacesService(this._map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
            // let service = new google.maps.places.PlacesService(this._map);
            service.nearbySearch(request, this.callback);
            // service.getDetails(getDetails, this.callback);
        }
    }

    callback(result, status, pagination) {
        console.log(result);
        console.log(pagination);
        if (pagination.hasNextPage) {
            pagination.nextPage();
        }
    }

    render() {
        return (
            <div>
                <GoogleMapHoc
                    isMarkerShown={this.props.isMarkerShown}
                    googleMapURL={this.props.googleMapURL}
                    loadingElement={this.props.loadingElement}
                    containerElement={this.props.containerElement}
                    mapElement={this.props.mapElement}
                >
                    <GoogleMap
                        ref={e => this._map = e}
                        defaultZoom={15}
                        defaultCenter={this.renderCoordinates()}
                        center={this.renderCoordinates()}
                    >
                        {this.props.isMarkerShown && <Marker position={{ lat: this.state.lat, lng: this.state.lng }} />}
                    </GoogleMap>
                </GoogleMapHoc>
                <input onChange={this.inputHandler.bind(this)} />
            </div>
        );
    }
}

// const MapComponent = withScriptjs(withGoogleMap((props) => (
//     <GoogleMap
//         defaultZoom={8}
//         defaultCenter={{ lat: coordinates.latitude, lng: coordinates.longitude }}
//     >
//         {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} />}
//     </GoogleMap>
// )));

export default MapComponent;

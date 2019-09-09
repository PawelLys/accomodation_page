import React from 'react';
import { connect } from 'react-redux';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { headerAccepted, navChangeStyle, enterLocationSubpage, leavePage, hoverNav } from '../actions';

class LocationMapPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.headerAccepted(false);
        this.props.hoverNav(false);
        this.props.navChangeStyle(true);
        this.state = {
          showingInfoWindow: false, 
          activeMarker: {},      
          selectedPlace: {}      
        };
        setTimeout(() => {
          this.props.enterLocationSubpage();
        }, 100);
    };

    componentWillUnmount = () => this.props.leavePage();
    
    onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

    render() {
        return (
              <section className="map">
                <div className="map-title" style={this.props.hover ? {opacity: '0', visibility: 'hidden'} : null}>
                  Find us:
                </div>
                <div className="map-title" 
                  style={this.props.hover ? {opacity: '0', visibility: 'hidden'} : {paddingTop: '2rem'}}
                >
                  Zakopane Accomodation, 00-000 ul. Nieistniejąca 54
                </div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                        lat: 49.268850,
                        lng: 19.981794
                    }}
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={'Zakopane Accomodation, 02-042 ul. Nieistniejąca 54'}
                    />
                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                        onClose={this.onClose}
                    >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                    </InfoWindow>
                </Map>
              </section>
        );
    };
};

const mapStyles = {
    position: 'absolute', 
    left: '50%', 
    top: '30%',
    transform: 'translate(-50%, 10%)',
    width: '95%',
    height: '60%',
    transition: 'all .5s'
};

const mapStateToProps = state => {
  return { hover: state.headerState };
}

const mapWrapped = GoogleApiWrapper({
    apiKey: 'AIzaSyBb4uRjxqUDQyXtMRC3NBBQLy3TmdBwnNw'
  })(LocationMapPage);
  
export default connect(mapStateToProps, { 
  headerAccepted, navChangeStyle, enterLocationSubpage, leavePage, hoverNav 
})(mapWrapped);


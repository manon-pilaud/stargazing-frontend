import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, {Marker,Popup, NavigationControl, FullscreenControl} from "react-map-gl";
import Icon from './MapIcon'
import {Link} from 'react-router-dom'

const MAPBOX_TOKEN =
process.env.REACT_APP_MAP_API_KEY;

const navStyle = {
  position: 'absolute',
  top: 36,
  left: 0,
  padding: '10px'
};

const fullscreenControlStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  padding: '10px'
};

export default class Map extends Component {

      state = {
        clickedLocation: "",
        viewport: {
          width: 400,
          height: 400,
          latitude:31.312739,
          longitude: -0.0,
          zoom: 1.15
        }
      };


    mapRef = React.createRef();

      componentDidMount() {
        window.addEventListener("resize", this.resize);
        this.resize();
      }

      componentWillUnmount() {
        window.removeEventListener("resize", this.resize);
      }

      resize = () => {
        this.handleViewportChange({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      handleViewportChange = viewport => {
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        });
      };

      handleLocationClick=(location)=>{
        this.setState({
          clickedLocation: location
        })
      }

      _updateViewport = (viewport) => {
        this.setState({viewport});
      }

      render() {
        const { viewport } = this.state;
        return (
          <MapGL
            ref={this.mapRef}
            {...viewport}
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle={'mapbox://styles/mandyyp/cjtq7tdec0ywn1ftjz9y7sjnv'}
            children={this.props.children}
          >
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>

          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>

            {this.props.locations.map((location,index)=>
              <Marker latitude={location.latitude} longitude={location.longitude} key={index}>
                  <Icon onClick={()=>this.handleLocationClick(location)}/>
              </Marker>
            )}

            {this.state.clickedLocation?
              <Popup tipSize={8}
                  anchor="top"
                  longitude={this.state.clickedLocation.longitude}
                  latitude={this.state.clickedLocation.latitude}
                  closeOnClick={false}
                  onClose={() => this.setState({clickedLocation: ""})} >
                <div>
                  <center><h7>{this.state.clickedLocation.name} | {this.state.clickedLocation.country}</h7></center>
                  <br/>
                  <center><img width={240} src={this.state.clickedLocation.image}/></center>
                    <br/>
                    <center><Link to={`/location/${this.state.clickedLocation.id}`}> More Info</Link></center>
                </div>
              </Popup>
            :null}
          </MapGL>
        );
      }
    }

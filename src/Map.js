import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, {Marker,Popup, NavigationControl, FullscreenControl} from "react-map-gl";
import Icon from './MapIcon'
import {Link} from 'react-router-dom'
import AddLocation from './AddLocation'

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

const createLocationStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  padding: '10px'
};

export default class Map extends Component {

      state = {
        createForm:false,
        clickedLocation: "",
        clickedMapCoord:"",
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
        this.setState({
          latitude:"",
          longitude:""
        })
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

      getCreateForm=()=>{
        this.setState({
          createForm: true
        })
      }

      _updateViewport = (viewport) => {
        this.setState({viewport});
      }
      mapClicked=(e)=>{
        if(this.state.createForm === true){
          if(e.features[0].layer.id !== "water"){
            this.setState({clickedMapCoord:e.lngLat})
          }
        }
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
            onClick={(e)=>this.mapClicked(e)}
          >
          <div className="nav" style={navStyle}>
            <NavigationControl onViewportChange={this._updateViewport} />
          </div>

          <div className="fullscreen" style={fullscreenControlStyle}>
            <FullscreenControl />
          </div>

          <div className="create_location" style={createLocationStyle}>
            <div id="create-location-label" onClick={()=>this.getCreateForm()}>
              Create StarGazing Location
              <br/>
              <center>★</center>
            </div>
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
                  <center><h6><font color="black">{this.state.clickedLocation.name} | {this.state.clickedLocation.country}</font></h6></center>
                  <br/>
                  <Link to={`/location/${this.state.clickedLocation.id}`}>
                    <center><img width={240} src={this.state.clickedLocation.image}/></center>
                  </Link>
                    <br/>
                    <center><Link to={`/location/${this.state.clickedLocation.id}`}> More Info</Link></center>
                </div>
              </Popup>
            :null}
            {this.state.createForm?
              <Popup tipSize={8}
                anchor="left"
                longitude={160.544484}
                latitude={79.963029}
                closeOnClick={false}
                onClose={() => this.setState({createForm: false,clickedMapCoord:""})}
                >
                <AddLocation coordinates={this.state.clickedMapCoord}
                postLocation={this.props.postLocation}/>
              </Popup>
            :null}
          </MapGL>
        );
      }
    }

import "mapbox-gl/dist/mapbox-gl.css";
import React, { Component } from "react";
import { render } from "react-dom";
import MapGL, {Marker} from "react-map-gl";

const MAPBOX_TOKEN =
process.env.REACT_APP_MAP_API_KEY;
export default class Map extends Component {

      state = {
        viewport: {
          width: 400,
          height: 400,
          latitude:31.312739,
          longitude: -0.0,
          zoom: 1.15
        },
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
        // if (viewport.longitude > 0) {
        //   viewport.longitude = 0;
        // }
        // else if (viewport.longitude < 1) {
        //   viewport.longitude = 0;
        // }
        this.setState({
          viewport: { ...this.state.viewport, ...viewport }
        });
      };

      render() {
        const { viewport } = this.state;

        return (
          <MapGL
            ref={this.mapRef}
            {...viewport}
            onViewportChange={this.handleViewportChange}
            mapboxApiAccessToken={MAPBOX_TOKEN}
            mapStyle={'mapbox://styles/mandyyp/cjtq7tdec0ywn1ftjz9y7sjnv'}
          >
            <Marker latitude={28.18812} longitude={-97.8375}>
              ✨
            </Marker>
          </MapGL>
        );
      }
    }

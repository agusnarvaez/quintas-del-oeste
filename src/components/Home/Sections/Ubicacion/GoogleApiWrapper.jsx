import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'
import React, { Component } from 'react'
import credentials from "../../../../credentials"

export class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: '100%',
      height: '100%',
      position: 'relative'
    }
    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: '100%'
      }

    return (
      <div className="container-fluid p-0 col-12 col-lg-9" style={{ height: '100%', width:"100%",position: 'relative' }} >
        <Map
          google={this.props.google}
          style={mapStyles}
          containerStyle={containerStyle}
          className={'map'}
          zoom={15}
          initialCenter={{
            lat: -34.61153207171338,
            lng: -58.97866556622995
          }}
        >
          <Marker
            onClick={() => console.log("Marker clicked")}
            name={'Entrada al barrio'}
            position={{
              lat: -34.61153207171338,
              lng: -58.97866556622995
            }}
          />
        </Map>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: credentials.mapsKey,
  language: "spanish"
})(MapContainer)
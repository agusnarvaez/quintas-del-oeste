import GoogleMapReact from 'google-map-react'

import credentials from '../../../../credentials'
const Marker = () => <div className='position-relative' > <div className='bi bi-geo-alt-fill fs-1 position-absolute bottom-0'></div></div>


export default function GoogleMap(){
  const defaultProps = {
    center: {
      lat: -34.61153207171338,
      lng: -58.97866556622995
    },
    zoom: 15
  }

  const marker = {
    lat: -34.61153207171338,
    lng: -58.97866556622995
  }

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100%', width: '100%', padding:'0' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: credentials.mapsKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={marker.lat}
          lng={marker.lng}
        />
      </GoogleMapReact>
    </div>
  )
}
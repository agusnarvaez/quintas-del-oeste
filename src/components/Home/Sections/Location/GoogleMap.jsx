import GoogleMapReact from 'google-map-react'
import logoQuintasChico from '../../../../assets/logos/logoQuintasChico.png'
import credentials from '../../../../credentials'
/* <div className='bi bi-geo-alt-fill fs-1 position-absolute bottom-0'></div> */
/* const Marker = () => <div className='position-relative' > MARCADOR<img src={logoQuintasChico} alt='logo quintas chico' className='img-fluid' style={{width:'50px'}}/></div> */
const Marker = ({ src }) => (
  <div className='position-relative'>
    <img src={src} alt='logo quintas chico' className='img-fluid' style={{ width: '25px' }} />
  </div>
)

export default function GoogleMap(){
  const defaultProps = {
    center: {
      lat: -34.61153207171338,
      lng: -58.97866556622995
    },
    zoom: 15
  }

  const marker = {
    lat: -34.61114207171338,
    lng: -58.98466556622995
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
          src={logoQuintasChico}
          lat={marker.lat}
          lng={marker.lng}
        />
      </GoogleMapReact>
    </div>
  )
}
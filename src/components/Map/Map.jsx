import { useEffect, useState } from 'react';
import React from 'react';
import { MapContainer, ImageOverlay, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
import Marker from './Marker';
import MapEditor from './MapEditor';
import ExistingMarker from './ExistingMarker';
import quintasMap from '../../assets/map/mapaQuintas.jpg';
import { useLots } from '../../context/LotsContext';
import { isSelected } from '../../utils/mapUtils';


/* bounds={[
            [-34.61796764772112, -58.9950967727591],
            [-34.60685310029432, -58.97588954690971]
          ]} */
export default function Map({ setValue, getValues, adminMode }) {
  const { lot, lots, fetchLots } = useLots();
  const [zoomLevel, setZoomLevel] = useState(13);
  const bounds = [
    [-34.61796764772112, -58.9980967727591], // Mueve la longitud más al oeste
    [-34.60685310029432, -58.97288954690971] // Mueve la longitud más al este
  ]
  useEffect(() => {
    if (lots.length === 0) fetchLots()
  }, [lot])

  function ZoomListener({ setZoomLevel }) {
    const map = useMap();
    useMapEvents({
      zoomend: () => {
        setZoomLevel(map.getZoom());
        if (map.getZoom() < 16) {
          map.setZoom(16); // Establece el zoom mínimo permitido
        }
      }
    });
    return null;
  }

  return (
    <div className={adminMode ? 'map-container-admin' : 'map-container'}>
      <MapContainer
        center={{ lat: -34.611877785557, lng: -58.98403511557229 }}
        zoom={16}
        minZoom={13} // Zoom mínimo
        maxZoom={18} // Zoom máximo (opcional)
        style={{ width: '100%', height: '100%' }}
        className='leaflet-container'
        maxBounds={bounds} // Limites del mapa
        maxBoundsViscosity={1.0} // Resistancia al movimiento fuera de los limites
      >
        <ZoomListener setZoomLevel={setZoomLevel} />
        {adminMode && <MapEditor setValue={setValue} />}
        <ImageOverlay
          url={quintasMap}
          bounds={bounds}
        />
        {adminMode && <ExistingMarker getValues={getValues} zoom={zoomLevel} />}
        {lots.map((lotToShow, index) =>
          ((!lotToShow.reservation && !adminMode) ||
          (adminMode && !isSelected(getValues(), lotToShow))) &&
          <Marker
            key={index}
            lot={lotToShow}
            zoom={zoomLevel}
          />
        )}
      </MapContainer>
    </div>
  );
}

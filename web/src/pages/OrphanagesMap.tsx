import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../styles/pages/orphanages-map.css';

import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../util/mapIcon';
import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

const OrphanagesMap: React.FC = () => {

  const history = useHistory();

  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0
  })


  useEffect(() => {
      api.get('/orphanages').then((response) => {
      
        setOrphanages(response.data)
      });

      navigator.geolocation.getCurrentPosition((position: Position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      })
  },[])


  return (
    <div id="page-map">
      <aside>
        <header>
              <img src={mapMarkerImg} alt="Happy" onClick={() => history.push('/')}/>

              <h2>Escolha um orfanato no mapa</h2>
              <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Aguaí</strong>
          <span>São paulo</span>
        </footer>
      </aside>

      <Map 
        center={[currentLocation.latitude, currentLocation.longitude]}
        zoom={15}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
      
       {orphanages.map((orphanage) => (
          <Marker
            key={orphanage.id}
            icon={mapIcon}
            position={[orphanage.latitude, orphanage.longitude]}
          >
          <Popup
            closeButton={false}
            minWidth={240}
            maxWidth={240}
            className="map-popup"
          >
            {orphanage.name}
            <Link to={`/orphanages/${orphanage.id}`}>
              <FiArrowRight size={20} color="#fff" />
            </Link>
          </Popup>
        </Marker>
       ))}
        
      </Map>

      <Link to="/orphanages/create" className="create-orphanage">
        <FiPlus size="32" color="#fff"/>
      </Link>
    </div>
  )
}

export default OrphanagesMap;
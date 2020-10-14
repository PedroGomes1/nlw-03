import Leaflet from 'leaflet';

import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = Leaflet.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68], //Eixo x e y (29 metade de 58)
  popupAnchor: [0, -60]
});

export default mapIcon;
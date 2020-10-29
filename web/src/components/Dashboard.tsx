import React from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import mapMarkerImg from '../images/map-marker.svg';
import mapIcon from '../util/mapIcon';
import iconOrphanageRegisteredActive from '../images/orphanage-registered.svg';
import iconOrphanagePending from '../images/orphanage-pending.svg';
import iconOrphanageRegistered from '../images/orphanage-registered2.svg';
import iconOrphanagePendingActive from '../images/orphanage-pending2.svg';
import iconViewPending from '../images/icon-view-pending.svg';
import noPending from '../images/no-pending.svg';
import '../styles/components/dashboard.css'
import editInfo from '../images/edit-info.svg';
import deleteInfo from '../images/delete-info.svg';
import logout from '../images/logout.svg';
import { useAuth } from '../hooks/auth';
import { useHistory, useLocation } from 'react-router-dom';

export interface Orphanages {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

interface OrphanagesProps {
  orphanages: Orphanages[];
  title: string;
  quantity: number;
}

const Dashboard: React.FC<OrphanagesProps> = ({ 
  orphanages,
  title,
  quantity,
}) => {
  
  const history = useHistory();
  const { signOut } = useAuth();
  const { pathname } = useLocation();

  const handleLogout = () => {
    signOut();
    history.push('/');
  }

  const handleOrphanageEdit = (orphanage: Orphanages) => {
    history.push(`/orphanage-edit`, {
      orphanage,
    });
  }

  const handleDecidePending = (orphanage: Orphanages) => {
    history.push(`/decide-pending-orphanages`, {
      orphanage,
    });
  }
  
  return (
    <div id="page-dashboard"> 
      <aside>
        <img src={mapMarkerImg} alt="Happy" onClick={() => history.push('/dashboard')} />

        <div className="status-orphanage">
          <img
            src={ pathname === '/dashboard/pending' ? iconOrphanageRegistered : iconOrphanageRegisteredActive}
            alt=""
            onClick={() => history.push('/dashboard')}
          />
          <img
            src={pathname === '/dashboard/pending' ? iconOrphanagePendingActive : iconOrphanagePending}
            alt=""
            onClick={() => history.push('/dashboard/pending')}
          />
        </div>

        <img src={logout} alt="logouts" onClick={handleLogout}/>
      </aside>

      <main>    
          <div className="header-main">
            <h1>{title}</h1>
            <span>{quantity} {quantity > 1 ? 'orfanatos' : 'orfanato'}</span>
          </div>
         {orphanages.length > 0 ? (
          <div className="wrapper-cards">
            {orphanages.map((orphanage) => (
              <div className="cards" key={orphanage.id}>
                <Map 
                  center={[orphanage.latitude, orphanage.longitude]} 
                  style={{ width: '544px', height: 228, borderRadius: 20 }}
                  zoom={15}
                >
                  <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
  
                  <Marker
                      icon={mapIcon}
                      interactive={false}
                      position={[orphanage.latitude, orphanage.longitude]}
                  />
                
  
                </Map>
                <div className="informations-card">
                  <h1>{orphanage.name}</h1>
  
                  { pathname === '/dashboard/pending' ? (
                    <div className="wrapper-actions" onClick={() => handleDecidePending(orphanage)}>
                      <img src={iconViewPending} alt="view-pending-icon"/>
                    </div>
                  ) : (
                    <div className="wrapper-actions">
                      <img src={editInfo} alt="edit" onClick={() => handleOrphanageEdit(orphanage)}/>
                      <img src={deleteInfo} alt="delete"/>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="no-pending">
              <img src={noPending} alt=""/>
              <h1>Nenhum no momento</h1>
            </div>
          </>
        )}
      </main>
    </div> 
  )
}

export default Dashboard;
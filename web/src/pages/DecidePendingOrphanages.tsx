import React, { useState } from 'react';
import '../styles/pages/orphanage-editing.css';
import mapIcon from "../util/mapIcon";
import SideBar from "../components/SideBar";
import { FiPlus, FiX } from "react-icons/fi";
import { BiCheck } from "react-icons/bi";
import { RiCloseCircleLine } from "react-icons/ri";
import { Map, Marker, TileLayer } from 'react-leaflet';
import api from '../services/api';
import { useHistory, useLocation } from 'react-router-dom';


export interface Orphanages {
  orphanage: {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    about: string;
    instructions: string;
    opening_hours: string;
    open_on_weekends: boolean;
    images: OrphanagesImages[];
  }
}

interface OrphanagesImages {
    id: number;
    url: string;
}

const DecidePendingOrphanages: React.FC = () => {

  const { state: { orphanage } } = useLocation<Orphanages>();
  const history = useHistory();

  const [name] = useState(orphanage.name);
  const [about] = useState(orphanage.about);
  const [instructions] = useState(orphanage.instructions);
  const [opening_hours] = useState(orphanage.opening_hours);
  const [open_on_weekends, setOpenOnWeekends] = useState(orphanage.open_on_weekends);
  const [images, setImages] = useState<OrphanagesImages[]>(orphanage.images);
  const [previewImages] = useState<string>();
  const [position] = useState({
    latitude: 0,
    longitude: 0
  })

  function handleRemoveImage (id: number) {

      api.delete(`orphanage/${id}`)
        .then(() => alert('Imagem deletada com sucesso'))
        .catch(() => alert('Erro ao deletar imagem'));

    setImages(images.filter((eachImage) => eachImage.id !== id));
  }

  function handleRefuseOrphanage() {

    api.delete(`orphanages/${orphanage.id}`)
      .then(() => {
        alert('Orfanato recusado')
        history.push('/dashboard/pending')
      })
      .catch(() => alert('Erro ao recusar orfanato'))  
  }

  function handleAcceptOrphanage() {

    api.put(`orphanages/${orphanage.id}`, {
      is_pending: false,
    })
      .then(() => {
        alert('Orfanato aceito')
        history.push('/dashboard/pending')
      })
      .catch(() => alert('Erro ao aceitar orfanato'))  
  }

  return (
    <div id="page-editing-orphanage">

      <SideBar />  

      <main>
        <form className="editing-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            
            <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                 <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={
                      position.latitude !== 0 ?
                    [position.latitude, position.longitude] :
                    [orphanage.latitude, orphanage.longitude] 
                  }
                />
              </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={orphanage.name}
                value={name}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                placeholder={orphanage.about}
                value={about}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">

                {images.map((image) => (
                    <div key={image.id} className="container-preview">
                      <img
                        src={image.url}
                        alt={image.url}
                        />
                  
                      <div className="remove-image" onClick={() => handleRemoveImage(image.id)}>
                        <FiX size={24} color='#FF669D'/>
                      </div>
                    </div>
                ))}

                {previewImages && (
                    <div className="container-preview">
                      <img
                      src={previewImages}
                      alt={previewImages}
                      />
                
                    <div className="remove-image">
                      <FiX size={24} color='#FF669D'/>
                    </div>
                  </div>
                )}

                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                type="file"
                id="image[]"
                disabled
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                placeholder={orphanage.instructions}
                value={instructions}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                placeholder={orphanage.opening_hours}
                value={opening_hours}
                disabled
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={orphanage.open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!orphanage.open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

            
          <div className="wrapper-buttons-decision">
            <button type="button" onClick={handleRefuseOrphanage}>
              <RiCloseCircleLine size={25} color="#fff"/>
              Recusar
            </button>
            <button type="button" onClick={handleAcceptOrphanage}>
              <BiCheck size={25} color="#fff"/>
              Aceitar
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default DecidePendingOrphanages;
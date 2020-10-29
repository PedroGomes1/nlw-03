import React, { ChangeEvent, FormEvent, useState } from 'react';
import '../styles/pages/orphanage-editing.css';
import mapIcon from "../util/mapIcon";
import SideBar from "../components/SideBar";
import { FiPlus, FiX } from "react-icons/fi";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
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

const OrphanageEditing: React.FC = () => {

  const { state: { orphanage } } = useLocation<Orphanages>();
  const history = useHistory();
  
  const [name, setName] = useState(orphanage.name);
  const [about, setAbout] = useState(orphanage.about);
  const [instructions, setInstructions] = useState(orphanage.instructions);
  const [opening_hours, setOpeningHours] = useState(orphanage.opening_hours);
  const [open_on_weekends, setOpenOnWeekends] = useState(orphanage.open_on_weekends);
  const [images, setImages] = useState<OrphanagesImages[]>(orphanage.images);
  const [previewImages, setPreviewImages] = useState<string>();
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  })

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    
    setPosition({ latitude: lat, longitude: lng });
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    
    if (!event.target.files) {
      return;
    }

    const selectedImages = event.target.files[0];

    const selectedImagesPreview = () => {
      return URL.createObjectURL(selectedImages)
    }

    setPreviewImages(selectedImagesPreview);

    const data = new FormData();

    data.append('orphanage_id', String(orphanage.id));
    data.append('images', selectedImages);

    try {
      api.post('orphanages-images', data)
    } catch (error) {
      alert('Erro ao cadastrar nova imgem')
    }
  }

  function handleRemoveImage (id: number) {

      api.delete(`orphanage/${id}`)
        .then(() => alert('Imagem deletada com sucesso'))
        .catch(() => alert('Erro ao deletar imagem'));
    

    setImages(images.filter((eachImage) => eachImage.id !== id));
  }

  function handleUpdatedOrphanage(e: FormEvent) {
    e.preventDefault();

      api.put(`orphanages/${orphanage.id}`, {
        name,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
        latitude: position.latitude,
        longitude: position.longitude 
      }).then(() => {
        alert('Atualizado com sucesso')
        history.push('dashboard');
      }).catch(() => alert('Ocorreu um erro'))
  }

  return (
    <div id="page-editing-orphanage">

      <SideBar />  

      <main>
        <form onSubmit={handleUpdatedOrphanage} className="editing-orphanage-form">
          <fieldset>
            <legend>Dados</legend>
            
            <div className="wrapper-map">
              <Map 
                  center={[orphanage.latitude, orphanage.longitude]} 
                  zoom={16} 
                  style={{ width: '100%', height: 243 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                  onclick={handleMapClick}
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
                <p>Clique no mapa para alterar a localização</p>
            </div>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={orphanage.name}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="name"
                maxLength={300}
                placeholder={orphanage.about}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
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
                onChange={handleSelectImages}
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
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                placeholder={orphanage.opening_hours}
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}  
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

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  )
}

export default OrphanageEditing;
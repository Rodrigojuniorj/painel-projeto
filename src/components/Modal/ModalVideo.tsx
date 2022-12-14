import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from ".";
import { PlantaDados, VideoDados } from "../../Screens/Planta";
import { Api } from "../../services/api";
import { Button } from "../Button";
import { DeleteButton, FormContentModal, ModalInputContent, WraperButton } from "./ModalPopularStyles";
import { ChooseCurso } from "./ModalVideoStyles";

interface ModalFarmaciaProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: (id: number) => void;
  id: number;
  handleNameVideo: (dados: VideoDados, id: number) => Promise<string>;
}

export function ModalVideo({ modalAddIsOpen, handleToggleAddOpenModal, id, handleNameVideo}:ModalFarmaciaProps){
  const [nome, setNome] = useState("");
  const [url, setUrl] = useState("");
  const [curso, setCurso] = useState(true);

  const [planta, setPlanta] = useState<PlantaDados[]>([]);
  const [atualiza, setAtualiza] = useState(false);

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();
  
    const dados ={
      nome,
      url,
      curso
    }

    handleNameVideo(dados, id).then(() => setAtualiza(true));
    setNome("");
    setUrl("");
    setCurso(false);
  }

  async function buscaDados() {
    await Api.get(`/planta/id/${id}`)
    .then(response => {
      setPlanta(response.data)
    })
    .catch(error => console.log(error))
  }

  async function handleDeleteVideo (idVideo: number) {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

    const videoDelete = dados.videos.filter((item: number) => item.id !== idVideo);
    await Api.patch("/planta/atualizar", {
      id: id,
      dateTime: dados.dateTime,
      imagens: dados.imagens,
      nome: dados.nome,
      videos: videoDelete,
      nomeCientifico: dados.nomeCientifico,
      agroDados: dados.agroDados,
      farmaciaDados: dados.farmaciaDados,
      
    })
    .then(
      (response) => {
        toast.success('V??deo removido com sucesso!')
        setAtualiza(true);
      }
    )
    .catch(err => toast.error('Erro ao remover o v??deo!')) 
  }

  useEffect(() => {
    buscaDados()
    setAtualiza(false)
  },[id, atualiza])

  if(planta.length == 0){
    return (
      <></>
    )
  }

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={() => handleToggleAddOpenModal(id)}>
      <ModalInputContent>
        <h3>Upload de V??deos</h3>
        <button type="button" onClick={() => handleToggleAddOpenModal(id)}>
            <X size={20} />
        </button>
        <FormContentModal  onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="nome">Nome (Obrigat??rio)*</label>
            <input type="text" value={nome} name="nome" required placeholder='Nome do v??deo' onChange={e => setNome(e.target.value)} />
            <label htmlFor="descricao">Url (Obrigat??rio)*</label>
            <input type="text" value={url} name="descricao" required placeholder='Url do v??deo' onChange={e => setUrl(e.target.value)} />
            
            <ChooseCurso >
              <div>
                <input type="radio" name="choose" id="agro" required onChange={e => setCurso(true)} />
                <label >Agronomia</label>
              </div>
              <div>
                <input type="radio" name="choose" id="farm" required onChange={e => setCurso(false)} />
                <label >Farm??cia</label>
              </div>
            </ChooseCurso>
          </div>
          <Button type="submit">Adicionar V??deo</Button>
        </FormContentModal>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Url</th>
              <th>Curso</th>
              <th>A????o</th>
            </tr>
          </thead>
          { planta.videos.length ? (
              <tbody>
                {planta.videos.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.url}</td>
                    <td>{item.curso === true ? 'Agronomia' : 'Farm??cia'}</td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteVideo(item.id)} ><X size={18} weight="fill" /></DeleteButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            ): (
              <tbody>
                <tr >
                  <td colSpan={4}>N??o h?? nada cadastrado</td>
                </tr>
              </tbody>
            ) }
        </table>
      </ModalInputContent>
    </Modal>
  )
}
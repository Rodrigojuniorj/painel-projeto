import { Camera, Leaf, MagnifyingGlass, NotePencil, Pill, Trash, Tree, X, YoutubeLogo } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { AcaoButton } from "../../components/Button/acaoButton";
import { AgroDados, ModalAgro } from "../../components/Modal/ModalAgro";
import { FarmaciaDados, ModalFarmacia } from "../../components/Modal/ModalFarmacia";
import { ModalPlanta } from "../../components/Modal/ModalPlanta";
import { ContainerHeader, InputSearch, PlantaList, SearchWraper } from "./styles";
import { Api } from "../../services/api";
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { toast } from "react-toastify";
import { ModalPopular } from "../../components/Modal/ModalPopular";
import { ModalAtualiza } from "../../components/Modal/ModalAtualiza";
import { ModalImage } from "../../components/Modal/ModalImage";
import { ModalVideo } from "../../components/Modal/ModalVideo";
import { ModalDelete } from "../../components/Modal/ModalDelete";

export interface PlantaDados {
  id: number;
  dateTime: Date;
  imagens: [];
  nome: [];
  videos: [];
  nomeCientifico: string;
  agroDados: [];
  farmaciaDados: [];
}

export interface VideoDados {
  id?: number;
  nome: string;
  url: string;
  curso: boolean;
}

const horario = new Date().toLocaleTimeString();

export function Planta() {
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
  const [modalFarmaciaAddIsOpen, setModalFarmaciaAddIsOpen] = useState(false)
  const [modalAgronomiaAddIsOpen, setModalAgronomiaAddIsOpen] = useState(false)
  const [modalPopularAddIsOpen, setModalPopularAddIsOpen] = useState(false)
  const [modalVideoAddIsOpen, setModalVideoAddIsOpen] = useState(false)
  const [modalAtualizaAddIsOpen, setModalAtualizaAddIsOpen] = useState(false)
  const [modalImageAddIsOpen, setModalImageAddIsOpen] = useState(false)
  const [modalDeleteIsOpen, setModalDeleteIsOpen] = useState(false)

  const [content, setContent] = useState<PlantaDados[]>([])
  const [atualiza, setAtualiza] = useState(false);
  const [idClick, setIdClick] = useState(0);

  const handleToggleAddOpenModal = () => {
    setModalAddIsOpen(!modalAddIsOpen)
  }
  
  const handleToggleAddOpenModalFarmacia = (id: number) => {
    setIdClick(id)
    setModalFarmaciaAddIsOpen(!modalFarmaciaAddIsOpen)
  }
  
  const handleToggleOpenModalDelete = async (id: number) => {
    setIdClick(id)
    setModalDeleteIsOpen(!modalDeleteIsOpen)
  }

  const handleToggleAddOpenModalAgronomia = (id: number) => {
    setIdClick(id)
    setModalAgronomiaAddIsOpen(!modalAgronomiaAddIsOpen)
  }
  
  const handleToggleAddOpenModalPopular = async (id: number) => {
    setIdClick(id)
    setModalPopularAddIsOpen(!modalPopularAddIsOpen)
  }
  
  const handleToggleAddOpenModalVideo = async (id: number) => {
    setIdClick(id)
    setModalVideoAddIsOpen(!modalVideoAddIsOpen)
  }
  
  const handleToggleAddOpenModalImage = async (id: number) => {
    setIdClick(id)
    setModalImageAddIsOpen(!modalImageAddIsOpen)
  }

  const handleToggleAddOpenModalAtualiza = async (id: number) => {
    setIdClick(id)
    setModalAtualizaAddIsOpen(!modalAtualizaAddIsOpen)
  }

  const handleAddNameCientifico = async (name: string) => {
    await Api.put("/planta/incluir", {
      id: '',
      dateTime: '',
      imagens: [],
      nome: [],
      videos: [],
      nomeCientifico: name,
      agroDados: null,
      farmaciaDados: null,
    })
    .then(
      (response) => {
        toast.success('Planta inserida com sucesso!')
      }
    )
      .catch(err => toast.error('Erro ao inserir planta!'))

    setAtualiza(true);
  }

  const handleAtualizaNameCientifico = async (name: string, id: number) => {
    const dados: PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))
    
    await Api.patch("/planta/atualizar", {
      id: id,
      dateTime: dados.dateTime,
      imagens: dados.imagens,
      nome: dados.nome,
      videos: dados.videos,
      nomeCientifico: name,
      agroDados: dados.agroDados,
      farmaciaDados: dados.farmaciaDados,
      
    })
    .then(
      (response) => {
        toast.success('Nome popular inserido com sucesso!')
      }
    )
    .catch(err => toast.error('Erro ao inserir nome popular!')) 
    setAtualiza(true);
  }

  const handleAddNamePopular = async (name: string, id: number) => {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

    await Api.patch("/planta/atualizar", {
      id: id,
      dateTime: dados.dateTime,
      imagens: dados.imagens,
      nome: [
        ...dados.nome,
        name
      ],
      videos: dados.videos,
      nomeCientifico: dados.nomeCientifico,
      agroDados: dados.agroDados,
      farmaciaDados: dados.farmaciaDados,
    })
    .then(
      (response) => {
        toast.success('Nome popular inserido com sucesso!')
      }
    )
    .catch(err => toast.error('Erro ao inserir nome popular!')) 
    setAtualiza(true);
  }

  const handleAddVideo = async (array: VideoDados, id: number) => {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

    const video = await Api.patch("/planta/atualizar", {
      id: id,
      dateTime: dados.dateTime,
      imagens: dados.imagens,
      nome: dados.nome,
      videos: [...dados.videos, array],
      nomeCientifico: dados.nomeCientifico,
      agroDados: dados.agroDados,
      farmaciaDados: dados.farmaciaDados,
    })
    .then(
      (response) => {
        toast.success('Vídeo adicionado com sucesso!')
        return 'adicionado'
      }
    )
    .catch(err => toast.error('Erro ao inserir o vídeo!')) 
    setAtualiza(true);
    return video
  }

  const handleAddFarmacia = async (array: FarmaciaDados, id: number) => {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

    console.log(array)
    await Api.patch(`/planta/atualizar`, {
      id: id,
      dateTime: dados.dateTime,
      imagens: dados.imagens,
      nome: dados.nome,
      videos: dados.videos,
      nomeCientifico: dados.nomeCientifico,
      agroDados: dados.agroDados,
      farmaciaDados: array
    })
    .then(
      (response) => {
        toast.success('Conteúdo Farmácia inserido com sucesso!')
      }
    )
    .catch(err => toast.error('Erro ao inserir Conteúdo Farmácia!')) 
  }

  const handleAddAgro = async (array: AgroDados, id: number) => {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))
    await Api.patch(`/planta/atualizar`, {
      id: id,
      dateTime: dados.dateTime,
      imagens: dados.imagens,
      nome: dados.nome,
      videos: dados.videos,
      nomeCientifico: dados.nomeCientifico,
      agroDados: array,
      farmaciaDados: dados.farmaciaDados
    })
    .then(
      (response) => {
        toast.success('Conteúdo Agronomia inserido com sucesso!')
      }
    )
    .catch(err => toast.error('Erro ao inserir Conteúdo Agronomia!')) 
  }

  const handleImage = async (image: string, name: string, descricao: string, id: number) => {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))
    
    const teste = await Api.put("/imagem/incluir", {
      "nome": name,
      "descricao": descricao,
      "dados": image,
      "plantaId": id
    })
    .then(
      (response) => {
        toast.success('Imagem inserida com sucesso!')
        return true
      }
    )
    .catch(err => {
      console.log(err)
    }) 

    return teste
  }

  const handleDeletePlanta = async (id: number) => {
    await Api.delete("/planta/remover", {
      data: { id: id }
    })
    .then(
      (response) => {
        toast.success('Planta deletada com sucesso!')
      }
    )
      .catch(err => toast.error('Não foi possível deletar a planta!'))

    setAtualiza(true);
  }

  async function buscaDados() {
    const response = await Api.get("/planta/");
    setContent(response.data);
    setAtualiza(false);
  }
  
  useEffect(() => {
    buscaDados()
    setAtualiza(false);
  },[atualiza])

  return (
    <>
      <h2>Plantas</h2>
      <Box size={1}>
        <ContainerHeader>
          <div>
            <Button onClick={handleToggleAddOpenModal} type="button">Adicionar planta</Button>
          </div>
          <ModalPlanta
            handleNameCientifico={handleAddNameCientifico}
            modalAddIsOpen={modalAddIsOpen}
            handleToggleAddOpenModal={handleToggleAddOpenModal}
          />
          {/* <SearchWraper>
            <MagnifyingGlass size={16} weight="bold" />
            <InputSearch type="text" placeholder="Pesquisar planta"  />
          </SearchWraper> */}
        </ContainerHeader>
        <PlantaList>
        {content.length ? (
          <table>
            <thead>
              <tr>
                <th>Planta</th>
                <th>Data de Cadastro</th>
                <th>Modo</th>
                <th>Ação</th>
              </tr>
            </thead>
              <tbody>
                { content.map((item) => (
                  <tr key={item.id} >
                    <td>{item.nomeCientifico}</td>
                    <td>{format(new Date(item.dateTime), 'dd/MM/yyyy', {
                      locale: ptBR,
                    })}</td>
                    <td>
                      <div className="escolhaTipo">
                        <Button id={item.id.toString()} type="button" onClick={() => handleToggleAddOpenModalFarmacia(item.id)} ><Pill size={16} weight="fill" />Farmácia</Button>
                        <ModalFarmacia
                          idPlanta={idClick}
                          handleAddFarmacia={handleAddFarmacia}
                          modalAddIsOpen={modalFarmaciaAddIsOpen}
                          handleToggleAddOpenModal={() => handleToggleAddOpenModalFarmacia(item.id)}
                        />
                        
                        <Button type="button" id={item.id.toString()} onClick={() => handleToggleAddOpenModalAgronomia(item.id)}><Tree size={16} weight="fill" />Agronomia</Button>
                        <ModalAgro
                          idPlanta={idClick}
                          handleAddAgro={handleAddAgro}
                          modalAddIsOpen={modalAgronomiaAddIsOpen}
                          handleToggleAddOpenModal={() => handleToggleAddOpenModalAgronomia(idClick)}
                        />
                      </div>
                    </td>
                    <td>
                      <div className="acaoButton">
                        <AcaoButton mod="edit" id={item.id.toString()} handleOpenModalEdit={handleToggleAddOpenModalAtualiza} ><NotePencil size={18} weight="fill" /></AcaoButton>
                        <ModalAtualiza 
                          id={idClick}
                          handleAtualizaNameCientifico={handleAtualizaNameCientifico}
                          modalAddIsOpen={modalAtualizaAddIsOpen}
                          handleToggleAddOpenModal={handleToggleAddOpenModalAtualiza}
                        />
                        <AcaoButton mod="photography" id={item.id.toString()} handleOpenModalImage={handleToggleAddOpenModalImage} ><Camera size={18} weight="fill" /></AcaoButton>
                        <ModalImage 
                          id={idClick}
                          handleImage={handleImage}
                          modalAddIsOpen={modalImageAddIsOpen}
                          handleToggleAddOpenModal={handleToggleAddOpenModalImage}
                        />
                        <AcaoButton mod="popular" id={item.id.toString()} handleOpenModalPopular={handleToggleAddOpenModalPopular} ><Leaf size={18} weight="fill" /></AcaoButton>
                        <ModalPopular
                          id={idClick}
                          handleNamePopular={handleAddNamePopular}
                          modalAddIsOpen={modalPopularAddIsOpen}
                          handleToggleAddOpenModal={handleToggleAddOpenModalPopular}
                        />
                        <AcaoButton mod="video" id={item.id.toString()} handleOpenModalVideo={handleToggleAddOpenModalVideo} ><YoutubeLogo size={18} weight="fill" /></AcaoButton>
                        <ModalVideo
                          id={idClick}
                          handleNameVideo={handleAddVideo}
                          modalAddIsOpen={modalVideoAddIsOpen}
                          handleToggleAddOpenModal={handleToggleAddOpenModalVideo}
                        />
                        <AcaoButton mod="delete" id={item.id.toString()} handleDeletebutton={handleToggleOpenModalDelete} ><Trash size={18} weight="fill" /></AcaoButton>
                        <ModalDelete 
                          id={idClick}
                          handleToggleOpenModalDelete={handleToggleOpenModalDelete}
                          modalAddIsOpen={modalDeleteIsOpen}
                          handleDeletePlanta={handleDeletePlanta}
                        />
                      </div>
                    </td>
                  </tr>
                )) }
              </tbody>
            </table>
            ):
            <h1>Nenhum Registro</h1>
          }
        </PlantaList>
      </Box>
    </>
  )
}
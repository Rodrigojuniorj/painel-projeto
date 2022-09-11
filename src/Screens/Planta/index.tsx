import { Camera, Leaf, MagnifyingGlass, NotePencil, Pill, Trash, Tree, X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { Box } from "../../components/Box";
import { Button } from "../../components/Button";
import { AcaoButton } from "../../components/Button/acaoButton";
import { ModalAgro } from "../../components/Modal/ModalAgro";
import { ModalFarmacia } from "../../components/Modal/ModalFarmacia";
import { ModalPlanta } from "../../components/Modal/ModalPlanta";
import { ContainerHeader, InputSearch, PlantaList, SearchWraper } from "./styles";
import { Api } from "../../services/api";
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { toast } from "react-toastify";
import { ModalPopular } from "../../components/Modal/ModalPopular";
import { ModalAtualiza } from "../../components/Modal/ModalAtualiza";
import { ModalImage } from "../../components/Modal/ModalImage";

export interface PlantaDados {
  id: number;
  dateTime: Date;
  imagens: [];
  nome: [];
  nomeCientifico: string;
  topicosAgro: [];
  topicosFarmacia: [];
}

const horario = new Date().toLocaleTimeString();

export function Planta() {
  const [modalAddIsOpen, setModalAddIsOpen] = useState(false)
  const [modalFarmaciaAddIsOpen, setModalFarmaciaAddIsOpen] = useState(false)
  const [modalAgronomiaAddIsOpen, setModalAgronomiaAddIsOpen] = useState(false)
  const [modalPopularAddIsOpen, setModalPopularAddIsOpen] = useState(false)
  const [modalAtualizaAddIsOpen, setModalAtualizaAddIsOpen] = useState(false)
  const [modalImageAddIsOpen, setModalImageAddIsOpen] = useState(false)

  const [content, setContent] = useState<PlantaDados[]>([])
  const [atualiza, setAtualiza] = useState(false);
  const [idClick, setIdClick] = useState(0);

  const handleToggleAddOpenModal = () => {
    setModalAddIsOpen(!modalAddIsOpen)
  }
  
  const handleToggleAddOpenModalFarmacia = () => {
    setModalFarmaciaAddIsOpen(!modalFarmaciaAddIsOpen)
  }
  
  const handleToggleAddOpenModalAgronomia = () => {
    setModalAgronomiaAddIsOpen(!modalAgronomiaAddIsOpen)
  }
  
  const handleToggleAddOpenModalPopular = async (id: number) => {
    setIdClick(id)
    setModalPopularAddIsOpen(!modalPopularAddIsOpen)
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
      nomeCientifico: name,
      topicosAgro: [],
      topicosFarmacia: [],
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
      nomeCientifico: name,
      topicosAgro: dados.topicosAgro,
      topicosFarmacia: dados.topicosFarmacia,
      
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
      nomeCientifico: dados.nomeCientifico,
      topicosAgro: dados.topicosAgro,
      topicosFarmacia: dados.topicosFarmacia,
      
    })
    .then(
      (response) => {
        toast.success('Nome popular inserido com sucesso!')
      }
    )
    .catch(err => toast.error('Erro ao inserir nome popular!')) 
    setAtualiza(true);
  }
  
  const handleImage = async (image: string, id: number) => {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

    await Api.patch("/planta/atualizar", {
      id: id,
      dateTime: dados.dateTime,
      imagens: [
        ...dados.imagens,
        image
      ],
      nome: dados.nome,
      nomeCientifico: dados.nomeCientifico,
      topicosAgro: dados.topicosAgro,
      topicosFarmacia: dados.topicosFarmacia,
    })
    .then(
      (response) => {
        toast.success('Nome popular inserido com sucesso!')
      }
    )
    .catch(err => toast.error('Erro ao inserir nome popular!')) 
    setAtualiza(true);
  }

  const handleDeletePlanta = async (id: number) => {
    await Api.delete("/planta/remover", {
      data: { id: id }, headers: { "Authorization": "***" }
    })
    .then(
      (response) => {
        toast.success('Planta deletada com sucesso!')
      }
    )
      .catch(err => toast.error('Não foi possível deletar a planta!'))

    setAtualiza(true);
  }

  useEffect(() => {
    async function buscaDados() {
      const response = await Api.get("/planta/");
      setContent(response.data);
      setAtualiza(false);
    }
    buscaDados()
  },[atualiza])
  // console.log(content)
  return (
    <>
      <h2>Plantas</h2>
      <Box size={1}>
        <ContainerHeader>
          <div>
            <Button onClick={handleToggleAddOpenModal} type="button">Adicionar conteudo</Button>
          </div>
          <ModalPlanta
            handleNameCientifico={handleAddNameCientifico}
            modalAddIsOpen={modalAddIsOpen}
            handleToggleAddOpenModal={handleToggleAddOpenModal}
          />
          <SearchWraper>
            <MagnifyingGlass size={16} weight="bold" />
            <InputSearch type="text" placeholder="Pesquisar planta"  />
          </SearchWraper>
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
                        <Button type="button" onClick={handleToggleAddOpenModalFarmacia} ><Pill size={16} weight="fill" />Farmácia</Button>
                        <ModalFarmacia
                          modalAddIsOpen={modalFarmaciaAddIsOpen}
                          handleToggleAddOpenModal={handleToggleAddOpenModalFarmacia}
                        />
                        
                        <Button type="button" onClick={handleToggleAddOpenModalAgronomia}><Tree size={16} weight="fill" />Agronomia</Button>
                        <ModalAgro
                          modalAddIsOpen={modalAgronomiaAddIsOpen}
                          handleToggleAddOpenModal={handleToggleAddOpenModalAgronomia}
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
                        <AcaoButton mod="delete" id={item.id.toString()} handleDeletebutton={handleDeletePlanta} ><Trash size={18} weight="fill" /></AcaoButton>
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
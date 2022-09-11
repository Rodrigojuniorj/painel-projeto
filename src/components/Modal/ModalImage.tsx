import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from ".";
import { PlantaDados } from "../../Screens/Planta";
import { Api } from "../../services/api";
import { Button } from "../Button";
import { Imagem } from "../Imagem";
import { DeleteButton, FormContentModal, ModalInputContent } from "./ModalPopularStyles";

interface ModalFarmaciaProps {
  modalAddIsOpen: boolean;
  id: number;
  handleToggleAddOpenModal: (id: number) => void;
  handleImage: (image: string, name: string, descricao: string, plantaId: number) => void;
}

export interface ImageProps {
  dados: string;
  descricao: string;
  favorita: boolean;
  id: number;
  nome: string;
}

export function ModalImage({ modalAddIsOpen, handleToggleAddOpenModal, id, handleImage}:ModalFarmaciaProps){
  const [newPicture, setNewPicture] = useState("");
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [favorita, setFavorita] = useState(false);	

  const [imageArray, setImageArray] = useState<ImageProps[]>([]);
  const [atualiza, setAtualiza] = useState(false);

  const handleProfile = (e: any) => {
    // Selecionando o arquivo
    const file = e.target.files[0];

    // Criando um objeto FileReader
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        // reader.result retornará
        // o objeto convertido em Base64
        setNewPicture(reader.result);
      },
      false
    );

    // Caso file esteja populado
    // dispara a função.
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();
    const splitPicture = newPicture.split(';base64,')[1]
    handleImage(splitPicture, nome, descricao, id);
  }

  async function handleDeleteImage (image: string, index: number) {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

    const imagensAtualiza = dados.nome.filter((item: string) => item !== image);
    await Api.patch("/planta/atualizar", {
      id: id,
      dateTime: dados.dateTime,
      imagens: imagensAtualiza,
      nome: dados.nome,
      nomeCientifico: dados.nomeCientifico,
      topicosAgro: dados.topicosAgro,
      topicosFarmacia: dados.topicosFarmacia,
    })
    .then(
      (response) => {
        toast.success('Imagem removida com sucesso!')
        setAtualiza(true);
      }
    )
    .catch(err => toast.error('Erro ao remover a imagem!')) 
  }

  useEffect(() => {
    async function buscaDados() {
      await Api.get(`imagem/plantaid/${id}`)
      .then(response => {
        setImageArray(response.data)
        setAtualiza(false);
      })
      .catch(error => console.log(error))
    }
    buscaDados()
  },[id, atualiza])

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={() => handleToggleAddOpenModal(id)}>
      <ModalInputContent>
        <h3>Upload de imagens</h3>
        <button type="button" onClick={() => handleToggleAddOpenModal(id)}>
            <X size={20} />
        </button>

        <FormContentModal onSubmit={handleSubmitForm} >
          <div>
            <label htmlFor="">Nome</label>
            <input type="text" value={nome} name="nome" placeholder='Nome da imagem' onChange={e => setNome(e.target.value)} />
            <label htmlFor="">Descricao</label>
            <input type="text" value={descricao} name="descricao" placeholder='Descricao da imagem' onChange={e => setDescricao(e.target.value)} />
            <label htmlFor="cientifico">Nome popular</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              onChange={(e) => handleProfile(e)}
            />
          </div>
          <Button type="submit">Adicionar Conteúdo</Button>
        </FormContentModal>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Image</th>
              <th>Deletar</th>
            </tr>
          </thead>
          { imageArray ? (
              <tbody>
                {imageArray.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td><Imagem dados={item.dados} /></td>
                    <td><DeleteButton onClick={() => handleDeleteImage(item.dados, index)} ><X size={18} weight="fill" /></DeleteButton></td>
                  </tr>
                ))}
              </tbody>
            ): (
              <tbody>
                <tr>
                  <td>Não há nada cadastrado</td>
                </tr>
              </tbody>
            ) }
        </table>
      </ModalInputContent>
    </Modal>
  )
}
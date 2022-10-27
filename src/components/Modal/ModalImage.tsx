import { Star, X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from ".";
import { PlantaDados } from "../../Screens/Planta";
import { Api } from "../../services/api";
import { Button } from "../Button";
import { Imagem } from "../Imagem";
import { DeleteButton, FormContentModal, ModalInputContent, StarButton, StarButtonActive } from "./ModalPopularStyles";

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

    if(file.size > 500000) {
      toast.error("A imagem é muito grande para ser enviada!");
      setAtualiza(true);
      return; 
    }
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

    if(nome === "" || descricao === ""){
      toast.error("Preencha todos os campos");
      return; 
    }
    if(newPicture === ""){
      toast.error("Selecione uma imagem");
      return;
    }
    const splitPicture = newPicture.split(';base64,')[1]
    setAtualiza(true);
    handleImage(splitPicture, nome, descricao, id);
    setNome('')
    setDescricao('')
    setNewPicture('')
  }

  async function handleDeleteImage (id: number) {
    await Api.delete("/imagem/remover/", {
      data: {
        id: id
      }
    })
    .then(
      (response) => {
        toast.success('Imagem removida com sucesso!')
        setAtualiza(true);
      }
    )
    .catch(err => toast.error('Erro ao remover a imagem!')) 
  }

  async function handleFavoriteImage (imageId: number) {
      
      await Api.patch("/imagem/favorita/", {
        "imgid": imageId,
        "plantaid": id,
      })
      .then(
        (response) => {
          toast.success('Imagem favoritada com sucesso!')
          setAtualiza(true);
        }
      )
      .catch(err =>
        console.log(err) 
        // toast.error('Erro ao favoritar a imagem!')
      ); 
  }

  async function buscaDados() {
    await Api.get(`imagem/plantaid/${id}`)
    .then(response => {
      setImageArray(response.data)
      setAtualiza(false);
    })
    .catch(error => console.log(error))
  }

  useEffect(() => {
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
            <label htmlFor="">Nome (Obrigatório)*</label>
            <input type="text" value={nome} name="nome" required placeholder='Nome da imagem' onChange={e => setNome(e.target.value)} />
            <label htmlFor="">Descricao (Obrigatório)*</label>
            <input type="text" value={descricao} name="descricao" required placeholder='Descricao da imagem' onChange={e => setDescricao(e.target.value)} />
            <label htmlFor="cientifico">Imagem (Obrigatório)*</label>
            <input
              type="file"
              name="profile"
              accept="image/*"
              key={atualiza ? '1' : '2'}
              onChange={(e) => handleProfile(e)}
            />
          </div>
          <Button type="submit">Adicionar Conteúdo</Button>
        </FormContentModal>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Image</th>
              <th>Ação</th>
            </tr>
          </thead>
          { imageArray ? (
              <tbody>
                {imageArray.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.nome}</td>
                    <td>{item.descricao}</td>
                    <td><Imagem dados={item.dados} /></td>
                    <td>
                      <DeleteButton onClick={() => handleDeleteImage(item.id)} ><X size={18} weight="fill" /></DeleteButton>
                      {item.favorita ? (
                        <StarButtonActive onClick={() => handleFavoriteImage(item.id)} ><Star size={18} weight="fill" /></StarButtonActive>
                      ) : (
                        <StarButton onClick={() => handleFavoriteImage(item.id)} ><Star size={18} weight="fill" /></StarButton>
                      )}
                    </td>
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
import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from ".";
import { PlantaDados } from "../../Screens/Planta";
import { Api } from "../../services/api";
import { Button } from "../Button";
import { DeleteButton, FormContentModal, ModalInputContent } from "./ModalPopularStyles";

interface ModalFarmaciaProps {
  modalAddIsOpen: boolean;
  id: number;
  handleToggleAddOpenModal: (id: number) => void;
  handleImage: (name: string, id: number) => void;
}

export function ModalImage({ modalAddIsOpen, handleToggleAddOpenModal, id, handleImage}:ModalFarmaciaProps){
  const [newPicture, setNewPicture] = useState("");

  const handleProfile = (e) => {
    // Selecionando o arquivo
    const file = e.target.files[0];

    // Criando um objeto FileReader
    const reader = new FileReader();

    // Adicionamos um evento para
    // escutar o Reader
    reader.addEventListener(
      "load",
      () => {
        //  Quando carregado,
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
    handleImage(splitPicture, id);
    handleToggleAddOpenModal(id);
  }

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={() => handleToggleAddOpenModal(id)}>
      <ModalInputContent>
        <h3>Upload de imagens</h3>
        <button type="button" onClick={() => handleToggleAddOpenModal(id)}>
            <X size={20} />
        </button>

        <FormContentModal onSubmit={handleSubmitForm} >
          <div>
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
              <th>Deletar</th>
            </tr>
          </thead>
        </table>
      </ModalInputContent>
    </Modal>
  )
}
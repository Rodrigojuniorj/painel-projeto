import { X } from "phosphor-react";
import { FormEvent, useState } from "react";
import Modal from ".";
import { Button } from "../Button";

import { FormContentModal, ModalInputContent } from './ModalPlantaStyles'

interface ModalPlantaProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: () => void;
  handleNameCientifico: (name: string) => void;
}

export function ModalPlanta({ modalAddIsOpen, handleToggleAddOpenModal, handleNameCientifico }: ModalPlantaProps) {
  const [name, setName] = useState('');

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();

    handleNameCientifico(name);
    setName('');
    handleToggleAddOpenModal();
  }

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={handleToggleAddOpenModal}>
      <ModalInputContent>
        <h3>Adicionar Planta</h3>
        <button type="button" onClick={handleToggleAddOpenModal}>
            <X size={20} />
        </button>

        <FormContentModal onSubmit={handleSubmitForm} >
          <div>
            <label htmlFor="cientifico">Nome Científico</label>
            <input type="text" name="cientifico" value={name} placeholder="Nome Científico" onChange={(e) => setName(e.target.value)} />
          </div>
          <Button type="submit" >Registrar Planta</Button>
        </FormContentModal>
      </ModalInputContent>
    </Modal>
  )
}
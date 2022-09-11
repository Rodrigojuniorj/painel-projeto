import { X } from "phosphor-react";
import { FormEvent, useState } from "react";
import Modal from ".";
import { Button } from "../Button";

import { FormContentModal, ModalInputContent } from './ModalPlantaStyles'

interface ModalPlantaProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: (id: number) => void;
  handleAtualizaNameCientifico: (name: string, id: number) => void;
  id: number;
}

export function ModalAtualiza({ modalAddIsOpen, handleToggleAddOpenModal, handleAtualizaNameCientifico, id }: ModalPlantaProps) {
  const [name, setName] = useState('');

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();

    handleAtualizaNameCientifico(name, id);
    setName('');
    handleToggleAddOpenModal(id);
  }

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={() => handleToggleAddOpenModal(id)}>
      <ModalInputContent>
        <h3>Atualizar Planta</h3>
        <button type="button" onClick={() => handleToggleAddOpenModal(id)}>
            <X size={20} />
        </button>

        <FormContentModal onSubmit={handleSubmitForm} >
          <div>
            <label htmlFor="cientifico">Nome Científico</label>
            <input type="text" name="cientifico" value={name} placeholder="Nome Científico" onChange={(e) => setName(e.target.value)} />
          </div>
          <Button type="submit" >Atualizar Planta</Button>
        </FormContentModal>
      </ModalInputContent>
    </Modal>
  )
}
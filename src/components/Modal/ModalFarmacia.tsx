import { X } from "phosphor-react";
import Modal from ".";
import { Button } from "../Button";
import { FormContentModal, ModalInputContent } from "./ModalFarmaciaStyles";

interface ModalFarmaciaProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: () => void;
}

export function ModalFarmacia({ modalAddIsOpen, handleToggleAddOpenModal}:ModalFarmaciaProps){
  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={handleToggleAddOpenModal}>
      <ModalInputContent>
        <h3>Conteúdo Farmácia</h3>
        <button type="button" onClick={handleToggleAddOpenModal}>
            <X size={20} />
        </button>

        <FormContentModal >
          <div>
            <label htmlFor="cientifico">Nome Científico</label>
            <input type="text" name="cientifico" placeholder="Nome Científico" />
          </div>
          <Button type="submit">Adicionar Conteúdo</Button>
        </FormContentModal>
      </ModalInputContent>
    </Modal>
  )
}
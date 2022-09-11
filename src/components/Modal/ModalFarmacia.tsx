import { X } from "phosphor-react";
import Modal from ".";
import { Button } from "../Button";
import { FormContentModal, ModalInputContent } from "./ModalFarmaciaStyles";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useState } from "react";

interface ModalFarmaciaProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: () => void;
}

export function ModalFarmacia({ modalAddIsOpen, handleToggleAddOpenModal}:ModalFarmaciaProps){
  const [descricao, setDescricao] = useState('');

  const handleCkeditorState = (event: any, editor: any) => {
    const data = editor.getData();
    console.log(data)
  }

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={handleToggleAddOpenModal}>
      <ModalInputContent>
        <h3>Conteúdo Farmácia</h3>
        <button type="button" onClick={handleToggleAddOpenModal}>
            <X size={20} />
        </button>

        <FormContentModal >
          <div>
            <label htmlFor="cientifico">Conteúdo Farmácia</label>
            <CKEditor 
              editor={ ClassicEditor }
              onChange={handleCkeditorState}
            />
          </div>
          <Button type="submit">Adicionar Conteúdo</Button>
        </FormContentModal>
      </ModalInputContent>
    </Modal>
  )
}
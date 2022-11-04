import { ButtonCancel, ButtonDelete, ModalInputContent, WraperButton } from './ModalDeleteStyles'
import Modal from ".";
import { X } from 'phosphor-react';

interface ModalDeleteProps {
  modalAddIsOpen: boolean;
  handleToggleOpenModalDelete: (id: number) => void;
  id: number;
  handleDeletePlanta: (id: number) => void;
}


export function ModalDelete({modalAddIsOpen, handleDeletePlanta, handleToggleOpenModalDelete, id}: ModalDeleteProps){

  function handleDelete() {
    handleDeletePlanta(id);
    handleToggleOpenModalDelete(id);
  }

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={() => handleToggleOpenModalDelete(id)}>
      <ModalInputContent>
        <h3>Deletar Planta</h3>
        <button type="button" onClick={() => handleToggleOpenModalDelete(id)}>
            <X size={20} />
        </button>
        <p>Tem certeza que deseja deletar essa planta?</p>  
        <WraperButton>
          <ButtonDelete type="button" onClick={() => handleDelete()}>Deletar</ButtonDelete>
          <ButtonCancel type="button" onClick={() => handleToggleOpenModalDelete(id)}>Cancelar</ButtonCancel>
        </WraperButton>
        
        
      </ModalInputContent>
    </Modal>
  )
}
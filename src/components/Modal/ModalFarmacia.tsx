import { X } from "phosphor-react";
import Modal from ".";
import { Button } from "../Button";
import { FormContentModal, ModalInputContent } from "./ModalFarmaciaStyles";
import { FormEvent, useEffect, useState } from "react";
import { Api } from "../../services/api";

interface ModalFarmaciaProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: () => void;
  handleAddFarmacia: (farmacia: FarmaciaDados, id: number) => void;
  idPlanta: number;
}

export type FarmaciaDados = {
  utilizacao: string;
  terapeutico: string;
  contraindicacao: string;
  modoDeUsar: string;
}

export function ModalFarmacia({ modalAddIsOpen, handleToggleAddOpenModal, idPlanta, handleAddFarmacia}:ModalFarmaciaProps){
  const [utilizacao, setUtilizacao] = useState('');
  const [terapeutico, setTerapeutico] = useState('');
  const [contraindicacao, setContraindicacao] = useState('');
  const [modoDeUsar, setModoDeUsar] = useState('');
  const [farmaArray, setFarmaArray] = useState<FarmaciaDados[]>([]);
  const [atualiza, setAtualiza] = useState(true);

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();

    const dados ={
      utilizacao,
      terapeutico,
      contraindicacao,
      modoDeUsar
    }

    handleAddFarmacia(dados, idPlanta);
    setAtualiza(true);
  }

  useEffect(() => {
    async function buscaDados() {
      const response = await Api.get(`/planta/id/${idPlanta}`)
      .then(response => console.log(response.data.topicosFarma));
    }
    buscaDados()
  },[atualiza])

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={handleToggleAddOpenModal}>
      <ModalInputContent>
        <h3>Conteúdo Farmácia</h3>
        <button type="button" onClick={handleToggleAddOpenModal}>
            <X size={20} />
        </button>

        <FormContentModal >
          <div>
            <label htmlFor="cientifico">Utilização:</label>
            <textarea name="cientifico" id="cientifico" rows={5} value={utilizacao} onChange={event => setUtilizacao(event.target.value)}></textarea>
            <label htmlFor="terapeuticos">Efeitos terapêuticos:</label>
            <textarea name="terapeuticos" id="terapeuticos" rows={5} value={terapeutico} onChange={event => setTerapeutico(event.target.value)}></textarea>
            <label htmlFor="contraindicacoes">Contraindicação:</label>
            <textarea name="contraindicacoes" id="contraindicacoes" rows={5} value={contraindicacao} onChange={event => setContraindicacao(event.target.value)}></textarea>
            <label htmlFor="modoDeUsar">Modo de Usar:</label>
            <textarea name="modoDeUsar" id="modoDeUsar" rows={5} value={modoDeUsar} onChange={event => setModoDeUsar(event.target.value)}></textarea>
          </div>
          <Button type="submit" onClick={handleSubmitForm}>Adicionar Conteúdo</Button>
        </FormContentModal>
      </ModalInputContent>
    </Modal>
  )
}
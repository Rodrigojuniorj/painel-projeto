import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import Modal from ".";
import { Api } from "../../services/api";
import { Button } from "../Button";
import { FormContentModal, ModalInputContent } from "./ModalAgroStyles";

interface ModalAgroProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: (id: Number) => void;
  handleAddAgro: (agro: AgroDados, id: number) => void;
  idPlanta: number;
}

export type AgroDados = {
  tratosCulturais: string;
  cultivo: string;
  materialMetodos: string;
  adubacao: string;
  praga: string;
  irrigacao: string;
}

export function ModalAgro({ modalAddIsOpen, handleToggleAddOpenModal, idPlanta, handleAddAgro}: ModalAgroProps){
  const [tratosCulturais, setTratosCulturais] = useState('');
  const [cultivo, setCultivo] = useState('');
  const [materialMetodos, setMaterialMetdos] = useState('');
  const [adubacao, setAdubacao] = useState('');
  const [praga, setPraga] = useState('');
  const [irrigacao, setIrrigacao] = useState('');
  const [atualiza, setAtualiza] = useState(false);

  async function buscaDados() {
    const response = await Api.get(`/planta/id/${idPlanta}`);
    const dados:AgroDados = response.data.agroDados;

    if(dados){
      setTratosCulturais(dados.tratosCulturais);
      setCultivo(dados.cultivo);
      setMaterialMetdos(dados.materialMetodos);
      setAdubacao(dados.adubacao);
      setPraga(dados.praga);
      setIrrigacao(dados.irrigacao);
    }else{
      setTratosCulturais('');
      setCultivo('');
      setMaterialMetdos('');
      setAdubacao('');
      setPraga('');
      setIrrigacao('');
    }
  }

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();

    const dados ={
      tratosCulturais,
      cultivo,
      materialMetodos,
      adubacao,
      praga,
      irrigacao
    }

    handleAddAgro(dados, idPlanta);
    setAtualiza(true);  
    handleToggleAddOpenModal(idPlanta);
  }

  useEffect(() => {
    buscaDados()
    setAtualiza(false);  
  },[atualiza, idPlanta])

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={() => handleToggleAddOpenModal(idPlanta)}>
      <ModalInputContent>
        <h3>Conteúdo Agronomia</h3>
        <button type="button" onClick={() => handleToggleAddOpenModal(idPlanta)}>
            <X size={20} />
        </button>

        <FormContentModal onSubmit={handleSubmitForm}>
          <div>
            <label htmlFor="tratosCulturais">Tratos Culturais:</label>
            <textarea name="tratosCulturais" id="tratosCulturais" rows={5} value={tratosCulturais} onChange={event => setTratosCulturais(event.target.value)}></textarea>
            <label htmlFor="cultivo">Cultivo:</label>
            <textarea name="cultivo" id="cultivo" rows={5} value={cultivo} onChange={event => setCultivo(event.target.value)}></textarea>
            <label htmlFor="materialMetdos">Material e Métodos:</label>
            <textarea name="materialMetdos" id="materialMetdos" rows={5} value={materialMetodos} onChange={event => setMaterialMetdos(event.target.value)}></textarea>
            <label htmlFor="adubacao">Adubação:</label>
            <textarea name="adubacao" id="adubacao" rows={5} value={adubacao} onChange={event => setAdubacao(event.target.value)}></textarea>
            <label htmlFor="praga">Manejo das Prinpais Pragas:</label>
            <textarea name="praga" id="praga" rows={5} value={praga} onChange={event => setPraga(event.target.value)}></textarea>
            <label htmlFor="irrigacao">Irrigação:</label>
            <textarea name="irrigacao" id="irrigacao" rows={5} value={irrigacao} onChange={event => setIrrigacao(event.target.value)}></textarea>
          </div>
          <Button type="submit">Adicionar Conteúdo</Button>
        </FormContentModal>
      </ModalInputContent>
    </Modal>
  )
}
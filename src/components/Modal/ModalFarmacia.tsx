import { Plus, Trash, X } from "phosphor-react";
import Modal from ".";
import { Button } from "../Button";
import { ButtonAddCicle, ButtonDeleteCicle, ButtonWraper,FormContentModal, ModalInputContent } from "./ModalFarmaciaStyles";
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
  beneficios: string;
  fonte: string;
  modoDeUsar: string[];
}

export function ModalFarmacia({ modalAddIsOpen, handleToggleAddOpenModal, idPlanta, handleAddFarmacia}:ModalFarmaciaProps){
  const [utilizacao, setUtilizacao] = useState('');
  const [terapeutico, setTerapeutico] = useState('');
  const [beneficios, setbeneficioss] = useState('');
  const [contraindicacao, setContraindicacao] = useState('');
  const [fonte, setFonte] = useState('');
  const [atualiza, setAtualiza] = useState(false);

  const valueBase = {description: ''};
  const [modoDeUso, setModoDeUso] = useState([{...valueBase}]);

  const handleAdd = (event: FormEvent) => {
    event.preventDefault();
    setModoDeUso(state => [...state, {... valueBase}]);
  }

  const handleChange = (e:any, ix:any, event: FormEvent) => {
    event.preventDefault();
    
    const {name, value} = e.target;
    let values: any = [...modoDeUso];
    values[ix][name] = value;
    setModoDeUso(state => [...values]);
  }
  
  const handleDelete = (event: FormEvent, ix:any) => {
    event.preventDefault();

    let values = modoDeUso.filter((a, b) => {    
      if (b !== ix) {
        return a;
      }
    });
    setModoDeUso(state => [...values]);    
  }

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();

    const dados ={
      utilizacao,
      beneficios,
      terapeutico,
      contraindicacao,
      fonte,
      modoDeUsar: modoDeUso.map((item) => item.description)
    }

    handleAddFarmacia(dados, idPlanta);
    setAtualiza(true);  
    handleToggleAddOpenModal();
  }

  async function buscaDados() {
    const response = await Api.get(`/planta/id/${idPlanta}`);
    const dados = response.data.farmaciaDados;

    setUtilizacao(dados.utilizacao);
    setTerapeutico(dados.terapeutico);
    setContraindicacao(dados.contraindicacao);
    if(dados.modoDeUsar.length > 0) {
      const modoDeUsar = dados.modoDeUsar.map((item: any) => {
        return {description: item}
      })

      setModoDeUso(modoDeUsar);
    }
  }

  useEffect(() => {
    buscaDados()
    setAtualiza(false);
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
            <label htmlFor="beneficios">Benefícios:</label>
            <textarea name="beneficios" id="beneficios" rows={5} value={beneficios} onChange={event => setbeneficioss(event.target.value)}></textarea>
            <label htmlFor="terapeuticos">Efeitos terapêuticos:</label>
            <textarea name="terapeuticos" id="terapeuticos" rows={5} value={terapeutico} onChange={event => setTerapeutico(event.target.value)}></textarea>
            <label htmlFor="contraindicacoes">Contraindicação:</label>
            <textarea name="contraindicacoes" id="contraindicacoes" rows={5} value={contraindicacao} onChange={event => setContraindicacao(event.target.value)}></textarea>
            <label htmlFor="fonte">Referência:</label>
            <textarea name="fonte" id="fonte" rows={5} value={fonte} onChange={event => setFonte(event.target.value)}></textarea>
           
            {modoDeUso.map((ing, ix) => 
            (
              <>
                <ButtonWraper>
                  <label htmlFor="modoDeUsar">Modo de Usar:</label>
                  <div>
                    {ix !== 0 && <ButtonDeleteCicle onClick={e => handleDelete(e,ix)}><Trash size={20} /></ButtonDeleteCicle>}
                    <ButtonAddCicle onClick={handleAdd}><Plus size={20}  /></ButtonAddCicle>
                  </div>
                </ButtonWraper>
                <textarea name="description" rows={5} value={ing.description} onChange={event => handleChange(event, ix, event)}></textarea>
              </>
            ))}

          </div>
          <Button type="submit" onClick={handleSubmitForm}>Adicionar Conteúdo</Button>
        </FormContentModal>
      </ModalInputContent>
    </Modal>
  )
}
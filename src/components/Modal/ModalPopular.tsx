import { X } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from ".";
import { PlantaDados } from "../../Screens/Planta";
import { Api } from "../../services/api";
import { Button } from "../Button";
import { DeleteButton, FormContentModal, ModalInputContent, WraperButton } from "./ModalPopularStyles";

interface ModalFarmaciaProps {
  modalAddIsOpen: boolean;
  handleToggleAddOpenModal: (id: number) => void;
  id: number;
  handleNamePopular: (name: string, id: number) => void;
}

export function ModalPopular({ modalAddIsOpen, handleToggleAddOpenModal, id, handleNamePopular}:ModalFarmaciaProps){
  const [popular, setPopular] = useState('');
  const [popularArray, setPopularArray] = useState<string[]>([]);
  const [atualiza, setAtualiza] = useState(false);

  function handleSubmitForm (event: FormEvent) {
    event.preventDefault();

    setPopularArray([...popularArray, popular]);

    setPopular('');
    handleNamePopular(popular, id);
  }

  async function handleDeleteNamePopular (name: string, index: number) {
    const dados:PlantaDados = await Api.get(`/planta/id/${id}`)
    .then(response => {
      return response.data
    })
    .catch(err => console.log(err))

    const namePopular = dados.nome.filter((item: string) => item !== name);
    await Api.patch("/planta/atualizar", {
      id: id,
      dateTime: dados.dateTime,
      imagens: dados.imagens,
      nome: namePopular,
      nomeCientifico: dados.nomeCientifico,
      agroDados: dados.agroDados,
      farmaciaDados: dados.farmaciaDados,
      
    })
    .then(
      (response) => {
        toast.success('Nome popular removido com sucesso!')
        setAtualiza(true);
      }
    )
    .catch(err => toast.error('Erro ao remover nome popular!')) 
  }

  useEffect(() => {
    async function buscaDados() {
      await Api.get(`/planta/id/${id}`)
      .then(response => {
        setPopularArray(response.data.nome)
        setAtualiza(false);
      })
      .catch(error => console.log(error))
    }
    buscaDados()
  },[id, atualiza])

  return (
    <Modal isOpen={modalAddIsOpen} setIsOpen={() => handleToggleAddOpenModal(id)}>
      <ModalInputContent>
        <h3>Nome popular</h3>
        <button type="button" onClick={() => handleToggleAddOpenModal(id)}>
            <X size={20} />
        </button>

        <FormContentModal onSubmit={handleSubmitForm} >
          <div>
            <label htmlFor="cientifico">Nome popular</label>
            <input type="text" name="cientifico" value={popular} placeholder="Nome Científico" onChange={(e) => setPopular(e.target.value)} />
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
            { popularArray ? (
              <tbody>
                {popularArray.map((item, index) => (
                  <tr key={item}>
                    <td>{item}</td>
                    <td><WraperButton><DeleteButton onClick={() => handleDeleteNamePopular(item, index)} ><X size={18} weight="fill" /></DeleteButton></WraperButton></td>
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
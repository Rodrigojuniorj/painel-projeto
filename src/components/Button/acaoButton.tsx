import { ReactNode } from "react";
import { EditButton, DeleteButton, PhotographyButton, PopularButton } from "./acaoButtonStyles";

interface AcaoButtonProps {
  children: ReactNode;
  mod: "edit" | "delete" | "photography" | "popular";
  id: string | undefined;
  handleDeletebutton?: (id: number) => void;
  handleOpenModalPopular?: (id: number) => void;
  handleOpenModalEdit?: (id: number) => void;
  handleOpenModalImage?: (id: number) => void;
}

export function AcaoButton({ children, mod, id, handleDeletebutton, handleOpenModalPopular, handleOpenModalEdit, handleOpenModalImage }:AcaoButtonProps) {

  function handleDelete (id: string) {
    handleDeletebutton(parseInt(id));
  }

  function handleModalPopular (id: string) {
    handleOpenModalPopular(parseInt(id));
  }
  
  function handleModalAtualiza (id: string) {
    handleOpenModalEdit(parseInt(id));
  }

  function handleModalImage (id: string) {
    handleOpenModalImage(parseInt(id));
  }

  return (
    mod === "edit" ? (
      <EditButton type="button" id={id} onClick={() => handleModalAtualiza(id)} >
        {children}
      </EditButton>
    ) : mod === "delete" ? (
      <DeleteButton type="button" id={id} onClick={() => handleDelete(id)} >
        {children}
      </DeleteButton>
    ) : mod === "photography" ? (
      <PhotographyButton id={id} onClick={() => handleModalImage(id)} >
        {children}
      </PhotographyButton>
    ) : (
      <PopularButton id={id} onClick={() => handleModalPopular(id)}>
        {children}
      </PopularButton>
    )
  );
}
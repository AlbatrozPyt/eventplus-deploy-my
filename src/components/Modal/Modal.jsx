import React, {useEffect, useState } from "react";
import trashDelete from "../../assets/images/trash-delete-red.png";

import { Button, Input } from "../FormComponents/FormComponents";
import "./Modal.css";

const Modal = ({
  modalTitle = "Feedback",
  comentaryText = "Não informado. Não informado. Não informado.",
  showHideModal = false,
  fnDelete = null,
  fnGet = null,
  fnPost = null,
  userId = null,
  idEvento = null,
  idComentario = null,
}) => {
  const [comentarioDesc, setComentarioDesc] = useState("");

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    await fnGet(userId, idEvento);
  }

  return (
    <div className="modal">
      <article className="modal__box">
        <h3 className="modal__title">
          {modalTitle}
          <span
            className="modal__close"
            onClick={() => showHideModal(idEvento)}
          >
            x
          </span>
        </h3>

        <div className="comentary">
          <h4 className="comentary__title">Comentário</h4>
          <img
            src={trashDelete}
            className="comentary__icon-delete"
            alt="Ícone de uma lixeira"
            onClick={async () => {
              await fnDelete(idComentario);
              await carregarDados();
            }}
          />

          <p className="comentary__text">{comentaryText}</p>

          <hr className="comentary__separator" />
        </div>

        <Input
          placeholder="Escreva seu comentário..."
          additionalClass="comentary__entry"
          value={comentarioDesc}
          manipulationFunction={(e) => {
            setComentarioDesc(e.target.value);
          }}
        />
        {/* {comentarioDesc} */}
        
        <Button
          textButton="Comentar"
          additionalClass="comentary__button"
          manipulationFunction={async () => {
            if (idComentario !== null) {
                alert("Já existe um comentàrio cadastrado para o evento.");
              } else {
                
                await fnPost(comentarioDesc.trim(), userId, idEvento);
                await carregarDados();
              }
              setComentarioDesc("");//;limpa o campo do input
          }}
        />
      </article>
    </div>
  );
};

export default Modal;

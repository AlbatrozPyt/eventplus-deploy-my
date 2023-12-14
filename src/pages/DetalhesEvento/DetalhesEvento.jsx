import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import "./DetalhesEvento.css";

import api, { commentaryEventResource } from "../../Services/Service";
import { UserContext } from "../../context/AuthContext";

import backArrow from "../../assets/images/back.svg";

// Componentes
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import FeedbackCard from "../../components/FeedbackCard/FeedbackCard";

const DetalhesEvento = () => {
  const [feedback, setFeedback] = useState([]);

  const { state } = useLocation();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    async function DetailsEvents() {
      try {
        const promiseFeedbacks = await api.get(commentaryEventResource);

        setFeedback(promiseFeedbacks.data);

        console.log(promiseFeedbacks.data);
        console.log(feedback);
      } catch (error) {}
    }
    DetailsEvents();
  }, []);

  return (
    <MainContent>
      {userData.role == "Administrador" ? (
        <Link to={"/eventos"}>
          <img src={backArrow} className="back-arrow" />
        </Link>
      ) : (
        <Link to={"/eventos-aluno"}>
          <img src={backArrow} className="back-arrow" />
        </Link>
      )}

      <section className="detalhes-evento">
        <Title
          titleText={"Detalhes do Evento"}
          additionalClass="margim-acima"
        />

        <div className="detalhes">
          <h1>{state.nomeEvento}</h1>

          <p>
            📅<strong>Data:</strong>{" "}
            {new Date(state.dataEvento).toLocaleDateString()}
          </p>
          <p>
            📝<strong>Descricao:</strong> {state.descricao}
          </p>
          <p>
            🎯<strong>Tipo:</strong> {state.tiposEvento.titulo}
          </p>
        </div>
      </section>

      <section className="comentarios-evento">
        <Container>
          <section className="comentarios">
            <Title
              titleText={"Comentarios do evento"}
              additionalClass="margim-acima"
              color="white"
            />

            <div className="events-box">
              {feedback.map((e) => {
                if (e.idEvento == state.idEvento) {
                  if (e.exibe == false && userData.role == "Comum") {
                    return;
                  } else if (
                    e.exibe == false &&
                    userData.role == "Administrador"
                  ) {
                    return (
                      <FeedbackCard
                        title={state.nomeEvento}
                        feedback={e.descricao}
                        nomeUser={e.usuario.nome}
                        exibe="🤬 Comentario ofensivo"
                      />
                    );
                  } else {
                    return (
                      <FeedbackCard
                        title={state.nomeEvento}
                        feedback={e.descricao}
                        nomeUser={e.usuario.nome}
                      />
                    );
                  }
                }
              })}
            </div>
          </section>
        </Container>
      </section>
    </MainContent>
  );
};

export default DetalhesEvento;

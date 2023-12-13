import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import api, { commentaryEventResource } from "../../Services/Service";

// Componentes
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";
import Container from "../../components/Container/Container";
import Card from "../../components/FeedbackCard/FeedbackCard";

const DetalhesEvento = () => {
  const [feedback, setFeedback] = useState([]);

  const { state } = useLocation();

  useEffect(() => {
    async function DetailsEvents() {
      try {
        const promiseFeedbacks = await api.get(commentaryEventResource);

        setFeedback(promiseFeedbacks.data);

        console.log(promiseFeedbacks.data);
      } catch (error) {}
    }
    DetailsEvents();
  }, []);

  return (
    <MainContent>
      <section>
        <Container>
          <Title titleText={"Detalhes do Evento"} />

          <h1>{state.nomeEvento}</h1>

          <p>Data: {state.dataEvento}</p>
          <p>Descricao: {state.descricao}</p>
          <p>Tipo: {state.tiposEvento.titulo}</p>
        </Container>
      </section>

      <section className="proximos-eventos">
        <Container>
          <div className="events-box">
            {
              feedback.map((e) => {
                <Card
                  title={state.nomeEvento}
                  feedback={e.descricao}
                  nomeUser={""}
                />
              })
            }
          </div>
        </Container>
      </section>
    </MainContent>
  );
};

export default DetalhesEvento;

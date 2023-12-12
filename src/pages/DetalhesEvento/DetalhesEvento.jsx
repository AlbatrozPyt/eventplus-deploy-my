import React, { useEffect, useState } from "react";
import MainContent from "../../components/MainContent/MainContent";
import Title from "../../components/Title/Title";

import api, { eventsResource } from "../../Services/Service";

const DetalhesEvento = () => {
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tipo, setTipo] = useState("");
  

  useEffect(() => {
    async function DetailsEvents() {
      try {
        const promise = await api.get(eventsResource);
      } catch (error) {}
    }
  }, []);

  return (
    <MainContent>
      <section>
        <Title titleText={"Detalhes do Evento"} />

        <p>Data</p>
        <p>Descricao</p>
        <p>Tipo</p>
      </section>
    </MainContent>
  );
};

export default DetalhesEvento;

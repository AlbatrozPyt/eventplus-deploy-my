import React, { useEffect, useState } from "react";
import "./HomePage.css";

import Banner from "../../components/Banner/Banner";
import MainContent from "../../components/MainContent/MainContent";
import VisionSection from "../../components/VisionSection/VisionSection";
import ContactSection from "../../components/ContactSection/ContactSection";
import Title from "../../components/Title/Title";
import NextEvent from "../../components/NextEvent/NextEvent";
import PastEvent from "../../components/PastEvent/PastEvent";
import Container from "../../components/Container/Container";
import api from "../../Services/Service";
import Notification from "../../components/Notification/Notification";
import { nextEventResource, eventsResource } from "../../Services/Service";

const HomePage = () => {
  const [nextEvents, setNextEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [notifyUser, setNotifyUser] = useState(); //Componente Notification

  // roda somente na inicialização do componente
  useEffect(() => {
    async function getNextEvents() {
      try {
        const promise = await api.get(nextEventResource);
        const promiseGet = await api.get(eventsResource);
        const dados = await promise.data;
        const dadosEventos = await promiseGet.data;
        setNextEvents(dados); //atualiza o state
        setEvents(dadosEventos); // get eventos
        console.log("Events");
        console.log(events);
      } catch (error) {
        console.log("não trouxe os próximos eventos, verifique lá!");
      }
    }

    getNextEvents(); //chama a função
  }, []);

  return (
    <MainContent>
      {<Notification {...notifyUser} setNotifyUser={setNotifyUser} />}
      <Banner />

      {/* PRÓXIMOS EVENTOS */}
      <section className="proximos-eventos">
        <Container>
          {/* <Title titleText={"Próximos Eventos"} /> */}

          <div className="events-box">
            <Title titleText={"Próximos Eventos"} />
            {nextEvents.map((e) => {
              return (
                <NextEvent
                  key={e.idEvento}
                  title={e.nomeEvento}
                  description={e.descricao}
                  eventDate={e.dataEvento}
                  idEvent={e.idEvento}
                />
              );
            })}
          </div>

          <div className="events-box">
            <Title titleText={"Eventos Passados"} />

            {events.map((e) => {
              console.log(new Date(e.dataEvento).toLocaleDateString());
              console.log(new Date().toLocaleDateString());
              if (
                new Date(e.dataEvento).toLocaleDateString() >
                new Date().toLocaleDateString()
              ) {
                return (
                  <PastEvent
                    title={e.nomeEvento}
                    description={e.descricao}
                    eventDate={e.dataEvento}
                  />
                );
              }
            })}
          </div>
        </Container>
      </section>

      <VisionSection />
      <ContactSection />
    </MainContent>
  );
};

export default HomePage;

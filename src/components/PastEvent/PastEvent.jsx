import React from "react";

import "./PastEvent.css";

import { Tooltip } from "react-tooltip";
import { Link } from "react-router-dom";

const PastEvent = ({ title, description, eventDate, idEvent }) => {

    const obj = {
        nomeEvento: title,
        descricao: description,
        dataEvento: eventDate,
        idEvento: idEvent
    }


  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p
        className="event-card__description"
        data-tooltip-id={idEvent}
        data-tooltip-content={description}
        data-tooltip-place="top"
      >
        <Tooltip id={idEvent} className="tooltip" />
        {description.substr(0, 15)} ...
      </p>

      <p className="event-card__description">
        {/* aplicar a função pra converter a data */}
        {new Date(eventDate).toLocaleDateString()}
      </p>

      <Link to="/detalhes-evento" state={obj} className="event-card__connect-link">
        <a>Ver Detalhes</a>
      </Link>
    </article>
  );
};

export default PastEvent;
// valeu bosta atomica <3

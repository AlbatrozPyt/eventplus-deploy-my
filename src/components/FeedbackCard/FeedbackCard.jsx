import React from "react";

import "./FeedbackCard.css";

const FeedbackCard = ({ title, nomeUser, feedback, exibe = "" }) => {
  return (
    <article className="event-card-feedback">
      <h2 className="event-card__title-feedback">{title}</h2>

      <p className="event-card__description-feedback">{nomeUser}</p>

      <p className="event-card__description-feedback">{feedback}</p>

      <span className="exibe-palavra">{exibe}</span>
    </article>
  );
};

export default FeedbackCard;

import React from "react";

import "./FeedbackCard.css"

const FeedbackCard = ({title, nomeUser, feedback}) => {
  return (
    <article className="event-card">
      <h2 className="event-card__title">{title}</h2>

      <p className="event-card__description">{nomeUser}</p>

      <p className="event-card__description">{feedback}</p>
    </article>
  );
};

export default FeedbackCard;

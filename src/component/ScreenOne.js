import React from "react";
import "../style/fondo.css";
import "../style/screenone.css";
import { Cloud, Star } from "./Decor";
import ositaLuna from "../img/osita-luna.png";
import ositoArcoiris from "../img/osito-arcoiris.png";

function ScreenOne({ onEnter }) {
  return (
    <div className="screen1-container fondo-revelacion">
      <Cloud className="cloud-1" />
      <Cloud className="cloud-2" />
      <Cloud className="cloud-3" />
      <Cloud className="cloud-4" />

      <Star className="star-1" />
      <Star className="star-2" />
      <Star className="star-3" />
      <Star className="star-4" />
      <Star className="star-5" />
      <Star className="star-6" />
      <Star className="star-7" />
      <Star className="star-8" />

      <img src={ositaLuna} alt="Osita durmiendo en la luna" className="s1-img s1-img-top" />
      <img src={ositoArcoiris} alt="Osito con globos y arcoíris" className="s1-img s1-img-bottom" />

      <div className="s1-content">
        <span className="s1-ornament">✦ ✧ ✦</span>
        <h1 className="screen1-title">
          Tienes una
          <span className="screen1-title-script">invitación</span>
          especial
        </h1>
        <p className="screen1-subtitle"></p>
        <button className="screen1-btn" onClick={onEnter}>
          Ver invitación
        </button>
      </div>
    </div>
  );
}

export default ScreenOne;

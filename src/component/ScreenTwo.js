import React, { useEffect, useRef, useState } from "react";
import { Cloud, Star } from "./Decor";
import ositos from "../img/ositos.png";
import ecografia from "../img/ecografia.jpg";
import ositaNina from "../img/osita-nina.png";
import ositoNino from "../img/osito-nino.png";
import ositoLuna from "../img/osito-luna.png";
import ositaArcoiris from "../img/osita-arcoiris.png";

import "../style/fondo.css";
import "../style/screentwo.css";

const CANCION = "/indigo.mp3";
const INICIO_CANCION = 15; // segundo desde el que arranca la canción

// Sábado 10 de octubre de 2026, 21:00 hs (el mes empieza en 0: octubre = 9)
const FECHA_EVENTO = new Date(2026, 9, 10, 21, 0, 0);

const UBICACION = "https://maps.app.goo.gl/RuSY168i4JD9iFSr8";

// Números para confirmar asistencia: formato internacional sin "+" ni espacios
const CONTACTOS = [
  { nombre: "Abu Flavia", numero: "5493815112627" },
  { nombre: "Abu Manuela", numero: "5493815220345" },
];

// Decoración del fondo: [top %, lado, distancia al borde %, tamaño máx px, retraso animación s]
const NUBES = [
  [1, "left", 3, 190, 0], [7, "right", 2, 150, -3], [14, "left", -2, 130, -6],
  [21, "right", 5, 170, -2], [29, "left", 1, 150, -5], [36, "right", -3, 140, -7],
  [43, "left", 4, 170, -1], [50, "right", 2, 150, -4], [57, "left", -1, 130, -8],
  [64, "right", 4, 180, -3], [71, "left", 2, 150, -6], [78, "right", -2, 140, -2],
  [85, "left", 5, 170, -5], [91, "right", 3, 150, -1], [97, "left", 10, 130, -4],
];

// [top %, lado, distancia al borde %, tamaño px, color]
const ESTRELLAS = [
  [2, "right", 24, 14, ""], [4, "left", 30, 8, "celeste"], [6, "left", 12, 10, "rosa"],
  [9, "right", 8, 9, "celeste"], [11, "left", 22, 7, ""], [13, "right", 18, 12, "rosa"],
  [16, "left", 6, 11, ""], [19, "right", 28, 7, "celeste"], [22, "left", 16, 13, "rosa"],
  [25, "right", 10, 9, ""], [27, "left", 4, 8, "celeste"], [30, "right", 20, 11, ""],
  [33, "left", 20, 9, "rosa"], [36, "right", 6, 13, "celeste"], [39, "left", 9, 10, ""],
  [42, "right", 24, 8, "rosa"], [45, "left", 26, 7, "celeste"], [48, "right", 12, 12, ""],
  [51, "left", 5, 9, "rosa"], [54, "right", 4, 8, ""], [57, "left", 18, 12, "celeste"],
  [60, "right", 22, 9, "rosa"], [63, "left", 8, 7, ""], [66, "right", 14, 11, "celeste"],
  [69, "left", 24, 9, ""], [72, "right", 7, 13, "rosa"], [75, "left", 3, 10, "celeste"],
  [78, "right", 26, 8, ""], [81, "left", 14, 11, "rosa"], [84, "right", 10, 9, "celeste"],
  [87, "left", 22, 8, ""], [90, "right", 18, 12, "rosa"], [93, "left", 7, 9, "celeste"],
  [96, "right", 30, 10, ""], [98, "left", 28, 7, "rosa"],
];

const MENSAJE_WSP = encodeURIComponent(
  "¡Hola! Confirmo mi asistencia a la revelación de género 💗💙"
);

function ScreenTwo() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const eventDate = FECHA_EVENTO.getTime();

    const updateCountdown = () => {
      const distance = eventDate - Date.now();

      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio && !audio.paused) audio.pause();
    setPlaying(false);
  };

  // Detiene la música al salir de la página, cambiar de pestaña o abrir WhatsApp
  useEffect(() => {
    const audio = audioRef.current;
    const stop = () => {
      if (audio && !audio.paused) audio.pause();
      setPlaying(false);
    };
    const onVisibilityChange = () => {
      if (document.hidden) stop();
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", stop);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", stop);
      if (audio) audio.pause();
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (audio.currentTime < INICIO_CANCION) audio.currentTime = INICIO_CANCION;
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="s2-container fondo-revelacion">
      {NUBES.map(([top, side, pos, size, delay], i) => (
        <Cloud
          key={`n${i}`}
          className="s2-cloud"
          style={{ top: `${top}%`, [side]: `${pos}%`, width: `clamp(${size * 0.6}px, ${size / 9}vw, ${size}px)`, animationDelay: `${delay}s` }}
        />
      ))}
      {ESTRELLAS.map(([top, side, pos, size, color], i) => (
        <Star
          key={`e${i}`}
          className={color}
          style={{ top: `${top}%`, [side]: `${pos}%`, width: size, animationDelay: `${-(i % 7) * 0.5}s` }}
        />
      ))}

      <div className="s2-content">
        {/* Encabezado */}
        <header className="s2-section">
          <span className="s2-ornament">✦ ✧ ✦</span>
          <p className="s2-kicker">
            <span className="s2-kicker-line" aria-hidden="true" />
            <span className="s2-kicker-text">Mi revelación de</span>
            <span className="s2-kicker-line" aria-hidden="true" />
          </p>
          <h1 className="s2-script s2-hero">Género</h1>
        </header>

        {/* Música */}
        <section className="s2-section">
          <audio
            ref={audioRef}
            src={`${CANCION}#t=${INICIO_CANCION}`}
            preload="metadata"
            onEnded={(e) => {
              // al terminar vuelve a empezar desde el segundo 15
              e.currentTarget.currentTime = INICIO_CANCION;
              e.currentTarget.play().catch(() => setPlaying(false));
            }}
          />
          <button
            className={`s2-music ${playing ? "is-playing" : ""}`}
            onClick={toggleMusic}
            aria-label={playing ? "Pausar canción" : "Reproducir canción"}
          >
            <span className="s2-music-icon" aria-hidden="true">
              {playing ? "❚❚" : "▶"}
            </span>
          </button>
          <p className="s2-music-label">{playing ? "Sonando…" : "Dale play a mi canción"}</p>
        </section>

        {/* Papás */}
        <section className="s2-section">
          <p className="s2-label">Mis papis</p>
          <h2 className="s2-parents">
            Cami <span className="s2-amp">&</span> Nacho
          </h2>
          <p className="s2-text">
            Hace meses vengo creciendo dentro de mami y acompañandome del amor de papi.
            Ellos quieren que seas parte de este momento tan especial.
          </p>
        </section>

        {/* Ecografía */}
        <section className="s2-section">
          <figure className="s2-polaroid">
            <span className="s2-tape s2-tape-left" aria-hidden="true" />
            <span className="s2-tape s2-tape-right" aria-hidden="true" />
            <div className="s2-polaroid-photo">
              <img src={ecografia} alt="Ecografía del bebé" />
            </div>
            <figcaption className="s2-script">Mi primera foto ♡</figcaption>
          </figure>
        </section>

        {/* Ositos + pregunta */}
        <section className="s2-section">
          <img src={ositos} alt="Ositos con globos rosa y celeste" className="s2-ositos" />
          <h2 className="s2-question">
            ¿<span className="s2-nino">Niño</span> o <span className="s2-nina">Niña</span>?
          </h2>
          <p className="s2-text s2-text-italic">¿Qué crees que soy?</p>
        </section>

        {/* Teams */}
        <section className="s2-section">
          <div className="s2-teams">
            <div className="s2-team s2-team-nina">
              <img src={ositaNina} alt="Osita con vestido rosa" className="s2-team-img" />
              <p className="s2-team-label">Si eres</p>
              <h3 className="s2-script">Team Niña</h3>
              <p className="s2-team-sub">Trae uno de estos regalitos(Opciones)</p>
              <ul>
                <li>Pañales</li>
                <li>Perfume</li>
              </ul>
            </div>
            <div className="s2-team s2-team-nino">
              <img src={ositoNino} alt="Osito con pijama celeste" className="s2-team-img" />
              <p className="s2-team-label">Si eres</p>
              <h3 className="s2-script">Team Niño</h3>
              <p className="s2-team-sub">Trae uno de estos regalitos(Opciones)</p>
              <ul>
                <li>Toallitas húmedas</li>
                <li>Shampoo</li>
              </ul>
            </div>
          </div>

          {/* Código de vestimenta */}
          <div className="s2-dress">
            <p className="s2-label">Código de vestimenta</p>
            <h3 className="s2-script s2-dress-title">Ven con los colores de tu team</h3>
            <p className="s2-text">
              Suma a tu look una prenda o un accesorio del color de lo que crees que soy
            </p>
            <div className="s2-dress-options">
              <span className="s2-dress-pill s2-dress-nina">
                <span className="s2-dress-dot" aria-hidden="true" /> Rosa · Team Niña
              </span>
              <span className="s2-dress-pill s2-dress-nino">
                <span className="s2-dress-dot" aria-hidden="true" /> Celeste · Team Niño
              </span>
            </div>
            <p className="s2-dress-ideas">
              Una remera, un moño, una vincha, un pañuelo, unos aros… ¡lo que más te guste!
            </p>
          </div>
        </section>

        {/* Día y lugar */}
        <section className="s2-section">
          <div className="s2-info">
            <div className="s2-info-card s2-info-cuando">
              <img src={ositoLuna} alt="" aria-hidden="true" className="s2-info-img" />
              <p className="s2-label">Cuándo</p>
              <div className="s2-calendar">
                <span className="s2-calendar-side">Sábado</span>
                <span className="s2-calendar-day">10</span>
                <span className="s2-calendar-side">Octubre</span>
              </div>
              <p className="s2-calendar-year">2026</p>
              <p className="s2-hour">
                <span aria-hidden="true">☾</span> 21:00 hs
              </p>
            </div>

            <div className="s2-info-card s2-info-donde">
              <img src={ositaArcoiris} alt="" aria-hidden="true" className="s2-info-img" />
              <p className="s2-label">Dónde</p>
              <p className="s2-script s2-place">En casa de mi papi</p>
              <p className="s2-address">Ing. La Florida · Tucumán 200</p>
              <p className="s2-place-sub">te esperamos para celebrar juntos</p>
              <a className="s2-btn" href={UBICACION} target="_blank" rel="noopener noreferrer" onClick={pauseMusic}>
                Ver ubicación
              </a>
            </div>
          </div>
        </section>

        {/* Cuenta regresiva */}
        <section className="s2-section">
          <p className="s2-label">Faltan</p>
          <div className="s2-countdown">
            {[
              [timeLeft.days, "Días"],
              [timeLeft.hours, "Horas"],
              [timeLeft.minutes, "Min"],
              [timeLeft.seconds, "Seg"],
            ].map(([value, label]) => (
              <div className="s2-count" key={label}>
                <span className="s2-count-num">{String(value).padStart(2, "0")}</span>
                <span className="s2-count-label">{label}</span>
              </div>
            ))}
          </div>
          <p className="s2-script s2-welcome">¡Te esperamos con mucha alegría!</p>
        </section>

        {/* Confirmar asistencia */}
        <section className="s2-section">
          <p className="s2-label">Confirma tu asistencia</p>
          <p className="s2-text">
           Hasta el día miércoles 07/10/2026
          </p>
          <div className="s2-rsvp">
            {CONTACTOS.map(({ nombre, numero }) =>
              numero ? (
                <a
                  key={nombre}
                  className="s2-btn"
                  href={`https://api.whatsapp.com/send?phone=${numero}&text=${MENSAJE_WSP}`}
                  target="_blank"
                  onClick={pauseMusic}
                  rel="noopener noreferrer"
                >
                  {nombre}
                </a>
              ) : (
                <span key={nombre} className="s2-btn is-disabled">
                  {nombre}
                </span>
              )
            )}
          </div>
          <p className="s2-rsvp-hint">
            Toca un nombre y se abrirá WhatsApp con tu confirmación lista para enviar 
          </p>
        </section>
      </div>

      
    </div>
  );
}

export default ScreenTwo;

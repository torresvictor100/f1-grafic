import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const Grafic = ({ options, pilotoRaces1 , pilotoRaces2 }) => {

  const [state, setState] = useState({
    labels: [],
    datasets: [],
    pontuacao1: [],
    pontuacao2: [],
    piloto1: "",
    piloto2: "",
    piloto1Cor: "",
    piloto2Cor: "",
  });

  const coresEquipesF1: Record<string, string> = {
    "red_bull": "#011425",
    "mercedes": "#00d2be",
    "alphatauri": "#fcd800",
    "alfa": "#017747",
    "alpine": "#006bb8",
    "aston_martin": "#006560",
    "ferrari": "#a60203",
    "haas": "#ed1a3b",
    "mclaren": "#ff8000",
    "williams": "#00a1df"
  };

  const getCorEquipe = (equipe) => {
    const cor = coresEquipesF1[equipe.toLowerCase()];
    return cor || "#000"; 
  }
  
  const getRacesName = (pilotoRaces1, pilotoRaces2 ) => {
    pilotoRaces1.forEach((races) => {
      state.piloto1 = getLabelPiloto(races)
      state.piloto1Cor = getCorEquipe(races.Results[0].Constructor.constructorId)
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    pilotoRaces2.forEach((races) => {
      state.piloto2 =getLabelPiloto(races)
      state.piloto2Cor = getCorEquipe(races.Results[0].Constructor.constructorId)
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    return state.labels;
  };

  const getLabelPiloto = (races) => {
    return races.Results[0].Driver.familyName
  }

  const getRacesPotuacao = (pilotoRaces, labels) => {
    let potuacao = []
    let totalMomentanio = 0


    pilotoRaces.forEach((races) => {
      if (!labels.includes(labels.raceName)) {
     
        totalMomentanio = totalMomentanio + parseInt(races.Results[0].points)
        potuacao.push(parseInt(totalMomentanio))
      } else {
        potuacao.push(parseInt(totalMomentanio))
      }
    });
   return potuacao
  }



  const getGraficData = () => {
    let labels = getRacesName(pilotoRaces1, pilotoRaces2);
    let datasets = [
      {
        label: state.piloto1,
        data: getRacesPotuacao(pilotoRaces1, labels),
        backgroundColor: state.piloto1Cor,
      },
      {
        label: state.piloto2,
        data: getRacesPotuacao(pilotoRaces2, labels),
        backgroundColor: state.piloto2Cor,
      },
    ];
    return {
      labels,
      datasets,
    };
  };


  return <Bar options={options} data={getGraficData()} />;
};

export default Grafic;

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
  });
  const getRacesName = (pilotoRaces1, pilotoRaces2 ) => {
    pilotoRaces1.forEach((races) => {
      state.piloto1 = getLabelPiloto(races)
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    pilotoRaces2.forEach((races) => {
      state.piloto2 =getLabelPiloto(races)
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    return state.labels;
  };

  const getLabelPiloto = (races) => {
    return races.Results[0].Driver.familyName
  }

  const getRacesPotuacao = (pilotoRaces1, labels) => {
    let potuacao = []
    let totalMomentanio = 0
    pilotoRaces1.forEach((races) => {
      if (!labels.includes(labels.raceName)) {
        totalMomentanio = totalMomentanio + parseInt(races.Results[0].points)
        console.log(totalMomentanio)
        potuacao.push(parseInt(totalMomentanio))
      }
      else{
        potuacao.push(parseInt(totalMomentanio))
      }
    });
   return potuacao
  }

  const getGraficData = () => {
    let labels = getRacesName(pilotoRaces1, pilotoRaces2);
    getRacesPotuacao(pilotoRaces1,labels)
    let datasets = [
      {
        label: state.piloto1,
        data: getRacesPotuacao(pilotoRaces1, labels),
        backgroundColor: "#ff0000",
      },
      {
        label: state.piloto2,
        data: getRacesPotuacao(pilotoRaces2, labels),
        backgroundColor: "#62615d",
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

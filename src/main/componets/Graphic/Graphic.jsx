import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import CoresUtil from "./CoresUtil"

const Graphic = ({ options, pilotRaces1 , pilotRaces2 }) => {

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

  
  const getRacesName = (pilotRaces1, pilotRaces2 ) => {
    pilotRaces1.forEach((races) => {
      state.piloto1 = getLabelPiloto(races)
      state.piloto1Cor = CoresUtil.getCorEquipe(races.Results[0].Constructor.constructorId)
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    pilotRaces2.forEach((races) => {
      state.piloto2 =getLabelPiloto(races)
      state.piloto2Cor = CoresUtil.getCorEquipe(races.Results[0].Constructor.constructorId)

      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    return state.labels;
  };

  const getLabelPiloto = (races) => {
    return races.Results[0].Driver.familyName
  }
  //esse metodo a baixo ta bugado ta esta pulando as corridas que o cara não correu
  const getRacesPotuacao = (pilotRaces, labels) => {
    let potuacao = []
    let totalMomentanio = 0

    pilotRaces.forEach((races) => {

      console.log("labels")
      console.log(state.labels)
      console.log("races")
      console.log(races.raceName)
      console.log(state.labels.includes(races.raceName))

      if (!labels.includes(labels.raceName)) {
     
        totalMomentanio = totalMomentanio + parseInt(races.Results[0].points)
        potuacao.push(parseInt(totalMomentanio))
      } else {
        potuacao.push(parseInt(totalMomentanio))
      }
    });
   return potuacao
  }



  const getGraphicData = () => {
    let labels = getRacesName(pilotRaces1, pilotRaces2);
    let datasets = [
      {
        label: state.piloto1,
        data: getRacesPotuacao(pilotRaces1, labels),
        backgroundColor: state.piloto1Cor,
      },
      {
        label: state.piloto2,
        data: getRacesPotuacao(pilotRaces2, labels),
        backgroundColor: state.piloto2Cor,
      },
    ];
    return {
      labels,
      datasets,
    };
  };


  return <Bar options={options} data={getGraphicData()} />;
};

export default Graphic;

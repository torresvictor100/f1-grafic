import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ColorsUtil from "./ColorsUtil"

const Graphic = ({ options, pilotRaces1 , pilotRaces2 }) => {

  const [state, setState] = useState({
    labels: [],
    datasets: [],
    pilot1: "",
    pilot2: "",
    pilot1Color: "",
    pilot2Color: "",
  });

  
  const getRacesName = (pilotRaces1, pilotRaces2 ) => {
    pilotRaces1.forEach((races) => {
      state.pilot1 = getLabelPilot(races)
      state.pilot1Color = ColorsUtil.colorTeamF1(races.Results[0].Constructor.constructorId)
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    pilotRaces2.forEach((races) => {
      state.pilot2 =getLabelPilot(races)
      state.pilot2Color = ColorsUtil.colorTeamF1(races.Results[0].Constructor.constructorId)

      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    return state.labels;
  };

  const getLabelPilot = (races) => {
    return races.Results[0].Driver.familyName
  }
  //esse metodo a baixo ta bugado ta esta pulando as corridas que o cara não correu
  //o erro esta acontecendo pq ta fazendo o for das corridas que o piloto participou e na verdade
  //tem de ser das lebels
  const getRacesScore = (pilotRaces, labels) => {
    let racesScore = []
    let momentScore = 0

    labels.forEach((gp) => {
      console.log(gp)
    })

    pilotRaces.forEach((races) => {


      if (!labels.includes(labels.raceName)) {
     
        momentScore = momentScore + parseInt(races.Results[0].points)
        racesScore.push(parseInt(momentScore))
      } else {
        racesScore.push(parseInt(momentScore))
      }
    });
   return racesScore
  }



  const getGraphicData = () => {
    let labels = getRacesName(pilotRaces1, pilotRaces2);
    let datasets = [
      {
        label: state.pilot1,
        data: getRacesScore(pilotRaces1, labels),
        backgroundColor: state.pilot1Color,
      },
      {
        label: state.pilot2,
        data: getRacesScore(pilotRaces2, labels),
        backgroundColor: state.pilot2Color,
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

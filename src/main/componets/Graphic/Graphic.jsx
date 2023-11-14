import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import ColorsUtil from "./ColorsUtil"

const Graphic = ({ options, pilotRaces1 , pilotRaces2, pilotSprintRaces1, pilotSprintRaces2, labels }) => {

  const [state, setState] = useState({
    datasets: [],
    pilot1: "",
    pilot2: "",
    pilot1Color: "",
    pilot2Color: ""
  });

  
  const getRacesName = (pilotRaces1, pilotRaces2 ) => {
    pilotRaces1.forEach((races) => {
      state.pilot1 = getLabelPilot(races)
      state.pilot1Color = ColorsUtil.colorTeamF1(races.Results[0].Constructor.constructorId)
      if (!labels.includes(races.raceName)) {
        labels.push(races.raceName);
      }
    });

    pilotRaces2.forEach((races) => {
      state.pilot2 =getLabelPilot(races)
      state.pilot2Color = ColorsUtil.colorTeamF1(races.Results[0].Constructor.constructorId)

      if (!labels.includes(races.raceName)) {
        labels.push(races.raceName);
      }
    });

    return labels;
  };

  const getLabelPilot = (races) => {
    return races.Results[0].Driver.familyName
  }

  const getSprintRacesScore = (pilotRacesSprint) => {

    let corridaSprint: Record<string, string> = {}
    pilotRacesSprint.forEach((races) => {
      corridaSprint[races.raceName] = races.SprintResults[0].points;
     
      });
      
    return corridaSprint
  }


  const getRacesScore = (pilotRaces, pilotRacesSprint, labels) => {
    let racesScore = []
    let momentScore = 0
    let corrida: Record<string, string> = {}
    let corridaSprint = getSprintRacesScore(pilotRacesSprint)

    pilotRaces.forEach((races) => {
    corrida[races.raceName] = races.Results[0].points;
      
    });

    labels.forEach((gp) => {

      if (corrida[gp] !== undefined &&  corridaSprint[gp] !== undefined) {
        momentScore = momentScore + parseFloat(corrida[gp]) + parseFloat(corridaSprint[gp])
        racesScore.push(parseFloat(momentScore))
      }else if(corrida[gp] !== undefined ){
        momentScore = momentScore + parseFloat(corrida[gp]) 
        racesScore.push(parseFloat(momentScore))
      } else {
        racesScore.push(parseFloat(momentScore))
      }

    })

   return racesScore
  }



  const getGraphicData = () => {
    let labels = getRacesName(pilotRaces1, pilotRaces2);
    let datasets = [
      {
        label: state.pilot1,
        data: getRacesScore(pilotRaces1, pilotSprintRaces1, labels),
        backgroundColor: state.pilot1Color,
      },
      {
        label: state.pilot2,
        data: getRacesScore(pilotRaces2, pilotSprintRaces2, labels),
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

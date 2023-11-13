import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../template/Main";
import Table from "../table/Table";
import Graphic from "../Graphic/Graphic";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const headerProps = {
  valor: "Pilot",
  title: "Pilots Scores",
  Subtitle: "Pilots Scores",
};

const PilotsScore = () => {
  const [state, setState] = useState({
    Pilot1RaceList: [],
    Pilot2RaceList: [],
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "F1 Graphics",
        },
      },
    }
  });

  useEffect(() => {
    const Pilot1BaseUrl =
      "http://ergast.com/api/f1/2020/drivers/max_verstappen/results.json";
    const Pilot2BaseUrl =
      "http://ergast.com/api/f1/2020/drivers/hamilton/results.json";    
    

    Promise.all([axios(Pilot1BaseUrl), axios(Pilot2BaseUrl)])
      .then((responses) => {
        const [response1, response2] = responses;

        const Pilot1RaceList = response1.data.MRData.RaceTable.Races;
        const Pilot2RaceList = response2.data.MRData.RaceTable.Races;

        setState((prevState) => ({
          ...prevState,
          Pilot1RaceList,
          Pilot2RaceList,
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []); 

  const renderTable = () => {
    return <Table pilotRaces1={state.Pilot1RaceList} pilotRaces2={state.Pilot2RaceList} />;
  };


  const renderGraphic = () => {
    return <Graphic options={state.options} pilotRaces1={state.Pilot1RaceList} pilotRaces2={state.Pilot2RaceList} />;
  };
  


  return <Main {...headerProps}>{renderTable()}{renderGraphic()}</Main>;
};

export default PilotsScore;
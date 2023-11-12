import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../template/Main";
import Table from "../Table/Table";
import Grafic from "../Grafic/Grafic";
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
  valor: "Pilotos",
  title: "Comparação de pontos dos pilotos campeões",
  Subtitle: "Comparação de pontos da f1",
};

const Comparar = () => {
  const [state, setState] = useState({
    season: 0,
    Pilot1List: [],
    Pilot2List: [],
    results: { name: "", nationality: "" },
    total: 0,
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
    },
    labels: [],
    datasets: [],
    pontuacao1: [],
    pontuacao2: [],
    piloto1: "",
    piloto2: "",
  });

  useEffect(() => {
    const Piloto1BaseUrl =
      "http://ergast.com/api/f1/2020/drivers/max_verstappen/results.json";
    const Piloto2BaseUrl =
      "http://ergast.com/api/f1/2020/drivers/hamilton/results.json";

    Promise.all([axios(Piloto1BaseUrl), axios(Piloto2BaseUrl)])
      .then((responses) => {
        const [response1, response2] = responses;

        const Pilot1List = response1.data.MRData.RaceTable.Races;
        const Pilot2List = response2.data.MRData.RaceTable.Races;

        setState((prevState) => ({
          ...prevState,
          Pilot1List,
          Pilot2List,
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []); 

  const renderTable = () => {
    return <Table pilotoRaces1={state.Pilot1List} pilotoRaces2={state.Pilot2List} />;
  };


  const renderGrafic = () => {
    return <Grafic options={state.options} pilotoRaces1={state.Pilot1List} pilotoRaces2={state.Pilot2List} />;
  };
  


  return <Main {...headerProps}>{renderTable()}{renderGrafic()}</Main>;
};

export default Comparar;
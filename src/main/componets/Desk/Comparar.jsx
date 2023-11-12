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
      "http://ergast.com/api/f1/2021/drivers/max_verstappen/results.json";
    const Piloto2BaseUrl =
      "http://ergast.com/api/f1/2021/drivers/hamilton/results.json";

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

  const setResults = (results) => {
    return results.map((result) => ({
      name: result.Constructor.name,
      nationality: result.Constructor.nationality,
    }));
  };

  const renderTable = () => {
    return <Table pilotoRaces1={state.Pilot1List} pilotoRaces2={state.Pilot2List} />;
  };


  const renderGrafic = () => {
    return <Grafic options={state.options} data={getGraficData()} />;
  };

  const getRacesName = (pilotoRaces1, pilotoRaces2 ) => {

    pilotoRaces1.forEach((races) => {
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    pilotoRaces2.forEach((races) => {
      if (!state.labels.includes(races.raceName)) {
        state.labels.push(races.raceName);
      }
    });

    return state.labels;
  };

  const getRacesPotuacao = (pilotoRaces1, labels) => {
    let potuacao = []
    pilotoRaces1.forEach((races) => {
      if (!labels.includes(labels.raceName)) {
        potuacao.push(parseInt(races.Results[0].points))
      }
      else{
        potuacao.push(parseInt(0))
      }
    });
   return potuacao
  }
  

  const getGraficData = () => {
    let labels = getRacesName(state.Pilot1List, state.Pilot2List);
    getRacesPotuacao(state.Pilot1List,labels )
    let datasets = [
      {
        label: "label",
        data: getRacesPotuacao(state.Pilot1List, labels),
        backgroundColor: "#ff0000",
      },
      {
        label: "label",
        data: getRacesPotuacao(state.Pilot2List, labels),
        backgroundColor: "#62615d",
      },
    ];
    return {
      labels,
      datasets,
    };
  };

  return <Main {...headerProps}>{renderTable()}{renderGrafic()}</Main>;
};

export default Comparar;
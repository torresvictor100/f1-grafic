import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../template/Main";
import { Bar } from "react-chartjs-2";
import Grafic from "../Grafic/Graphic";
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
  valor: "valor",
  title: "Lista de campeões",
  Subtitle: "Cadastro de caixa: Incluir, Lista, Alterar e Excluir!",
};

const initialState = {
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
};

const Comparar = () => {
  const [state, setState] = useState({ ...initialState });

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
  }, []); // O array vazio como segundo argumento do useEffect faz com que ele só execute uma vez, equivalente ao antigo componentWillMount

  const setResults = (results) => {
    return results.map((result) => ({
      name: result.Constructor.name,
      nationality: result.Constructor.nationality,
    }));
  };

  const renderTable = () => {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ano</th>
            <th>gp</th>
            <th>piloto construtor pontos</th>
            <th>pntuação</th>
          </tr>
        </thead>
        <tbody>
          {renderRows(state.Pilot1List, renderResuls1)}
          <h1>---------------------------</h1>
          {renderRows(state.Pilot2List, renderResuls2)}
        </tbody>
      </table>
    );
  };

  const renderRows = (list, renderResuls) => {
    return list.map((races, index) => (
      <tr key={index}>
        <td>{races.season}</td>
        <td>{races.raceName}</td>
        <tbody>{renderResuls(races.Results)}</tbody>
        <td>{state.total}</td>
      </tr>
    ));
  };

  const getRacesName = (list) => {
    list.forEach((races) => {
      if (!state.labels.includes(races.Circuit.circuitName)) {
        state.labels.push(races.Circuit.circuitName);
      }
    });

    return state.labels;
  };

  const getGraficData = () => {
    let labels = getRacesName(state.Pilot1List);
    let piloto1 = state.piloto1;
    let piloto2 = state.piloto2;
    let datasets = [
      {
        label: piloto1,
        data: state.pontuacao1,
        backgroundColor: "#ff0000",
      },
      {
        label: piloto2,
        data: state.pontuacao2,
        backgroundColor: "#62615d",
      },
    ];
    return {
      labels,
      datasets,
    };
  };

  const renderResuls1 = (resuls) => {
    return resuls.map((resul, index) => {
      state.piloto1 = resul.Driver.familyName;
      state.total += parseInt(resul.points, 10);
      state.pontuacao1.push(state.total);

      return (
        <tr key={index}>
          <td>{resul.Driver.familyName}</td>
          <td>{resul.Constructor.name}</td>
          <td>{resul.points}</td>
        </tr>
      );
    });
  };

  const renderResuls2 = (resuls) => {
    return resuls.map((resul, index) => {
      state.total += parseInt(resul.points, 10);
      state.piloto2 = resul.Driver.familyName;
      state.pontuacao2.push(state.total);

      return (
        <tr key={index}>
          <td>{resul.Driver.familyName}</td>
          <td>{resul.Constructor.name}</td>
          <td>{resul.points}</td>
        </tr>
      );
    });
  };

  return <Main {...headerProps}>{renderTable()}{<Grafic options={state.options} data={getGraficData()} />}</Main>;
};

export default Comparar;
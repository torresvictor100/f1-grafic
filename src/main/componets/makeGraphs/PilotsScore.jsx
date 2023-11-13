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
    Pilot1SprintRaceList: [],
    Pilot2SprintRaceList: [],
    selectedYear: new Date().getFullYear().toString(),
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
    
    const { selectedYear } = state;

    const Pilot1BaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/massa/results.json`;
    const Pilot1SprintBaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/massa/sprint.json`;
    const Pilot2BaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/hamilton/results.json`;
    const Pilot2SprintBaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/hamilton/sprint.json`;
    

    Promise.all([axios(Pilot1BaseUrl), axios(Pilot2BaseUrl), axios(Pilot1SprintBaseUrl), axios(Pilot2SprintBaseUrl)])
      .then((responses) => {
        const [response1, response2, response3, response4] = responses;

        const Pilot1RaceList = response1.data.MRData.RaceTable.Races;
        const Pilot2RaceList = response2.data.MRData.RaceTable.Races;

        const Pilot1SprintRaceList = response3.data.MRData.RaceTable.Races;
        const Pilot2SprintRaceList = response4.data.MRData.RaceTable.Races;

        console.log(Pilot2SprintRaceList)

        setState((prevState) => ({
          ...prevState,
          Pilot1RaceList,
          Pilot2RaceList,
          Pilot1SprintRaceList,
          Pilot2SprintRaceList
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, [state.selectedYear]); 

  const renderTable = () => {
    return <Table pilotRaces1={state.Pilot1RaceList} pilotRaces2={state.Pilot2RaceList} pilotSprintRaces1 = {state.Pilot1SprintRaceList} pilotSprintRaces2 = {state.Pilot2SprintRaceList} />;
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setState((prevState) => ({
      ...prevState,
      selectedYear,
    }));
  };


  const renderGraphic = () => {
    const yearOptions = getYearOptions();

    return (
      <div>
        <label htmlFor="yearSelect">Escolha um ano:</label>
        <select
          id="yearSelect"
          value={state.selectedYear}
          onChange={handleYearChange}
        >
          {yearOptions}
        </select>
        <div>Ano Selecionado: {state.selectedYear}</div>
        <Graphic
          options={state.options}
          pilotRaces1={state.Pilot1RaceList}
          pilotRaces2={state.Pilot2RaceList}
          pilotSprintRaces1={state.Pilot1SprintRaceList}
          pilotSprintRaces2={state.Pilot2SprintRaceList}
        />
      </div>
    );
  };
  
  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1950;

    const yearOptions = [];
    for (let year = currentYear; year >= startYear; year--) {
      yearOptions.push(
        <option key={year} value={year.toString()}>
          {year}
        </option>
      );
    }

    return yearOptions;
  };

  return <Main {...headerProps}>{renderTable()}{renderGraphic()}</Main>;
};

export default PilotsScore;
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
    PilotListYear: [],
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
    
    const { selectedYear, selectedPilot1, selectedPilot2 } = state;

    const Pilot1BaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/${selectedPilot1}/results.json`;
    const Pilot1SprintBaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/${selectedPilot1}/sprint.json`;
    const Pilot2BaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/${selectedPilot2}/results.json`;
    const Pilot2SprintBaseUrl = `http://ergast.com/api/f1/${selectedYear}/drivers/${selectedPilot2}/sprint.json`;
    const PilotListYearUrl = `http://ergast.com/api/f1/${selectedYear}/drivers.json?limit=70`
    

    Promise.all([axios(Pilot1BaseUrl), axios(Pilot2BaseUrl), axios(Pilot1SprintBaseUrl), axios(Pilot2SprintBaseUrl), axios(PilotListYearUrl)])
      .then((responses) => {
        const [response1, response2, response3, response4, response5] = responses;

        const Pilot1RaceList = response1.data.MRData.RaceTable.Races;
        const Pilot2RaceList = response2.data.MRData.RaceTable.Races;

        const Pilot1SprintRaceList = response3.data.MRData.RaceTable.Races;
        const Pilot2SprintRaceList = response4.data.MRData.RaceTable.Races;

        const PilotListYear = response5.data.MRData.DriverTable.Drivers;
        
        setState((prevState) => ({
          ...prevState,
          Pilot1RaceList,
          Pilot2RaceList,
          Pilot1SprintRaceList,
          Pilot2SprintRaceList,
          PilotListYear
        }));
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, [state.selectedYear, state.selectedPilot1, state.selectedPilot2]);

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

  const handlePilot1Change = (event) => {
    const selectedPilot1 = event.target.value;
    setState((prevState) => ({
      ...prevState,
      selectedPilot1,
    }));
  };

  const handlePilot2Change = (event) => {
    const selectedPilot2 = event.target.value;
    setState((prevState) => ({
      ...prevState,
      selectedPilot2,
    }));
  };


  const renderGraphic = () => {
    const yearOptions = getYearOptions();
    const pilotOptions = getPilotOptions();

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

        <label htmlFor="pilot1Select">Escolha o Piloto 1:</label>
        <select
          id="pilot1Select"
          value={state.selectedPilot1}
          onChange={handlePilot1Change}
        >
          {pilotOptions}
        </select>
        <div>Piloto 1 Selecionado: {state.selectedPilot1}</div>

        <label htmlFor="pilot2Select">Escolha o Piloto 2:</label>
        <select
          id="pilot2Select"
          value={state.selectedPilot2}
          onChange={handlePilot2Change}
        >
          {pilotOptions}
        </select>
        <div>Piloto 2 Selecionado: {state.selectedPilot2}</div>

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

  const getPilotOptions = () => {
    const { PilotListYear } = state;

    if (!PilotListYear) {
      return null;
    }

    return PilotListYear.map((pilot) => (
      <option key={pilot.driverId} value={pilot.driverId}>
        {pilot.givenName} {pilot.familyName}
      </option>
    ));
  };

  return <Main {...headerProps}>{renderGraphic()}{renderTable()}</Main>;
};

export default PilotsScore;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Main from "../template/Main";

const headerProps = {
  valor: "valor",
  title: "Lista de campeões",
  Subtitle: "Cadastro de caixa: Incluir, Lista, Alterar e Excluir!",
};

const baseUrl = "http://ergast.com/api/f1/2022/results/1.json";

const initialState = {
  season: 0,
  list: [],
  results: { name: "", nationality: "" },
};

const Construtores = () => {
  const [state, setState] = useState({ ...initialState });

  useEffect(() => {
    axios(baseUrl).then((resp) => {
      const { season, Races } = resp.data.MRData.RaceTable;
      setState((prevState) => ({
        ...prevState,
        season,
        list: Races,
      }));
    });
  }, []); // O array vazio como segundo argumento do useEffect faz com que ele só execute uma vez, equivalente ao antigo componentWillMount

  const setResults = (results) => {
    return results.map((result) => ({
      name: result.Constructor.name,
      nationality: result.Constructor.nationality,
    }));
  };

  const renderRows = () => {
    return state.list.map((race, index) => {
      const results = setResults(race.Results);
      return (
        <tr key={index}>
          <td>{race.season}</td>
          <td>{race.raceName}</td>
          <td>{results[0].name}</td>
          <td>{results[0].nationality}</td>
        </tr>
      );
    });
  };

  const renderTable = () => {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ano</th>
            <th>gp</th>
            <th>vencedora</th>
            <th>nacionalidade</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    );
  };

  return <Main {...headerProps}>{renderTable()}</Main>;
};

export default Construtores;
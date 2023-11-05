import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";

const headerProps = {
    valor: 'valor',
    title: 'Lista de campeões',
    Subtitle: 'Cadastro de caixa: Incluir, Lista, Alterar e Excluir!'
}

const initialState = {
    races: {position: "" },
    season : 0,
    Pilot1List: [],
    Pilot2List: [],
    resuls: {name : "",
    nationality: ""},
    total: 0
}

export default class Comparar extends Component {

    state = { ...initialState }

    componentWillMount() {
        const Piloto1BaseUrl = 'http://ergast.com/api/f1/2023/drivers/alonso/results.json';
        const Piloto2BaseUrl = 'http://ergast.com/api/f1/2023/drivers/hamilton/results.json';
      
      
        Promise.all([axios(Piloto1BaseUrl), axios(Piloto2BaseUrl)])
          .then((responses) => {
            const [response1, response2] = responses;
            const Pilot1List = response1.data.MRData.RaceTable.Races;
            const Pilot2List = response2.data.MRData.RaceTable.Races;
      
            this.setState({ Pilot1List, Pilot2List });
          })
          .catch((error) => {
            console.error('Erro ao buscar dados:', error);
          });
      }

    renderTable() {
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
                    {this.renderRows1()}
                    {this.renderRows2()}
                </tbody>
                <tbody>
                </tbody>
            </table>
        )
    }

    load() {// tem que alterar o set do id não to conseguindo
        const races = { ...this.state.races }
        this.setState({races})
    }

    renderRows1() {
  
        return this.state.Pilot1List.map(races => {
            return (
                <tr>
                    <td>{races.season}</td>
                    <td>{races.raceName}</td>
                    <tbody>
                    {this.renderResuls(races.Results)}
                    </tbody>
                    <td>{this.state.total}</td>
                </tr>
            )
        })
    }

    renderRows2() {
  
        return this.state.Pilot2List.map(races => {
            return (
                <tr>
                    <td>{races.season}</td>
                    <td>{races.raceName}</td>
                    <tbody>
                    {this.renderResuls(races.Results)}
                    </tbody>
                    <td>{this.state.total}</td>
                </tr>
            )
        })
    }

    renderResuls(resuls) {
        return resuls.map(resuls => {
            console.log(this.state.total)
            this.state.total  += parseInt(resuls.points, 10);
            return (
                <tr key={resuls.Constructor.constructorId}>
                    <td>{resuls.Driver.familyName}</td>
                    <td>{resuls.Constructor.name}</td>
                    <td>{resuls.points}</td>
                </tr>
            )
          
        })
    }

    render() {
        return (

            <Main {...headerProps}>
                {this.renderTable()}
            </Main>
        )
    }
}



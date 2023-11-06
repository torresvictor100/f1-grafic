import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";

import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  

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
    total: 0,
    options : {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'F1 Grafics',
        },
      },
    },
    labels : [],
    datasets: [],
    pontuacao1: [],
    pontuacao2: [],
    piloto1: "",
    piloto2:""
    
}





export default class Comparar extends Component {
    

    state = { ...initialState }

    componentWillMount() {
        const Piloto1BaseUrl = 'http://ergast.com/api/f1/2008/drivers/massa/results.json';
        const Piloto2BaseUrl = 'http://ergast.com/api/f1/2008/drivers/hamilton/results.json';
      
      
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

    renderGrafic() {
      return <Bar options={this.state.options} data={this.GetGraficData()} />;
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
                    <h1>---------------------------</h1>
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

    getRacesName(){

      this.state.Pilot1List.map(races => {
        if(!this.state.labels.includes(races.Circuit.circuitName)){
          this.state.labels.push(races.Circuit.circuitName)
        }             
      })

      return this.state.labels

    }

    GetGraficData() {
      let labels = this.getRacesName()
      let piloto1 = this.state.piloto1
      let piloto2 = this.state.piloto2
      let datasets =  [
        {
          label: piloto1,
          data: this.state.pontuacao1,
          backgroundColor: '#ff0000',
        },
        {
          label: piloto2,
          data: this.state.pontuacao2,
          backgroundColor: '#62615d',
        },
      ]
      return {
        labels,
        datasets
      }

    }

    renderRows1() {
  
        return this.state.Pilot1List.map(races => {
      
          
            return (
                <tr>
                    <td>{races.season}</td>
                    <td>{races.raceName}</td>
                    <tbody>
                    {this.renderResuls1(races.Results)}
                    </tbody>
                    <td>{this.state.total}</td>
                </tr>
            )
        })
    }

    renderRows2() {

        this.state.total = 0
  
        return this.state.Pilot2List.map(races => {

          

            return (
                <tr>
                    <td>{races.season}</td>
                    <td>{races.raceName}</td>
                    <tbody>
                    {this.renderResuls2(races.Results)}
                    </tbody>
                    <td>{this.state.total}</td>
                </tr>
            )
        })
    }

    renderResuls1(resuls) {
        return resuls.map(resuls => {
            this.state.piloto1 =  resuls.Driver.familyName
            this.state.total  += parseInt(resuls.points, 10);

            this.state.pontuacao1.push(this.state.total)
            
            return (
                <tr key={resuls.Constructor.constructorId}>
                    <td>{resuls.Driver.familyName}</td>
                    <td>{resuls.Constructor.name}</td>
                    <td>{resuls.points}</td>
                </tr>
            )
          
        })
    }

    renderResuls2(resuls) {
      return resuls.map(resuls => {
          this.state.total  += parseInt(resuls.points, 10);
          this.state.piloto2 =  resuls.Driver.familyName
          this.state.pontuacao2.push(this.state.total)
          
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
      console.log("chmaod ausdadf")
        return (

            <Main {...headerProps}>
                {this.renderTable()}
                {this.renderGrafic(this.state.data)}
            </Main>
        )
    }
}



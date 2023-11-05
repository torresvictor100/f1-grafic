import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";

const headerProps = {
    valor: 'valor',
    title: 'Lista de campeões',
    Subtitle: 'Cadastro de caixa: Incluir, Lista, Alterar e Excluir!'
}

const baseUrl = 'http://ergast.com/api/f1/2022/results/1.json'

const initialState = {
    races: {position: "" },
    season : 0,
    list: [],
    resuls: {name : "",
    nationality: ""}
}

export default class Construtores extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {

            console.log(resp.data.MRData.RaceTable)

            this.setState({ list: resp.data.MRData.RaceTable.Races })
            this.setState({season : resp.data.MRData.RaceTable.season})
     
        })

   
    }



    renderTable() {
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
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    load() {// tem que alterar o set do id não to conseguindo
        const races = { ...this.state.races }
        this.setState({races})
    }

    renderRows() {
  
        return this.state.list.map(races => {
            {this.setResuls(races.Results)}
            return (
                <tr>
                    <td>{races.season}</td>
                    <td>{races.raceName}</td>
                    <td>{this.state.resuls.name}</td>
                    <td>{this.state.resuls.nationality}</td>
                </tr>
            )
        })
    }

    setResuls(resuls) {
        return resuls.map(resuls => {
            return (
                this.state.resuls.name = resuls.Constructor.name,
                this.state.resuls.nationality = resuls.Constructor.nationality
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

//{this.renderForm()}
//{this.renderTable()}
            //       updateField(event) {
       // const cashdesk = { ...this.state.race }
        //cashdesk[event.target.name] = Number(event.target.value)
        //this.setState({ cashdesk })
    //}


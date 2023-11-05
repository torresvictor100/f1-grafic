import React, { Component } from "react";
import axios from 'axios'
import Main from "../template/Main";

const headerProps = {
    valor: 'valor',
    title: 'Cadastra Caixa',
    Subtitle: 'Cadastro de caixa: Incluir, Lista, Alterar e Excluir!'
}

const baseUrl = 'http://localhost:8080/cashdesk'

const initialState = {
    cashdesk: { id:0
            ,value: 0},
    list: []
}

export default class DeskCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

//{"value":cashdesk.value}
    add() {
        const baseUrl = 'http://localhost:8080/cashdesk'
        const cashdesk = { ...this.state.cashdesk }
        console.log(cashdesk.value)
        axios['put'](`${baseUrl}/add/${cashdesk.id}`, {"value":cashdesk.value})
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ cashdesk: initialState.cashdesk, list })
            })
    }

    remove() {
        const baseUrl = 'http://localhost:8080/cashdesk'
        const cashdesk = { ...this.state.cashdesk }
        axios['put'](`${baseUrl}/remove/${cashdesk.id}`, {"value":cashdesk.value})
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ cashdesk: initialState.cashdesk, list })
            })
    }


    getUpdatedList(cashdesk, add = true) {
        const list = this.state.list.filter(u => u.id !== cashdesk.id)
        if (add) list.unshift(cashdesk)
        return list
    }

    updateField(event) {
        const cashdesk = { ...this.state.cashdesk }
        cashdesk[event.target.name] = Number(event.target.value)
        this.setState({ cashdesk })
    }


    renderForm() {// ta vindo em string inves de double
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-grup">
                            <label>Valor</label>
                            <input type="text" className="form-control" name="value"
                                value={this.state.cashdesk.value} onChange={e => this.updateField(e)}
                                placeholder="Digite valor" />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                    <button className="btn btn-success"
                            onClick={e => this.add(e)}>
                            <i className="fa fa-pen"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={e => this.remove(e)}>
                            <i className="fa fa-trah"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor Caixa</th>
                        <th>Escolher</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    load(id) {// tem que alterar o set do id não to conseguindo
        const cashdesk = { ...this.state.cashdesk }
        cashdesk.id = Number(id)
        this.setState({cashdesk})
    }

    renderRows() {
        return this.state.list.map(cashdesk => {
            return (
                <tr key={cashdesk.id}>
                    <td>{cashdesk.name}</td>
                    <td>{cashdesk.amount}</td>
                    <td><button className="btn btn-warning"
                            onClick={() => this.load(cashdesk.id)}>
                            <i className="fa fa-pencil"></i>
                        </button></td>
                </tr>
            )
        })
    }
    


    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}



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
    cashdesk: { name: '', amount: 0 },
    list: []
}

export default class DeskCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ cashdesk: initialState.cashdesk })
    }

    save() {
        const cashdesk = this.state.cashdesk
        const method = cashdesk.id ? 'put' : 'post'
        const url = cashdesk.id ? `${baseUrl}/${cashdesk.id}` : baseUrl
        axios[method](url, cashdesk)
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
        cashdesk[event.target.name] = event.target.value
        this.setState({ cashdesk })
    }

    load(cashdesk) {
        this.setState({ cashdesk })
    }

    remove(cashdesk) {
        axios.delete(`${baseUrl}/${cashdesk.id}`).then(resp => {
            const list = this.getUpdatedList(cashdesk, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor Caixa</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(cashdesk => {
            return (
                <tr key={cashdesk.id}>
                    <td>{cashdesk.name}</td>
                    <td>{cashdesk.amount}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(cashdesk)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                        <button className="btn btn-danger ml-2"
                            onClick={() => this.remove(cashdesk)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-grup">
                            <label>Nome</label>
                            <input type="text" className="form-control" name="name"
                                value={this.state.cashdesk.name} onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-grup">
                            <label>valor inicial caixa</label>
                            <input type="text" className="form-control" name="amount"
                                value={this.state.cashdesk.amount} onChange={e => this.updateField(e)}
                                placeholder="Digite o valor inicial do caixa..." />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e => this.save(e)}>
                            Salvar
                        </button>

                        <button className="btn btn-secondary ml-2"
                            onClick={e => this.clear(e)}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
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



import React, { Component } from "react";
import apitemp from "./apitemp";
import apimares from "./apimares";
const convert = require("xml-js");

// import { Container } from './styles';
export default class App extends Component {
  state = {
    loadedclimas: false,
    loadedmares: false,
    climas: false,
    mares: false
  };

  getApiTemps = async () => {
    const response = await apitemp.get("/");
    const { data } = response;

    if (data) {
      this.setState({
        loadedclimas: true
      });
      console.log(this.state.loadedclimas);
    }

    if (this.state.loadedclimas) {
      let dataJSON = convert.xml2json(data, {
        compact: true,
        spaces: 2
      });

      this.setState({
        climas: dataJSON
      });
      console.log(this.state.climas);
      console.log(typeof this.state.climas);
    }

    if (typeof this.state.climas === "string") {
      let parsed = JSON.parse(this.state.climas);

      this.setState({
        climas: parsed
      });
    }
  };

  getApiMares = async () => {
    const response = await apimares.get("/");
    const { data } = response;
    console.log(data);

    if (data) {
      this.setState({
        loadedmares: true
      });
      console.log(this.state.loadedmares);
    }

    if (this.state.loadedmares) {
      let dataJSON = convert.xml2json(data, {
        compact: true,
        spaces: 2
      });

      this.setState({
        mares: dataJSON
      });
      console.log(this.state.mares);
      console.log(typeof this.state.mares);
    }

    if (typeof this.state.mares === "string") {
      let parsed = JSON.parse(this.state.mares);

      this.setState({
        mares: parsed
      });
    }
  };

  componentDidMount() {
    this.getApiTemps();
    this.getApiMares();
  }

  render() {
    let parsed = this.state.climas;
    let parsedmares = this.state.mares;

    // console.log(parsed.cidade);
    // console.log(parsed);
    // console.log(this.state.loadedclimas);
    // console.log(this.state);
    console.log(parsedmares);

    var nome;
    var minimahj;
    var maximahj;
    var mareManha;
    var mareTarde;
    var mareNoite;

    var agitacaoManha;
    var agitacaoTarde;
    var agitacaoNoite;

    try {
      nome = parsed.cidade.nome._text;

      minimahj = parsed.cidade.previsao[0].minima._text;
      maximahj = parsed.cidade.previsao[0].maxima._text;

      mareManha = parsedmares.cidade.manha.altura._text;
      mareTarde = parsedmares.cidade.tarde.altura._text;
      mareNoite = parsedmares.cidade.tarde.altura._text;

      agitacaoManha = parsedmares.cidade.manha.agitacao._text;
      agitacaoTarde = parsedmares.cidade.tarde.agitacao._text;
      agitacaoNoite = parsedmares.cidade.noite.agitacao._text;
    } catch (err) {
      console.log(err);
    }

    return (
      <div className="container">
        <hr />
        <h2>{nome} </h2>
        <hr />

        <h4>Temperatura:</h4>
        <ul className="list-group">
          <li className="list-group-item"> {minimahj}ºC min</li>
          <li className="list-group-item"> {maximahj}ºC max</li>
        </ul>

        <hr />
        <h4>Marés:</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <p>
              <span className="btn btn-primary">Manhã</span> {mareManha} metros
            </p>
            <span className="btn-sm btn-secondary">
              Nível de Agitação: {agitacaoManha}
            </span>
          </li>
          <li className="list-group-item">
            <p>
              <span className="btn btn-primary">Tarde</span> {mareTarde} metros
            </p>
            <span className="btn-sm btn-secondary">
              Nível de Agitação: {agitacaoTarde}
            </span>
          </li>
          <li className="list-group-item">
            <p>
              <span className="btn btn-primary">Noite</span> {mareNoite} metros
            </p>
            <span className="btn-sm btn-secondary">
              Nível de Agitação: {agitacaoNoite}
            </span>
          </li>
        </ul>
      </div>
    );
  }
}

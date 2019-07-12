import React, { Component } from "react";
import Tabela from "./Tabela";
const axios = require("axios");
const api = axios.create({
  baseURL: "http://servicos.cptec.inpe.br/XML/cidade/231/previsao.xml"
});

const convert = require("xml-js");

export default class src extends Component {
  state = {
    data: "<?xml version='1.0' encoding='ISO-8859-1'?><message>Hello!</message>"
  };

  handleAPI = async () => {
    try {
      const response = await api.get("/");
      const { data } = response;
      this.setState({
        data
      });
    } catch (err) {
      return err;
    }
  };

  componentWillMount() {
    this.handleAPI();
  }

  minMax = () => {
    let data = convert.xml2json(this.state.data, { compact: true, spaces: 2 });
    let jsonData = JSON.parse(data);

    try {
      jsonData.cidade.previsao.map(x =>
        console.log(`Mínima de ${x.minima._text}, Máxima de ${x.maxima._text}`)
      );
      return jsonData.cidade.previsao;
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    console.log(this.state.data);
    let data = convert.xml2json(this.state.data, { compact: true, spaces: 2 });
    let jsonData = JSON.parse(data);
    console.log(`TYPE OF CIDADE ${typeof jsonData.cidade}`);

    return (
      <div>
        <h1>Tábua das Marés</h1>
        {/* <p>Mínima</p>
        <h4>{data}</h4>
        <p>
          <b>Type of data: </b>
          {typeof data}
        </p>
        <br />
        <p>Type of jsonData.cidade: {typeof jsonData.cidade}</p>
        <hr />
        <p>{JSON.stringify(jsonData.cidade)}</p> */}
        <hr />
        <button onClick={this.minMax}>MOSTRAR</button>

        <Tabela dados={jsonData} />
      </div>
    );
  }
}

import React, { Component } from "react";
import api from "./api";
const convert = require("xml-js");

// import { Container } from './styles';
export default class Mares extends Component {
  state = {
    loaded: false,
    mares: false
  };

  getApi = async () => {
    const response = await api.get("/");
    const { data } = response;
    console.log(data);

    if (data) {
      this.setState({ loaded: true });
      console.log(this.state.loaded);
    }

    if (this.state.loaded) {
      let dataJSON = convert.xml2json(data, {
        compact: true,
        spaces: 2
      });

      this.setState({ mares: dataJSON });
      console.log(this.state.mares);
      console.log(typeof this.state.mares);
    }

    if (typeof this.state.mares === "string") {
      let parsed = JSON.parse(this.state.mares);

      this.setState({ mares: parsed });
    }
  };

  componentDidMount() {
    this.getApi();
  }

  render() {
    let parsed = this.state.mares;

    console.log(parsed.cidade);
    console.log(parsed);
    console.log(this.state.loaded);

    return (
      <div>
        <h1>Marés</h1>
        <p>DATA:{JSON.stringify(this.state.mares)} </p>
        <p>TYPE: {typeof this.state.mares}</p>
      </div>
    );
  }
}

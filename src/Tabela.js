import React, { Component } from "react";

// import { Container } from './styles';

export default class Tabela extends Component {
  render() {
    console.log(this.props.dados.cidade);

    // let newData = JSON.parse(this.props.dados);
    // console.log(newData);

    return (
      <div>
        <p>Mínima hoje:</p>
        <p>Máxima hoje: </p>
        <p>AY</p>
        <p />
        {/* jsonData.cidade.previsao.map(x => console.log(`Mínima de $
        {x.minima._text}, Máxima de ${x.maxima._text}`) ); */}
      </div>
    );
  }
}

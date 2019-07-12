const axios = require("axios");
const api = axios.create({
    baseURL: "http://servicos.cptec.inpe.br/XML/cidade/231/previsao.xml"
});

module.exports = api
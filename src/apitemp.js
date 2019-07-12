const axios = require("axios");
const apitemp = axios.create({
    baseURL: "http://servicos.cptec.inpe.br/XML/cidade/231/previsao.xml"
});

module.exports = apitemp
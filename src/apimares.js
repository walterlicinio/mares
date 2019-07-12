const axios = require("axios");
const apimares = axios.create({
    baseURL: "http://servicos.cptec.inpe.br/XML/cidade/231/dia/0/ondas.xml"
});

module.exports = apimares
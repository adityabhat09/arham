const axios = require("axios");

const BSE_API = process.env.BSE_API;

async function getClients() {

    const response = await axios.get(`${BSE_API}/clients`);

    return response.data;

}

module.exports = {
    getClients
};
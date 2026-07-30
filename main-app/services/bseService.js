const axios = require("axios");

const BSE_API = process.env.BSE_API;

async function getClients() {
    const response = await axios.get(`${BSE_API}/clients`);
    return response.data;
}

async function getTrades() {
    const response = await axios.get(`${BSE_API}/trades`);
    return response.data;
}

async function getEmployees() {
    const response = await axios.get(`${BSE_API}/employees`);
    return response.data;
}

async function getMappings() {
    const response = await axios.get(`${BSE_API}/mappings`);
    return response.data;
}

module.exports = {
    getClients,
    getTrades,
    getEmployees,
    getMappings
};
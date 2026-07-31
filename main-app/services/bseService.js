const axios = require("axios");

const BSE_API = process.env.BSE_API;
const TIMEOUT = 30000; // matches the brief's 30-second network termination

async function getClients() {
    const response = await axios.get(`${BSE_API}/clients`, { timeout: TIMEOUT });
    return response.data;
}

async function getTrades() {
    const response = await axios.get(`${BSE_API}/trades`, { timeout: TIMEOUT });
    return response.data;
}

async function getEmployees() {
    const response = await axios.get(`${BSE_API}/employees`, { timeout: TIMEOUT });
    return response.data;
}

async function getMappings() {
    const response = await axios.get(`${BSE_API}/mappings`, { timeout: TIMEOUT });
    return response.data;
}

module.exports = { getClients, getTrades, getEmployees, getMappings };
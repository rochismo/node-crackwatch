const fetch = require('node-fetch');

module.exports = async function(url, params) {
    const request = await fetch(`${url}${params}`);
    return request.json();
}
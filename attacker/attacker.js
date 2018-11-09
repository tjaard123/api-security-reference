// Pre-work: Obtain private key from identity provider

let jwt = require('jsonwebtoken'); // JWT library from Auth0
let fs = require('fs');
let http = require('axios'); // Http client, use your preferred

// Fetch secret
let consumerId = 'ExampleConsumer01';
let privateKey = fs.readFileSync('private.key');
let incorrectPrivateKey = fs.readFileSync('incorrect-private.key');

function createRequest(token) {
    return { headers: { 'Authorization': 'Bearer ' + token, 'consumer-id': consumerId } };
}

async function makeRequest(request) {
    try {
        let response = await http.get('http://localhost:3000/api/resource', request);
        console.log(`${response.status}: ${JSON.stringify(response.data)}`);
    }
    catch (error) { console.error(`${error.response.status}: ${error.response.statusText}`); }
}

// Incorrect private key
var token = jwt.sign({ foo: 'bar' }, incorrectPrivateKey, { algorithm: 'RS256' });
makeRequest(createRequest(token));

// Tampering
token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256' });
let i = token.indexOf('.') + 1; // Change one char in body part of token
let tamper = token.substr(0, i) + 'a' + token.substr(i + 1);
makeRequest(createRequest(tamper));
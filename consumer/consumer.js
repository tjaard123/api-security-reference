// Pre-work: Obtain private key from identity provider

let jwt = require('jsonwebtoken'); // JWT library from Auth0
let fs = require('fs');
let http = require('axios'); // Http client, use your preferred

// Fetch secret
let consumerId = 'ExampleConsumer01';
let privateKey = fs.readFileSync('private.key'); // Store securely

async function makeRequest(privateKey) {
    // Sign token using the private key, set an expiry
    let token = jwt.sign({ foo: 'bar' }, privateKey, { algorithm: 'RS256', expiresIn: 120 });
    console.log(`Token: ${token}`);

    // Add token to Authorization header
    let request = {
        headers: { 'Authorization': 'Bearer ' + token, 'consumer-id': consumerId }
    };

    try {
        // Make a secure request, use https and make sure the certificate is valid
        let response = await http.get('http://localhost:3000/api/resource', request);
        console.log(`${response.status}: ${JSON.stringify(response.data)}`);
    }
    catch (error) { console.error(`${error.response.status}: ${error.response.statusText}`); }
}

// Valid example
makeRequest(privateKey);
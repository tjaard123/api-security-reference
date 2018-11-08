// Pre-work: Obtain secret from identity provider

let jwt = require('jsonwebtoken');
let http = require('axios'); // Http client, use your preferred

// Fetch secret
let consumerId = 'ExampleConsumer01';
let secret = 'SECRET_FROM_IDENTITY_PROVIDER'; // Store secret securely, e.g. in ENV

async function makeRequest(secret) {
    // Sign token using the secret, set an expiry
    let token = jwt.sign({ consumerId: 'ExampleConsumer01' }, secret, { expiresIn: 120 });
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
makeRequest(secret);

// Invalid example
makeRequest('INVALID_SECRET');
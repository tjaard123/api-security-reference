// TODO: Use public / private key instead of shared secret
// TODO: Use scope

// Network level security - Whitelist source IP

let jwt = require('jsonwebtoken');
let app = require('express')();
let port = 3000;

// API maintains a list of consumers with their unique secrets
let consumers = {
    ExampleConsumer01: { secret: 'SECRET_FROM_IDENTITY_PROVIDER' }
}

// Authentication middleware to run with every request - use your preferred middleware, e.g. express-jwt
function middleware (req) {
    // Fetch token from Authorization header, your middleware will do a better job than this
    token = req.headers.authorization.substring(7);

    // Verify (signature, expiry etc.)
    let decoded = jwt.verify(token, consumers[req.headers['consumer-id']].secret);
    console.log(`Decoded: ${JSON.stringify(decoded)}`);
}

app.get('/api/resource', (req, res) => {
    try {
        middleware(req); // Obviously middleware won't be called like this, just keeping it simple
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        res.sendStatus(401);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
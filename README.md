# API Security Reference

This project is a simple demonstration of how to secure machine-to-machine channels.

# Layman's Security Checklist

- Information in transit isn't readable (Encryption)
- Consumer is talking to real API (Certificate)
- Consumer is who says he is (Authentication)
- A compromised channel has limited damage (Tokens which expires)
- Store secrets securely and don't transmit (JWT Tokens, Public / Private Keys)
- Compromised credentials is useless (Network IP Whitelist)
- Consumer can't do more than he needs (Authorization)

# Encryption

Man in the middle can't read request

> Only use TLS (Https)

Detect man in the middle, validate certificate.  Only the real owner of the domain can serve the certificate, don't ignore certificate errors!  Most frameworks do this automatically.

> Validate Certificate

Watch out for:
- Code which ignores certificate errors

# Authentication

Don't pass secret credentials all the time. Exchange a token which expires so that a stolen token can't be used for replay attacks.

> Use Tokens that Expire
> Put token in Authorization header

Use private-public key cryptogrophy so that API can validate a request came from a consumer without that consumer having to pass his secret over the channel.

> Use Digital Signature / Public-Private key Cryptography (JWT tokens)

Watch out for:
- Basic authentication, where username and password is sent with every request
- Tokens that don't expire often

# Authorization

> Limit scope

Watch out for:
- Credentials allowing full access to API while only requiring limited access
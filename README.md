# Address Microservice API

## Overview

The Address Microservice API is designed to provide address-related functionalities through a RESTful API. It is built using Node.js with Nest.js framework, and utilizes Mongoose for MongoDB interaction and Redis for caching. Swagger is implemented for API documentation.

## Description

Developed for shipping services, billing services, among others.

## Features

- **Country:** Fetches countries data.
- **State:** Fetches states data.
- **City:** Fetches cities data.
- **District:** Fetches districts data.
- **CRUDs:** Maintains address data.
- **Input Validation:** All user inputs are validated and sanitized to prevent SQL injection and other attacks.
- **Data Sanitization:** User inputs and data are sanitized before processing to prevent XSS attacks.
- **Authentication and Authorization:** Implements authentication and authorization mechanisms to ensure only authorized users can access API endpoints.
- **HTTPS:** Enforces HTTPS to encrypt data transmission and prevent man-in-the-middle attacks.
- **Rate Limiting:** Implements rate limiting to prevent brute force attacks and DDoS attacks.
- **Error Handling:** Proper error handling is implemented to avoid leaking sensitive information.
- **Content Security Policy (CSP):** CSP headers are implemented to prevent XSS attacks by controlling which resources are loaded by the browser.
- **Input and Output Encoding:** Data is encoded to prevent injection attacks.
- **Session Management:** Secure session management is implemented to prevent session hijacking and fixation.
- **Security Headers:** Various security headers such as X-Content-Type-Options, X-Frame-Options, and X-XSS-Protection are implemented to enhance security.
- **Dependency Management:** Regularly updates dependencies to patch security vulnerabilities.

Additionally, load balancing with cluster, caching, connection pooling, and logging functionalities are implemented.

## Installation

1. Clone the repository:
```bash
$ git clone https://github.com/sldeaals/address-microservice-api.git
```

2. Install dependencies:
[Node](https://nodejs.org/en/download/package-manager)
[Redis](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/)

```bash
$ cd address-microservice-api

$ nvm use

$ npm i
```

## Configuration
Environment variables can be set in a .env file. Refer to the .env.example for required variables.

## Usage

1. Start the Redis server:
```bash
$ npm run start:redis
```

2. Start the application:
```bash
$ npm start:app
```

3. Access the API at http://localhost:<port>

### Running the app

```bash
# development
$ npm run start:app

# watch mode
$ npm run start:dev:app

# production mode
$ npm run start:prod

# concurrently redis & nest
## For development
$ npm run start
## watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## Stay in touch

- Author - [Daniel Arias](https://discord.gg/6V6G9xaQ)

## License

Address Microservice API is [MIT licensed](LICENSE).

Feel free to adjust or expand it according to your specific project requirements!

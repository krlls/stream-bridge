# Nodejs-TypeScript-starter

This is a boilerplate project for building a Node.js application using TypeScript and Koa framework.

## Features

- Integration of Node.js, TypeScript, and Koa.
- Docker support for containerization.
- Database integration using TypeORM.
- API routing with Koa Router.
- User creation functionality with validation.
- Test framework setup using Jest.
- ESLint and Prettier for code formatting and linting.
- Configuration management with dotenv.

## Prerequisites

- Node.js (v12 or higher)
- Yarn package manager
- Docker (optional)

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/krlls/Nodejs-TypeScript-starter
```
2. Install dependencies:
```bash
cd Nodejs-TypeScript-starter
yarn install
```
### Development

1. Build and start the application:
```bash
yarn dev
```
The application will be running at http://localhost:3000.

2. Make changes to the source code in the `src` directory.

### Building

To build the application, run:
```bash
yarn build
```
The compiled JavaScript files will be generated in the `dist` directory.

### Testing

To run tests, use the following command:
```bash
yarn test
```

### Docker

To build a Docker image of the application, use the following command:
```bash
yarn build:docker
```
To run the Docker image in a container, use the following command:
```bash
yarn build:docker
```
### Configuration

The application uses environment variables for configuration. Create a `.env` file in the root directory and provide the required environment variables.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Acknowledgments

This boilerplate is based on the work of [ksmi](https://github.com/krlls) and the [Nodejs-TypeScript-Koa-boilerplate](https://github.com/krlls/Nodejs-TypeScript-Koa-boilerplate) repository.

## Contact

For any questions or inquiries, please contact krrllsm@gmail.com.
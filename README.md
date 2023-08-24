# Stream Bridge
[![License](https://img.shields.io/badge/License-CC%20BY--NC--ND%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Node.js](https://img.shields.io/badge/Node.js-v18.0.0-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-v18.2.0-blue.svg)](https://reactjs.org/)
[![Yarn](https://img.shields.io/badge/Package%20Manager-Yarn-2C8EBB.svg)](https://yarnpkg.com/)

>⚠️ Project is currently under development and **does not have a working version yet**. However, we welcome your contributions to the development process. We appreciate any input and support as we work towards creating a functional version of the project. Stay tuned for updates and opportunities to get involved in the development of Stream Bridge. Thank you for your interest!

![](https://github.com/krlls/stream-bridge/raw/main/docs/preview.png)

Stream Bridge is a versatile and customizable music synchronization tool that allows users to sync music from various streaming services. With StreamBridge, you can create your own self-hosted solution for syncing music across multiple streaming platforms, providing a personalized and unified listening experience.

## Key Features

- **Self-Hosted Solution**: Stream Bridge allows you to deploy and manage your own instance of the synchronization tool, giving you full control over your music library and data.

- **Cross-Streaming Sync**: Sync music seamlessly from different streaming services, enabling access to your favorite tracks from various platforms in one centralized location.
by-nc-sa
- **Unified Library**: Stream Bridge brings together your preferred songs, playlists, and albums from different streaming services into a single, cohesive library, eliminating the need to switch between multiple apps or accounts.

- **Real-Time Updates**: Changes made to your music library, such as adding new tracks or creating playlists, are instantly synchronized across all connected streaming services, ensuring you have the most up-to-date collection at all times.

- **Customizable Sync Settings**: Tailor the synchronization process to your preferences. Choose specific playlists, artists, or albums to sync, or enable automatic synchronization based on your listening history.

- **API Integrations**: Stream Bridge supports integrating with popular streaming platforms' APIs, such as Spotify, Apple Music, Amazon Music, YouTube Music, and more, making it flexible and adaptable to different services.

- **Cross-Device Compatibility**: Access your synchronized music library across all your devices, including desktop computers, smartphones, and tablets, ensuring a consistent experience wherever you go.

## How it Works

1. **Deploy**: Set up and deploy your self-hosted instance of Stream Bridge using the provided deployment guide or Docker image.

2. **API Integration**: Connect Stream Bridge to the APIs of your preferred streaming services, authorizing the necessary permissions to access your music library.

3. **Choose Sync Options**: Customize the synchronization settings based on your preferences. Select playlists, artists, albums, or any other music content you want to sync across platforms. Alternatively, enable automatic synchronization based on your listening history.

4. **Sync and Enjoy**: Stream Bridge will start synchronizing your chosen content across all connected streaming services. Your music library will be updated in real-time, providing a seamless and unified music streaming experience.

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/krlls/stream-bridge.git
```
2. Install dependencies:
```bash
cd stream-bridge
yarn
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

## Contributing

We welcome contributions from the community to enhance Stream Bridge. If you're interested in contributing, please follow the guidelines outlined in the project's `CONTRIBUTING.md` file.

## License

Stream Bridge is released under the [CC BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode). Please refer to the `LICENSE` file for more information.

## Contact

For any questions or inquiries, please contact krrllsm@gmail.com.

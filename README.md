# Notification Service

The `notification_service` is a Node.js microservice designed to manage notifications in a social media application. This service integrates with Kafka for message streaming, connects to a MongoDB database, and registers with Eureka for service discovery.

To view all services for this social media system, lets visit: `https://github.com/goddie9x?tab=repositories&q=social`

## Prerequisites

- Node.js 18+
- Docker and Docker Compose
- Git

## Setup

### 1. Clone the Repository

Clone the `notification_service` repository and its required utilities:

```bash
git clone https://github.com/goddie9x/social_notification_service.git
cd notification_service
```

### 2. Clone Utility Package

Clone the required `social_utils` package as a subdirectory in the project root:

```bash
git clone https://github.com/goddie9x/social_utils.git utils
```

### 3. Configuration

Set up environment variables in a `.env` file in the root directory with the following configuration:

```dotenv
APP_NAME=notification-service
PORT=3002
MONGODB_URI=mongodb://goddie9x:thisIsJustTheTestPassword123@mongo:27017/notification
JWT_SECRET=<your-jwt-secret-here>
KAFKA_CLIENT_HOST=kafka:29092
EUREKA_DISCOVERY_SERVER_HOST=discovery-server
EUREKA_DISCOVERY_SERVER_PORT=8761
APP_PATH=/api/v1/notifications
IP_ADDRESS=notification-service
HOST_NAME=notification-service
```

Make sure to replace `<your-jwt-secret-here>` with a strong secret key for JWT encoding.

## Package Installation

Ensure dependencies are installed by running:

```bash
npm install
```

## Running the Service Locally

To start the service locally:

```bash
npm start
```

The service will run on `http://localhost:3002` by default.

## Running with Docker

1. **Dockerfile**:

   Create a `Dockerfile` in the project root with the following content:

   ```dockerfile
   FROM node:18-alpine
   WORKDIR /usr/src/app
   COPY package*.json ./
   RUN npm install --production
   COPY . .
   EXPOSE 3002
   CMD ["npm", "start"]
   ```

2. **Build and Run the Docker Container**:

   Build and start the Docker container:

   ```bash
   docker build -t notification-service .
   docker run -p 3002:3002 --env-file .env notification-service
   ```

## Running with Docker Compose

To run `notification_service` within a Docker Compose setup, include the following service definition:

```yaml
notification-service:
  image: notification-service
  build:
    context: .
  ports:
    - 3002:3002
  environment:
    - APP_NAME=notification-service
    - PORT=3002
    - MONGODB_URI=mongodb://goddie9x:thisIsJustTheTestPassword123@mongo:27017/notification
    - JWT_SECRET=<your-jwt-secret-here>
    - KAFKA_CLIENT_HOST=kafka:29092
    - EUREKA_DISCOVERY_SERVER_HOST=discovery-server
    - EUREKA_DISCOVERY_SERVER_PORT=8761
    - APP_PATH=/api/v1/notifications
    - IP_ADDRESS=notification-service
    - HOST_NAME=notification-service
  depends_on:
    - mongo
    - discovery-server
  networks:
    - social-media-network
```

Start all services with Docker Compose:

```bash
docker-compose up --build
```

## Accessing the Service

Once running, the `notification_service` will be available at `http://localhost:3002/api/v1/notifications`.

---

This setup will allow you to start, configure, and deploy the `notification_service` in both local and containerized environments.

### Useful Commands

- **Stop Containers**: Use `docker-compose down` to stop all services and remove the containers.
- **Restart Containers**: Run `docker-compose restart` to restart the services without rebuilding the images.

This setup enables seamless orchestration of the social media microservices with an API Gateway for managing external client requests.

## Contributing

Contributions are welcome. Please clone this repository and submit a pull request with your changes. Ensure that your changes are well-tested and documented.

## License

This project is licensed under the MIT License. See `LICENSE` for more details.
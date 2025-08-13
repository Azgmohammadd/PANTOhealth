# PANTOhealth
PANTOhealth Backend Developer Technical Assessment


## Project Overview
**PANTOhealth** is a technical implementation of an IoT Data Management System with RabbitMQ integration, created for an interview assessment.  
It processes incoming **x-ray data** from simulated IoT devices, stores processed results, and provides API endpoints for retrieval and analysis.

The system is designed with an event-driven architecture and leverages multiple services for messaging, storage, and analytics — all orchestrated via Docker Compose.

---

## Features
- **Real-time message processing** using RabbitMQ
- **Data persistence** with MongoDB
- **Search and analytics** using Elasticsearch
- **Visual dashboards** powered by Kibana
- **Containerized environment** with Docker Compose

---

## Tech Stack
- **Backend Framework:** NestJS
- **Message Broker:** RabbitMQ
- **Database:** MongoDB
- **Search Engine:** Elasticsearch
- **Visualization:** Kibana
- **Containerization:** Docker, Docker Compose

---

## Prerequisites
Before starting, ensure you have the following installed:
- [Docker](https://www.docker.com/) (latest stable version)
- [Docker Compose](https://docs.docker.com/compose/)

---

## Getting Started with Docker

### 1. Clone the repository
```bash
git clone https://github.com/Azgmohammadd/PANTOhealth.git
cd PANTOhealth
```

### 2. Start all services
```bash
docker compose up -d
```

### 3. Access all services
1. Kibana: http://localhost:5601 visualizes analytics and reports.
2. Swagger http://localhost:3000/api openAPI integration.

## Author
- Author: Mohammad Azghandi

- Purpose: Interview technical assessment implementation
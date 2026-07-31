# Arham Fintech Coding Assignment

## Description

This repository contains the solution for the Arham Fintech coding assignment, including:

- Part A: Mock BSE API  (/fake-bse-api  folder)
- Part B: Internal Dashboard   (main-app/frontend)

## Live Links

- Mock BSE API: https://arham-zy2b.onrender.com/
- Main App API: https://arham-mainapp.onrender.com
- Dashboard: https://arham-mainapp-frontend.onrender.com/

## Architecture, Reasoning, 100x data flow shortnote

- 📄 [Architecture Document](docs/arham.architecture.pdf)

## Overview
This project consists of three components:
1. **Mock BSE API** – Simulates the external BSE Exchange API by providing client and trade data with configurable delays and random failures to mimic real-world conditions.
2. **Main App API** – Acts as the backend service that fetches data from the Mock BSE API, combines it with internal employee and client-mapping data, maintains a persistent MongoDB cache, retries failed requests, and exposes APIs for the dashboard.
3. **Dashboard** – A React-based web application that consumes the Main App API to display Clients, Trades, My Clients, Employees, and Incentives with filtering and automatic real-time updates.


## Hard Requirements Satisfied
The solution was strictly designed to satisfy the assignment's core constraints:

- **Fast page loads (< 1 second):** The Main App API serves cached data immediately using a database-persisted fallback cache. If the BSE API experiences a 10-minute delay or total failure, the system survives the 30-second network timeout, gracefully aborts the request, and instantly serves the persistent cache to ensure zero UI disruption.

- **Automatic updates without page refresh:** Instead of inefficient HTTP polling, the system uses **MongoDB Change Streams** combined with **Server-Sent Events (SSE)**. When the database changes, the backend detects it instantly and pushes the fresh data directly to the React frontend, updating the UI in real-time.


## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Express.js, Node.js
- **Database:** MongoDB Atlas
- **Real-time:** Server-Sent Events (SSE), MongoDB Change Streams
---

## Local Setup & Database Instructions
If you wish to run this project locally, you will need a free MongoDB Atlas cluster.
### 1. Database Setup
1. Create a MongoDB Atlas cluster.
2. Get your connection string (e.g., `mongodb+srv://<user>:<password>@cluster...`).
### 2. Start the Mock BSE API

cd fake-bse-api
npm install

-  Create a .env file in fake-bse-api:

PORT=3000
MONGODB_URI=your_mongodb_connection_string
BSE_DELAY_MS=5000 
BSE_FAILURE_RATE=0.2

- Seed the Database (Run this once to populate the initial fake data):

node db/seed.js

### 3. Start the Main App API

cd main-app
npm install

- Create a .env file in main-app:

PORT=4000
BSE_API=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
REFRESH_COOLDOWN_MS=60000

- Start the service:

bash
npm start

### 4. Start the React Dashboard

cd main-app/frontend
npm install


- Create a .env file in main-app/frontend:
VITE_API_URL=http://localhost:4000

- Start the dashboard:
npm run dev
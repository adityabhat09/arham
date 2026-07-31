# Arham Fintech Coding Assignment

## Description

This repository contains the solution for the Arham Fintech coding assignment, including:

- Part A: Mock BSE API
- Part B: Internal Dashboard

## Overview

This project consists of three components:

- **Mock BSE API** – Simulates the external BSE Exchange API by providing client and trade data with configurable delays and random failures to mimic real-world conditions.

- **Main App API** – Acts as the backend service that fetches data from the Mock BSE API, combines it with internal employee and client-mapping data, maintains a stale-while-revalidate cache, retries failed requests, and exposes APIs for the dashboard.

- **Dashboard** – A React-based web application that consumes the Main App API to display Clients, Trades, My Clients, Employees, and Incentives with filtering and automatic updates when fresh data becomes available.

## Live Links

- Mock BSE API: https://arham-zy2b.onrender.com/
- Main App API: https://arham-mainapp.onrender.com
- Dashboard: https://arham-mainapp-frontend.onrender.com/

## Tech Stack

- React (Vite)
- Express.js
- Node.js
- Axios
- JavaScript

## Features

- Clients
- Trades with filters
- My Clients
- Employees
- Incentives
- Stale-while-revalidate cache
- Retry mechanism
- Background refresh
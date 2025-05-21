# DFMCRM

Property management CRM tailored for Donald Mammano's portfolio in Scranton, Pennsylvania. The system focuses on minimal daily input with a map-based view, tenant tracking, maintenance logging, and automated reminders.

## Features
- Property and unit management
- Tenant onboarding with lease tracking
- Maintenance issue logging with urgency flags
- Financial summary per property and portfolio
- Simple REST API (FastAPI) for future integrations

## Development
The `backend` directory contains the FastAPI application. Install dependencies with `pip install -r requirements.txt` and run using `uvicorn backend.main:app --reload`.

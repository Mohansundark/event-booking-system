Here’s the updated README file with the sample data included:

---

# Event Booking System

## Overview

The Event Booking System is a web application built with Node.js, TypeScript, Express.js, and MongoDB. It provides functionality for managing events and booking tickets. The system supports creating events, booking tickets with limits, and printing tickets.

## Features

- **Event Management**: Create and retrieve event details.
- **Booking Management**: Book tickets, check availability, and cancel bookings.
- **Ticket Printing**: Generate printable tickets in PDF format.
- **Booking Limits**: Users can book up to 15 tickets per request.

## API Endpoints

### Events

#### **POST /api/events**

- **Description**: Create a new event.
- **Request Body:**

  ```json
  {
    "name": "Music Concert",
    "date": "2024-09-15T19:00:00Z",
    "totalTickets": 100
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "_id": "64c5f6d4e8a84e30c8b5fcd0",
      "name": "Music Concert",
      "date": "2024-09-15T19:00:00.000Z",
      "totalTickets": 100,
      "bookedTickets": 0,
      "remainingTickets": 100,
      "__v": 0
    },
    "message": "Event created successfully"
  }
  ```

#### **GET /api/events**

- **Description**: Retrieve a list of events with available tickets.
- **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "64c5f6d4e8a84e30c8b5fcd0",
        "name": "Music Concert",
        "date": "2024-09-15T19:00:00.000Z",
        "totalTickets": 100,
        "bookedTickets": 0,
        "remainingTickets": 100
      }
    ],
    "message": "Events retrieved successfully"
  }
  ```

#### **GET /api/events/:id**

- **Description**: Retrieve details of a specific event, including booked and remaining tickets.
- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "_id": "64c5f6d4e8a84e30c8b5fcd0",
      "name": "Music Concert",
      "date": "2024-09-15T19:00:00.000Z",
      "totalTickets": 100,
      "bookedTickets": 0,
      "remainingTickets": 100
    },
    "message": "Event retrieved successfully"
  }
  ```

### Bookings

#### **POST /api/bookings**

- **Description**: Book tickets for an event.
- **Request Body:**

  ```json
  {
    "userId": "64c5f6d4e8a84e30c8b5fcd1",
    "eventId": "64c5f6d4e8a84e30c8b5fcd0",
    "quantity": 5
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "data": {
      "_id": "64c5f6d4e8a84e30c8b5fcd2",
      "userId": "64c5f6d4e8a84e30c8b5fcd1",
      "eventId": "64c5f6d4e8a84e30c8b5fcd0",
      "quantity": 5,
      "timestamp": "2024-08-02T12:34:56.000Z",
      "__v": 0
    },
    "message": "Booking created successfully"
  }
  ```

#### **GET /api/bookings**

- **Description**: Retrieve all bookings for the authenticated user.
- **Response:**

  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "64c5f6d4e8a84e30c8b5fcd2",
        "userId": "64c5f6d4e8a84e30c8b5fcd1",
        "eventId": "64c5f6d4e8a84e30c8b5fcd0",
        "quantity": 5,
        "timestamp": "2024-08-02T12:34:56.000Z"
      }
    ],
    "message": "Bookings retrieved successfully"
  }
  ```

#### **DELETE /api/bookings/:id**

- **Description**: Cancel a booking by ID.
- **Response:**

  ```json
  {
    "success": true,
    "message": "Booking canceled"
  }
  ```

#### **POST /api/bookings/print-ticket**

- **Description**: Generate a printable ticket for a specific booking.
- **Request Body:**

  ```json
  {
    "bid": "64c5f6d4e8a84e30c8b5fcd2"
  }
  ```

- **Response:**

  The response will be a PDF file attachment of the ticket. You will receive a file download prompt or view the PDF depending on how your browser handles file downloads.

## Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB (local or remote)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/event-booking-system.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd event-booking-system
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file for environment variables:**

   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

5. **Build the project:**

   ```bash
   npm run build
   ```

6. **Start the application:**

   ```bash
   npm start
   ```

### Development

For development purposes, you can use the following command to run the application with live reloading:

```bash
npm run watch
```

### Deployment

Deploy your application to your preferred hosting platform (e.g., Vercel, Heroku, DigitalOcean). Ensure the `dist` directory is used for production.

## Live Demo

You can access the live version of the application [here](https://event-booking-system-pex8.onrender.com).**Please note that it may take around 10-20 seconds for the demo to spin up.**

## Contact

For any inquiries, please contact [your-email@example.com](mailto:mohansundar792002@gmail.com).

---

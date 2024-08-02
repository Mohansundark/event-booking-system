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

- **POST /api/events**
  - **Description**: Create a new event.
  - **Request Body**: `{ "name": "Event Name", "date": "Event Date", "totalTickets": Number }`
 

- **GET /api/events**
  - **Description**: Retrieve a list of events with available tickets.
 
- **GET /api/events/:id**
  - **Description**: Retrieve details of a specific event, including booked and remaining tickets.
 
### Bookings

- **POST /api/bookings**
  - **Description**: Book tickets for an event.
  - **Request Body**: `{ "userId": "User ID", "eventId": "Event ID", "quantity": Number }`


- **GET /api/bookings**
  - **Description**: Retrieve all bookings for the authenticated user.


- **DELETE /api/bookings/:id**
  - **Description**: Cancel a booking by ID.
 

- **POST /api/bookings/print-ticket**
  - **Description**: Generate a printable ticket for a specific booking.
  - **Request Body**: `{ "bid": "Booking ID" }`
  

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

You can access the live version of the application [here](https://event-booking-system-pex8.onrender.com).

## Contributing

Feel free to fork the repository, make changes, and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact [your-email@example.com](mailto:mohansundar792002@gmail.com).

---

Feel free to modify the placeholders (e.g., repository URL, email address) and any additional information to fit your needs.

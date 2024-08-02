"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const eventRoutes_1 = __importDefault(require("./routes/eventRoutes"));
const bookingRoutes_1 = __importDefault(require("./routes/bookingRoutes"));
const ResponseModel_1 = __importDefault(require("./middlewares/ResponseModel"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//log the requests
app.use((req, res, next) => {
    res.on('finish', () => {
        console.log(`${req.method} ${req.url} - ${req.ip} - ${req.headers['user-agent']} - ${res.statusCode} ${res.statusMessage}`);
    });
    next();
});
//routes for events related api
app.use('/api/events', eventRoutes_1.default);
//routes for booking related api
app.use('/api/bookings', bookingRoutes_1.default);
// Middleware for handling 404 errors
app.use((req, res, next) => {
    res.status(404).json(ResponseModel_1.default.error('Route Not found', 404));
    next();
});
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eventbooking')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
// Start the server
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

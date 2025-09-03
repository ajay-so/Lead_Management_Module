const express = require('express');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

// port number from env
const PORT = process.env.PORT ?? 5000;

// Connect Database
connectDB();

app.use(express.json({ extended: false }));

// middleware routes
app.use("/leads" , leadRoutes);

// Error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(PORT , () => 
    console.log(`App is listining on port ${PORT}`)
);

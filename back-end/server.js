const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/database');
const corsOptions = require('./config/corsOptions');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRoute = require('./routes/registerRoute')

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/register',registerRoute)

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

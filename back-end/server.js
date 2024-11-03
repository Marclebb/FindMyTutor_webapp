const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./config/database');
const corsOptions = require('./config/corsOptions');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const registerRoute = require('./routes/registerRoute')
const createpostRoutes = require('./routes/createpostRoutes')
const mainpageRoutes = require('./routes/mainpageRoutes')
const userpostsRoutes = require('./routes/userpostsRoutes')
const commentsRoutes = require('./routes/commentsRoutes')
const matchesRoutes = require('./routes/matchesRoutes') 
const deleteRoutes = require('./routes/deleteRoutes')
const ratingRoutes = require('./routes/ratingRoutes')

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.options('*', cors());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/register',registerRoute);
app.use('/createpost',createpostRoutes)
app.use('/mainpageroutes',mainpageRoutes)
app.use('/userpostsRoutes',userpostsRoutes)
app.use('/commentsRoutes', commentsRoutes)
app.use('/matchesRoutes', matchesRoutes)
app.use('/deleteRoutes',deleteRoutes)
app.use('/ratingRoutes',ratingRoutes)

/*const admin = require('firebase-admin');
const serviceAccount = require('./config/findmytutor-4dbeb-firebase-adminsdk-mc602-9c346aa1d7.json'); // Download this from Firebase Console

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
}); */


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
};

module.exports = corsOptions;
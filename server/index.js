import express from "express"
import cors from "cors"
import mobileRoutes from "./routes/mobiles.js"
import userRoutes from "./routes/users.js"


const app = express();
const PORT = 8081;


app.use(express.json({ limit: "30mb", extended: true}));
app.use(express.urlencoded({ limit: "30mb", extended: true}));
app.use( cors({
        origin: "http://localhost:3000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
    })
);


app.get("/", (req, res) =>{
    res.send("Welcome to Mobile App API!!");
});

app.use("/mobiles", mobileRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
});
import express from "express";
import cors from "cors";

// routes
import { router as routerUser } from "./routes/userRoutes";
import { router as routerBand} from "./routes/bandRoutes";
import { router as routerMessage} from "./routes/messageRoutes";

// express on const app
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/api/healthycat", (req, res) => {
  return res.send(
    `<body style="background-color: #51d1f6">
        <h1 style="text-align: center; color: #2a6478; margin:4rem">Hello Simón!</h1>
        <img src="https://http.cat/images/200.jpg" style="display: block; margin-left: auto; margin-right: auto; width: 50%;">
    </body>`
  );
});

app.use("/api/user", routerUser);
app.use("/api/band", routerBand);
app.use("/api/messages", routerMessage);


export default app;

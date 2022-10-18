require("dotenv-safe").config();
import express from "express";
import userRouter from "./routes/userRoute";

const app = express();
const PORT = process.env.USER_API_PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

app.get("/", (req, res) => res.send("Ok"));

app.listen(PORT, () => {
  console.log(`Server is listening on //localhost:${PORT}`);
});

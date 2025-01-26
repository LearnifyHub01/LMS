import { app } from "./app"
import connectDB from "./utils/ds";
require("dotenv").config();

app.listen(process.env.PORT, () => {
    console.log(`server is connected with port ${process.env.PORT}`);
    connectDB();
    console.log('db connected')
})
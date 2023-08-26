import express from 'express';
import cors from "cors";
import mysqlDb from "./mysqlDb";

const app = express();
const port = 8000;
app.use(express.static('public'));
app.use(cors());

app.use(express.json());

const run = async () => {
    await mysqlDb.init();
    app.listen(port, () => {
        console.log(`Server started on ${port} port!`);
    });
};

run().catch(e => console.error(e));
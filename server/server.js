import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import util from "util";

import connectDB from "./db/db.js";
import Asset from "./models/assetListSchema.js";

const app = express();
const port = process.env.PORT;

const urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.json());

dotenv.config();
connectDB();

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// @ POST handles data from the client
// @ Public
// @ Gets data from client and requests asset info from CoinGecko API

app.post("/api/asset", urlEncodedParser, (req, res) => {
  const data = req.body;

  const handleSendToDb = async (data) => {
    const call = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${data.asset}&vs_currencies=${data.currency}&include_last_updated_at=true`
    );

    const value =
      call.data[`${data.asset}`][`${data.currency}`] * data.quantity;

    Asset.create({
      asset: data.asset,
      value: Number(value),
      quantity: data.quantity,
      currency: data.currency,
      // updatedAt: call.data[`${data.asset}`]["last_updated_at"],
    })
      .then((r) => console.log(r))
      .then((x) => res.json(x));
  };

  handleSendToDb(data);
});

app.get("/api/get/asset", (req, res) => {
  console.log(Asset.find({}));
});

app.use("/", (req, res) => res.send("API is running..."));

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

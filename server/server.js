import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
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

app.post(
  "/api/asset",
  urlEncodedParser,
  // [
  //   check("valueValidation", "Amount must be higher than zero")
  //     .exists()
  //     .isLength({ min: 0.01 }),
  // ],
  (req, res) => {
    const data = req.body;
    // const valueValidation = data.quantity;
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   const errorArray = errors.array();
    //   res.render("index-error", { errorArray: errorArray[0].msg });

    // }

    const handleSendToDb = async (data) => {
      try {
        const call = await axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${data.asset}&vs_currencies=${data.currency}`
        );

        const value =
          call.data[`${data.asset}`][`${data.currency}`] * data.quantity;

        const apiData = await Asset.create({
          asset: data.asset,
          value: Number(value),
          quantity: data.quantity,
          currency: data.currency,
          // updatedAt: call.data[`${data.asset}`]["last_updated_at"],
        });

        res.status(201).json(apiData);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    };

    handleSendToDb(data);
  }
);

app.post("/api/asset/delete", urlEncodedParser, (req, res) => {
  const deleteFromDb = async () => {
    try {
      const assetId = Object.keys(req.body);
      const deleteAsset = await Asset.findByIdAndDelete(assetId);
      res.status(201).json(deleteAsset);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };
  deleteFromDb();
});

app.post("/api/asset/update", urlEncodedParser, (req, res) => {
  const assetEditData = req.body;

  const updateDb = async () => {
    try {
      const call = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${assetEditData.asset}&vs_currencies=${assetEditData.currency}`
      );

      const value =
        call.data[`${assetEditData.asset}`][`${assetEditData.currency}`] *
        assetEditData.quantity;

      const updateAsset = await Asset.findByIdAndUpdate(
        { _id: assetEditData.id },
        {
          asset: assetEditData.asset,
          currency: assetEditData.currency,
          quantity: assetEditData.quantity,
          value: value,
        }
      );

      res.status(201).json(updateAsset);
    } catch (error) {}
  };
  updateDb();
});

app.get("/api/asset", (req, res) => {
  const listDataFromDb = async () => {
    try {
      const data = await Asset.find({});
      res.status(200).json(data);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };
  listDataFromDb();
});

app.use("/", (req, res) => res.send("API is running..."));

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);

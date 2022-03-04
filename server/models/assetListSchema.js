import mongoose from "mongoose";

const assetListSchema = mongoose.Schema(
  {
    asset: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    updatedAt: {
      type: Number,
      required: false,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Asset = mongoose.model("Asset", assetListSchema);
export default Asset;

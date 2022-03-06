import React, { useState } from "react";
import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
import { Dialog } from "@reach/dialog";
import axios from "axios";

import "@reach/dialog/styles.css";

export const EditAssetDialog = ({ isOpen, onDismiss, assetData }) => {
  // const [asset, setAsset] = useState();
  // const [qty, setQty] = useState([]);
  // const [currency, setCurrency] = useState();
  // const [assetList, setAssetList] = useState([]);

  // const handleAddAsset = async (e) => {
  //   e.preventDefault();
  //   const data = await axios.get(
  //     `https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=${currency}&include_last_updated_at=true`
  //   );
  //   const value = await data.data[`${asset}`][`${currency}`];
  //   const date = await data.data[`${asset}`]["last_updated_at"];
  //   renderAddAsset(value, date);
  // };

  // const renderAddAsset = (value, date) => {
  //   const upperCaseAsset = asset.charAt(0).toUpperCase() + asset.slice(1);
  //   const list = [
  //     ...assetList,
  //     {
  //       asset: upperCaseAsset,
  //       currency: currency,
  //       value: value * qty,
  //       quantity: qty,
  //       updatedAt: date,
  //     },
  //   ];
  //   setAssetList(list);
  // };

  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss} aria-labelledby="label">
      <h4>Edit assets</h4>
    </Dialog>
  );
};

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
import { Dialog } from "@reach/dialog";

import "@reach/dialog/styles.css";
import { assetAdd } from "../redux/actions/assetActions";

export const EditAssetDialog = (props) => {
  const [editAsset, setEditAsset] = useState(props.asset);
  const [qty, setQty] = useState(props.quantity);
  const [currency, setCurrency] = useState(props.currency);
  // const [assetList, setAssetList] = useState([]);

  const dispatch = useDispatch();

  const handleAddAsset = async (e) => {
    // e.preventDefault();
    dispatch(assetAdd(editAsset, currency, qty));
  };

  return (
    <Dialog
      isOpen={props.isOpen}
      onDismiss={props.onDismiss}
      aria-labelledby="label"
    >
      <h4>Edit asset</h4>
      <Form onSubmit={handleAddAsset}>
        <Form.Label className="my-2">Edit asset</Form.Label>
        <FormSelect
          value={props.asset}
          onChange={(e) => setEditAsset(e.target.value)}
        >
          <option>Select asset</option>
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="dogecoin">Dogecoin (DOGE)</option>
        </FormSelect>
        <Form.Label className="my-2">Edit amount</Form.Label>
        <FormControl
          type="number"
          step="0.01"
          value={props.quantity}
          onChange={(e) => setQty(e.target.value)}
        />
        <Form.Label className="my-2">Edit currency</Form.Label>
        <FormSelect
          value={props.currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option>Select currency</option>
          <option value="usd">USD</option>
          <option value="brl">BRL</option>
        </FormSelect>
        <Button type="submit" className="my-2">
          Add
        </Button>
        <Button onClick={props.onDismiss} variant="danger" className="my-2">
          Cancel
        </Button>
      </Form>
    </Dialog>
  );
};

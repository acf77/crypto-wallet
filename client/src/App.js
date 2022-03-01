import React, { useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormSelect,
  Stack,
} from "react-bootstrap";
import axios from "axios";

import "bootswatch/dist/zephyr/bootstrap.min.css";

export const App = () => {
  const [asset, setAsset] = useState();
  const [currency, setCurrency] = useState();
  const [assetList, setAssetList] = useState([]);
  const [qty, setQty] = useState([]);

  const handleAddAsset = async (e) => {
    e.preventDefault();
    const data = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=${currency}&include_last_updated_at=true`
    );
    const value = await data.data[`${asset}`][`${currency}`];
    const date = await data.data[`${asset}`]["last_updated_at"];
    renderAddAsset(value, date);
  };

  const renderAddAsset = async (value, date) => {
    const upperCaseAsset = asset.charAt(0).toUpperCase() + asset.slice(1);
    const list = [
      ...assetList,
      {
        asset: upperCaseAsset,
        currency: currency,
        value: value * qty,
        quantity: qty,
        updatedAt: date,
      },
    ];
    setAssetList(list);
  };

  return (
    <Container>
      <h1>Starter Crypto Wallet</h1>
      <Form onSubmit={handleAddAsset}>
        <Form.Label className="my-2">Choose asset</Form.Label>
        <FormSelect onChange={(e) => setAsset(e.target.value)}>
          <option>Select asset</option>
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
          <option value="dogecoin">Dogecoin (DOGE)</option>
        </FormSelect>
        <Form.Label className="my-2">Amount</Form.Label>
        <FormControl
          type="number"
          step="0.01"
          onChange={(e) => setQty(e.target.value)}
        />
        <Form.Label className="my-2">Select currency</Form.Label>
        <FormSelect onChange={(e) => setCurrency(e.target.value)}>
          <option>Select currency</option>
          <option value="usd">USD</option>
          <option value="brl">BRL</option>
        </FormSelect>
        <Button type="submit" className="my-2">
          Add
        </Button>
      </Form>
      {assetList.map((a) => (
        <Card key={a.updatedAt + Math.random().toFixed(2)} className="p-3 my-3">
          <Stack direction="horizontal" gap={3}>
            <span> {a.quantity} un </span>
            <span>
              <i className={`fa-brands fa-${a.asset.toLowerCase()}`}></i>{" "}
              {a.asset}
            </span>
            <Stack direction="horizontal" gap={3} className="ms-auto">
              <span>
                {a.currency.toUpperCase()}{" "}
                {Intl.NumberFormat("en-us", {
                  maximumSignificantDigits: 3,
                }).format(a.value)}
              </span>
              <div className="vr" />
              <Button className="ms-auto">
                <i className="fa-solid fa-pen"></i>
              </Button>
            </Stack>
            {/* <span> {Date(a.updatedAt).toLocaleString("en-us")} </span> */}
          </Stack>
        </Card>
      ))}
      <Card className="p-2 my-3">
        <Stack direction="horizontal" gap={3}>
          <span>Total </span>
          <Stack direction="horizontal" gap={3} className="ms-auto">
            <span>
              🇧🇷 BRL{" "}
              {Intl.NumberFormat("en-us", {
                maximumSignificantDigits: 3,
              }).format(
                assetList
                  .filter((c) => c.currency === "brl")
                  .map((c) => c.value)
                  .reduce((acc, num) => acc + num, 0)
              )}
            </span>
            <span>
              🇺🇸 USD{" "}
              {Intl.NumberFormat("en-us", {
                maximumSignificantDigits: 3,
              }).format(
                assetList
                  .filter((c) => c.currency === "usd")
                  .map((c) => c.value)
                  .reduce((acc, num) => acc + num, 0)
              )}
            </span>
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

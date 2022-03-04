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
import { useDispatch, useSelector } from "react-redux";
import { assetAction } from "./redux/actions/assetActions";
import axios from "axios";

import "bootswatch/dist/zephyr/bootstrap.min.css";
import { AssetCard } from "./components/AssetCard";
import { totalBRL, totalUSD } from "./components/Totals";
import Loader from "./components/Loader";

export const App = () => {
  const [asset, setAsset] = useState();
  const [currency, setCurrency] = useState();
  const [assetList, setAssetList] = useState([]);
  const [qty, setQty] = useState([]);

  const dispatch = useDispatch();
  const assetFromRedux = useSelector((state) => state.asset);
  const { loading, error, assetData } = assetFromRedux;

  const handleAddAsset = async (e) => {
    e.preventDefault();
    dispatch(assetAction(asset, currency, qty, assetList));
    // setAssetList(assetData);
  };

  const renderAddAsset = async (assetData) => {
    const newList = [...assetList, assetData];
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
      {loading ? (
        <Loader />
      ) : (
        assetData &&
        assetData.map((asset) => <AssetCard key={Math.random()} {...asset} />)
      )}

      <Card className="p-2 my-3">
        <Stack direction="horizontal" gap={3}>
          <span>Total </span>
          <Stack direction="horizontal" gap={3} className="ms-auto">
            {/* {totalBRL(assetList) > 0 && (
              <span>
                🇧🇷 BRL{" "}
                {Intl.NumberFormat("en-us", {
                  maximumSignificantDigits: 3,
                }).format(totalBRL(assetList))}
              </span>
            )}
            {totalUSD(assetList) > 0 && (
              <span>
                🇺🇸 USD{" "}
                {Intl.NumberFormat("en-us", {
                  maximumSignificantDigits: 3,
                }).format(totalUSD(assetList))}
              </span>
            )} */}
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

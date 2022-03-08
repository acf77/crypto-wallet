import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Container,
  Form,
  FormControl,
  FormSelect,
  Stack,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import "bootswatch/dist/zephyr/bootstrap.min.css";
import { AssetCard } from "./components/AssetCard";
import { assetAdd, listAssets } from "./redux/actions/assetActions";
import { totalBRL, totalUSD } from "./components/Totals";
import Loader from "./components/Loader";

export const App = () => {
  const [asset, setAsset] = useState(null);
  const [currency, setCurrency] = useState(null);
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();
  const assetFromRedux = useSelector((state) => state.asset);
  const { loading, error, assetData } = assetFromRedux;

  const handleAddAsset = async () => {
    // e.preventDefault();
    dispatch(assetAdd(asset, currency, qty));
  };

  useEffect(() => {
    dispatch(listAssets());
  }, [dispatch]);

  return (
    <Container>
      <h1>Starter Crypto Wallet</h1>
      <Form onSubmit={handleAddAsset}>
        <Form.Label className="my-2">Choose asset</Form.Label>
        <FormSelect onChange={(e) => setAsset(e.target.value)}>
          <option value={null}>Select asset</option>
          <option value="bitcoin">Bitcoin (BTC)</option>
          <option value="ethereum">Ethereum (ETH)</option>
        </FormSelect>
        <Form.Label className="my-2">Amount</Form.Label>
        <FormControl
          type="number"
          step="0.01"
          onChange={(e) => setQty(e.target.value)}
        />
        <Form.Label className="my-2">Select currency</Form.Label>
        <FormSelect onChange={(e) => setCurrency(e.target.value)}>
          <option value={null}>Select currency</option>
          <option value="usd">USD</option>
          <option value="brl">BRL</option>
        </FormSelect>
        <Button disabled={qty === 0} type="submit" className="my-2">
          Add
        </Button>
      </Form>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert variant="danger">
          An error occurred. Please, reload the page.
        </Alert>
      ) : (
        assetData &&
        assetData
          .slice(0)
          .reverse()
          .map((asset) => <AssetCard key={asset._id} {...asset} />)
      )}

      <Card
        className="p-2 my-3"
        style={{ backgroundColor: "#2C4CC4", color: "#f7f7f7" }}
      >
        <Stack direction="horizontal" gap={3}>
          <Stack direction="horizontal" gap={3} className="ms-auto">
            <span>
              <strong>Total:</strong>
            </span>
            {assetData && (
              <span>
                🇧🇷 BRL{" "}
                {Intl.NumberFormat("en-us", {
                  maximumSignificantDigits: 3,
                }).format(totalBRL(assetData))}
              </span>
            )}
            {assetData && (
              <span>
                🇺🇸 USD{" "}
                {Intl.NumberFormat("en-us", {
                  maximumSignificantDigits: 3,
                }).format(totalUSD(assetData))}
              </span>
            )}
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
};

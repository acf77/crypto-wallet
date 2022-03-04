import React, { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";

import { EditAssetDialog } from "./EditDialog";
import { useDispatch } from "react-redux";
import { assetDelete } from "../redux/actions/assetActions";

export const AssetCard = (asset) => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const assetUpperCase =
    asset.asset.charAt(0).toUpperCase() + asset.asset.slice(1);

  const handleOpen = () => setIsModalOpen(true);
  const handleClose = () => setIsModalOpen(false);

  const handleDelete = () => {
    dispatch(assetDelete(asset));
  };

  return (
    <Card key={asset.updatedAt + Math.random().toFixed(2)} className="p-3 my-3">
      <Stack direction="horizontal" gap={3}>
        <span> {asset.quantity} un </span>
        <span>
          <i className={`fa-brands fa-${asset.asset.toLowerCase()}`}></i>{" "}
          {assetUpperCase}
        </span>
        <Stack direction="horizontal" gap={3} className="ms-auto">
          <span>
            {asset.currency.toUpperCase()}{" "}
            {Intl.NumberFormat("en-us", {
              maximumSignificantDigits: 3,
            }).format(asset.value)}
          </span>
          <div className="vr" />
          <Button onClick={handleOpen} className="ms-auto">
            <i className="fa-solid fa-pen"></i>
          </Button>
          <Button variant="danger" onClick={handleDelete} className="ms-auto">
            <i className="fa-solid fa-trash"></i>
          </Button>
        </Stack>
      </Stack>
      <EditAssetDialog isOpen={isModalOpen} onDismiss={handleClose} />
    </Card>
  );
};

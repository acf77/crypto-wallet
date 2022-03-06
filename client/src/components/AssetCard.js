import React, { useState } from "react";
import { Button, Card, Stack } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";

import { EditAssetDialog } from "./EditDialog";
import { useDispatch } from "react-redux";

import { assetDelete } from "../redux/actions/assetActions";
import { listAssets } from "../redux/actions/assetActions";
import "react-confirm-alert/src/react-confirm-alert.css";

export const AssetCard = (asset) => {
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditOpen = () => setIsEditModalOpen(true);
  const handleEditClose = () => setIsEditModalOpen(false);

  const assetUpperCase =
    asset.asset.charAt(0).toUpperCase() + asset.asset.slice(1);

  const handleDelete = () => {
    confirmAlert({
      title: "Delete asset",
      message: `Are you sure you want to delete ${asset.quantity} ${assetUpperCase}s from your wallet?`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            dispatch(assetDelete(asset._id));
            dispatch(listAssets());
          },
        },
        {
          label: "No",
          onClick: null,
        },
      ],
    });
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
          <Button onClick={handleEditOpen} className="ms-auto">
            <i className="fa-solid fa-pen"></i>
          </Button>
          <Button variant="danger" onClick={handleDelete} className="ms-auto">
            <i className="fa-solid fa-trash"></i>
          </Button>
        </Stack>
      </Stack>
      <EditAssetDialog
        isOpen={isEditModalOpen}
        onDismiss={handleEditClose}
        {...asset}
      />
    </Card>
  );
};

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Stack,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";

import { EditAssetDialog } from "./EditDialog";
import { useDispatch } from "react-redux";

import { assetDelete } from "../redux/actions/assetActions";
import { listAssets } from "../redux/actions/assetActions";
import Loader from "../components/Loader";
import "react-confirm-alert/src/react-confirm-alert.css";

export const AssetCard = (asset) => {
  const dispatch = useDispatch();

  const [currentAssetPrice, setCurrentAssetPrice] = useState(0);

  useEffect(() => {
    const callFromDb = async () => {
      const call = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${asset.asset}&vs_currencies=${asset.currency}&include_last_updated_at=true`
      );
      const callData = call.data;
      setCurrentAssetPrice(callData[`${asset.asset}`][`${asset.currency}`]);
    };
    callFromDb();
  }, [asset.asset, asset.currency]);

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
            dispatch(assetDelete(asset));
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

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Current asset price
    </Tooltip>
  );

  return (
    <Card key={asset.updatedAt} className="p-3 my-3">
      <Stack direction="horizontal" gap={3}>
        <span> {asset.quantity} un </span>
        <span>
          <i className={`fa-brands fa-${asset.asset.toLowerCase()}`}></i>{" "}
          {assetUpperCase}
        </span>
        <Stack direction="horizontal" gap={3} className="ms-auto">
          <strong>{asset.currency.toUpperCase()}</strong>
          {currentAssetPrice === 0 ? (
            <Loader />
          ) : (
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Alert variant="success" className="my-1">
                <strong>
                  {Intl.NumberFormat("en-us", {
                    maximumSignificantDigits: 6,
                  }).format(currentAssetPrice)}
                </strong>
              </Alert>
            </OverlayTrigger>
          )}
          <span>
            {Intl.NumberFormat("en-us", {
              maximumSignificantDigits: 6,
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

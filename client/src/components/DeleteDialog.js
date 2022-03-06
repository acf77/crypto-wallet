import React, { useState } from "react";
import { Button, Form, FormControl, FormSelect } from "react-bootstrap";
import { Dialog } from "@reach/dialog";

import "@reach/dialog/styles.css";

export const DeleteAssetDialog = ({ isOpen, onDismiss, assetData }) => {
  // const [asset, setAsset] = useState();

  return (
    <Dialog isOpen={isOpen} onDismiss={onDismiss} aria-labelledby="label">
      <h4>Delete assets</h4>
      <span variant="danger">Are you sure you want to delete {assetData}</span>
    </Dialog>
  );
};

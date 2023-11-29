"use client";

import { FC, useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const CreateTokenAccount: FC = () => {
  const [mint, setMint] = useState("");
  const [owner, setOwner] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const handleMintFieldChange = function () {};

  const handleOwnerFieldChange = function () {};

  const handleCreateTokenAccountButton = async function () {};

  return (
    <Card sx={{ flexGrow: 1, m: 2  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Create a New Token Account
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          id="mint"
          label="Mint"
          variant="outlined"
          onChange={handleMintFieldChange}
          value={mint}
        />
        <TextField
          fullWidth
          margin="normal"
          id="owner"
          label="Owner"
          variant="outlined"
          onChange={handleOwnerFieldChange}
          value={owner}
        />
        <Button onClick={handleCreateTokenAccountButton}>
          Create Token Account
        </Button>
        {tokenAccount && (
          <Typography variant="h5" component="div">
            {tokenAccount}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

"use client";

import { FC, useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const MintTokens: FC = () => {
  const [mint, setMint] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [transactionSignature, setTransactionSignature] = useState("");

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  const handleMintFieldChange = function () {};

  const handleRecipientFieldChange = function () {};
  const handleAmountFieldChange = function () {};

  const handleMintTokensButton = async function () {};

  return (
    <Card sx={{ flexGrow: 1, m: 2  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Mint Tokens
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
          id="recipient"
          label="Recipient"
          variant="outlined"
          onChange={handleRecipientFieldChange}
          value={recipient}
        />
        <TextField
          fullWidth
          margin="normal"
          id="amount"
          label="Amount"
          variant="outlined"
          onChange={handleAmountFieldChange}
          value={amount}
        />
        <Button onClick={handleMintTokensButton}>
          Mint Tokens
        </Button>
        {transactionSignature && (
          <Typography variant="h5" component="div">
            {transactionSignature}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

"use client";

import { FC, useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { PublicKey, Transaction } from "@solana/web3.js";
import {
  createMintToInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAccount,
} from "@solana/spl-token";

export const MintTokens: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [mint, setMint] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState(0);
  const [tokenAccount, setTokenAccount] = useState("");
  const [balance, setBalance] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    setRecipient(publicKey.toString());
  }, [connection, publicKey]);

  const handleMintFieldChange = function (event: any) {
    const { target } = event;
    setMint(target.value);
  };
  const handleRecipientFieldChange = function (event: any) {
    const { target } = event;
    setRecipient(target.value);
  };
  const handleAmountFieldChange = function (event: any) {
    const { target } = event;
    setAmount(target.value);
  };

  const handleMintTokensButton = async function () {
    if (!connection || !publicKey) {
      return;
    }

    const mintPubkey = new PublicKey(mint);
    const recipientPubKey = new PublicKey(recipient);

    const associatedTokenAddress = await getAssociatedTokenAddress(
      mintPubkey,
      recipientPubKey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const transaction = new Transaction().add(
      createMintToInstruction(
        mintPubkey,
        associatedTokenAddress,
        publicKey,
        amount
      )
    );

    sendTransaction(transaction, connection).then(async (sig) => {
      setTxSig(sig);
      setTokenAccount(associatedTokenAddress.toString());
      const account = await getAccount(connection, associatedTokenAddress)
      setBalance(account.amount.toString())
    });
  };

  return (
    <Card sx={{ flexGrow: 1, m: 2 }}>
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
        <Button onClick={handleMintTokensButton}>Mint Tokens</Button>

        {txSig && (
          <>
            <Typography>Token Account: {tokenAccount}</Typography>
            <Typography>Token Account Balance: {balance}</Typography>
            <Typography>View your transaction on</Typography>
            <Typography>
              <Link href={link()}>Solana Explorer</Link>
            </Typography>
          </>
        )}
      </CardContent>
    </Card>
  );
};

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
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
} from "@solana/spl-token";

export const CreateTokenAccount: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [mint, setMint] = useState("");
  const [owner, setOwner] = useState("");
  const [tokenAccount, setTokenAccount] = useState("");

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

    setOwner(publicKey.toString());
  }, [connection, publicKey]);

  const handleMintFieldChange = function (event: any) {
    const { target } = event;
    setMint(target.value);
  };

  const handleOwnerFieldChange = function (event: any) {
    const { target } = event;
    setOwner(target.value);
  };

  const handleCreateTokenAccountButton = async function () {
    if (!connection || !publicKey) {
      return;
    }

    const mintPubkey = new PublicKey(mint);
    const ownerPubkey = new PublicKey(owner);

    const associatedTokenAddress = await getAssociatedTokenAddress(
      mintPubkey,
      ownerPubkey,
      false,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    const transaction = new Transaction().add(
      createAssociatedTokenAccountInstruction(
        publicKey,
        associatedTokenAddress,
        ownerPubkey,
        mintPubkey,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      )
    );

    sendTransaction(transaction, connection).then((sig) => {
      setTxSig(sig);
      setTokenAccount(associatedTokenAddress.toString());
    });
  };

  return (
    <Card sx={{ flexGrow: 1, m: 2 }}>
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
        {publicKey && !txSig ? (
          <Button onClick={handleCreateTokenAccountButton}>
            Create Token Account
          </Button>
        ) : publicKey && txSig ? null : (
          <Typography>Connect Your Wallet</Typography>
        )}

        {txSig && (
          <>
            <Typography>Token Account: {tokenAccount}</Typography>
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

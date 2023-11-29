"use client";

import { FC, useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Transaction, SystemProgram, Keypair } from "@solana/web3.js";
import {
  getMinimumBalanceForRentExemptMint,
  TOKEN_PROGRAM_ID,
  createInitializeMintInstruction,
  MINT_SIZE,
} from "@solana/spl-token";

export const CreateMint: FC = () => {
  const [txSig, setTxSig] = useState("");
  const [mint, setMint] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const link = () => {
    return txSig
      ? `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
      : "";
  };

  const handleCreateNewMintButton = async function (event: any) {
    event.preventDefault();
    if (!connection || !publicKey) {
      return;
    }

    const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mint = Keypair.generate();
    const programId = TOKEN_PROGRAM_ID;
    const decimals = 2;

    const transaction = new Transaction();

    const createAccountInstruction = SystemProgram.createAccount({
      fromPubkey: publicKey,
      newAccountPubkey: mint.publicKey,
      space: MINT_SIZE,
      lamports,
      programId,
    });

    const mintInstruction = createInitializeMintInstruction(
      mint.publicKey,
      decimals,
      publicKey,
      publicKey,
      programId
    );

    transaction.add(createAccountInstruction, mintInstruction);

    sendTransaction(transaction, connection, {
      signers: [mint],
    }).then((sig) => {
      setTxSig(sig);
      setMint(mint.publicKey.toString());
    });
  };

  return (
    <Card sx={{ flexGrow: 1, m: 2 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Create a New Token Mint
        </Typography>
        {publicKey && !txSig ? (
          <Button onClick={handleCreateNewMintButton}>Create Mint</Button>
        ) : publicKey && txSig ? null : (
          <Typography>Connect Your Wallet</Typography>
        )}
        {txSig && (
          <>
            <Typography>Mint: {mint}</Typography>
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

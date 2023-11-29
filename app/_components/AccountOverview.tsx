"use client";

import { FC, useEffect, useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export const AccountOverview: FC = () => {
  const [balance, setBalance] = useState(0);

  const { connection } = useConnection();
  const { publicKey } = useWallet();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updatedAccountInfo) => {
        setBalance(updatedAccountInfo.lamports);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      if (!info) {
        return;
      }
      setBalance(info?.lamports);
    });
  }, [connection, publicKey]);

  return (
    <Card sx={{ flexGrow: 1, m: 2  }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Balance:
        </Typography>
        <Typography>
          {publicKey ? `${balance / LAMPORTS_PER_SOL} SOL` : ""}
        </Typography>
      </CardContent>
    </Card>
  );
};

import { AccountOverview } from "./_components/AccountOverview";
import { CreateMint } from "./_components/CreateMint";
import { CreateTokenAccount } from "./_components/CreateTokenAccount";
import { MintTokens } from "./_components/MintTokens";
import Box from "@mui/material/Box";

export default function Home() {
  return (
    <Box>
      <Box sx={{ display: "flex", m: 2 }}>
        <AccountOverview />
        <CreateMint />
      </Box>
      <Box sx={{ display: "flex", m: 2 }}>
        <CreateTokenAccount />
        <MintTokens />
      </Box>
    </Box>
  );
}

import React from "react";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { Contract, ethers } from "ethers";

import abi from "../ABI/abi.json";

const TokenAddress = "0xEC520AF7c246026327467070b029b29a59922C9F";

const Mint = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [amount, setAmount] = React.useState(0);
  const [balance, setBalance] = React.useState(0);
  const [userAddress, setUserAddress] = React.useState("");

  async function mint() {
    if (!isConnected) throw Error("User disconnected");

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const TokenContract = new Contract(TokenAddress, abi, signer);
    try {
      const tx = await TokenContract.mint(
        "0x34eE58595153f76A4454Fd0d8db665bDced331F5",
        amount
      );
      await tx.wait();
      toast.success("Tokens Minted");
    } catch (error) {
      toast.error(error.message);
    }
  }

  const getBalance = async () => {
    if (!isConnected) throw Error("User disconnected");
    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const TokenContract = new Contract(TokenAddress, abi, signer);
    const TokanBal = await TokenContract.balanceOf(address);

    // Convert the balance using formatEther (assuming 18 decimals)
    const formattedBalance = ethers.utils.formatEther(TokanBal);
    setBalance(formattedBalance); // Update state with formatted balance
    console.log("Balance:", formattedBalance); // Log formatted balance
  };

  return (
    <div>
      <h2>Mint Section</h2>
      <input
        placeholder="Amount"
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={mint}>Mint</button>

      <h2>Balance Section</h2>
      <input
        placeholder="Address"
        type="text"
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <button onClick={getBalance}>Get Balance</button>
      <p>Balance: {balance}</p>
    </div>
  );
};
export default Mint;

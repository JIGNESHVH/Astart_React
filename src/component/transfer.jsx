import React, { useState } from "react";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { Contract, ethers } from "ethers";
import { toast } from "react-toastify";
import abi from "../ABI/abi.json";

const TokenAddress = "0xEC520AF7c246026327467070b029b29a59922C9F";

const ContractOwner = "0x34eE58595153f76A4454Fd0d8db665bDced331F5";

const spenderAddress = "0xea2Fe42e772784807C33DF5FD7D25D7021244048";

const Transfer = () => {
  const { address, isConnected } = useAppKitAccount();
  const { walletProvider } = useAppKitProvider("eip155");
  const [amount, setAmount] = React.useState(0);

  const [recipientAddress, setRecipientAddress] = useState("");

  const transferTokens = async () => {
    if (!isConnected) throw Error("User disconnected");

    const ethersProvider = new ethers.providers.Web3Provider(walletProvider);
    const signer = await ethersProvider.getSigner();
    const TokenContract = new Contract(TokenAddress, abi, signer);

    try {
      const approveTx = await TokenContract.approve(spenderAddress, amount);
      await approveTx.wait();
    } catch (error) {
      console.error("Approve Error:", error);
    }

    try {
      const tx = await TokenContract.TransferToken(recipientAddress, amount);
      await tx.wait();
      toast.success(`Transferred ${amount} BTC to ${recipientAddress}`);
    } catch (error) {
      toast.error(`Transfer failed: " + ${error.data}`, {
        icon: false,
      });
    }
  };

  return (
    <div>
      <h2>Transfer Tokens</h2>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount to Transfer"
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={transferTokens}>Transfer Tokens</button>
    </div>
  );
};
export default Transfer;

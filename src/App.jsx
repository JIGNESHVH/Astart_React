import "./App.css";
import { createAppKit } from "@reown/appkit/react";
import { Ethers5Adapter } from "@reown/appkit-adapter-ethers5";
import { astarZkyoto, astarZkEVM } from "@reown/appkit/networks";
import Connect from "../src/walletConnect";
import Mint from "./component/mint";
import { ToastContainer } from "react-toastify";
function App() {
  const projectId = "458097e6aff495fbf19f2ba2fb4fc80c";

  const metadata = {
    name: "BTC",
    description: "My Website description",
    url: "https://mywebsite.com",
    icons: ["https://avatars.mywebsite.com/"],
  };

  // 3. Create the AppKit instance
  createAppKit({
    adapters: [new Ethers5Adapter()],
    metadata: metadata,
    networks: [astarZkyoto],
    projectId,
    features: {
      analytics: true,
    },
  });

  return (
    <>
      <Connect />
      <Mint />
      <ToastContainer />
    </>
  );
}

export default App;

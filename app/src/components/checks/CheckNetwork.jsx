import { useEffect, useState } from "react";

export default function CheckNetwork({ children }) {
  const [isCorrectChain, setIsCorrectChain] = useState(true);

  const polygonNetwork = {
    testNet: 80001,
    main: 137,
  };

  useEffect(() => {
    if (parseInt(window.ethereum.chainId) != polygonNetwork) {
      setIsCorrectChain(false);
      handleConnectToChain();
    }
  }, []);

  async function handleConnectToChain() {
    let hex = "0x" + polygonNetwork.testNet.toString(16);

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hex }],
      });
      setIsCorrectChain(true);
    } catch (e) {
      try {
        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: hex,
              chainName: "Mumbai Testnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18,
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
              rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            },
          ],
        });
        setIsCorrectChain(true);
      } catch (addError) {
        console.log(addError);
      }
      console.log(e);
    }
  }

  if (!isCorrectChain) {
    return (
      <div className="w-full gap-3 flex-col min-h-screen flex items-center justify-center text-black">
        <h1 className="font-bold text-5xl">Wrong Network</h1>
        <p className="text-md">
          Please connect to
          <span
            onClick={handleConnectToChain}
            className="ml-1 cursor-pointer text-green-600 font-bold hover:text-xl transition-all"
          >
            Polygon Mumbai TestNet
          </span>
        </p>
      </div>
    );
  }

  return <>{children}</>;
}

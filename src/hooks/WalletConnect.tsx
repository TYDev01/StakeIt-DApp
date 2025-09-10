import React from 'react'
import { useEffect, useState } from 'react'
import {ethers} from 'ethers';
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface WalletProvider {
  info: {
    uuid: string;
    name: string;
    icon: string;
    rdns: string;
  };
  provider: any;
}

export const WalletConnect = () => {
  const [wallets, setWallets] = useState<WalletProvider[]>([]);
  // const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string>("")

  useEffect(()=>{
    const detected: WalletProvider[] = [];

    const handler = (event: any) => {
        const {info, provider} = event.detail;
        detected.push({ info, provider });
        setWallets([...detected]);
    }
    window.addEventListener("eip6963:announceProvider", handler);
    window.dispatchEvent(new Event("eip6963:requestProvider"));

    return ()=> {
        window.removeEventListener("eip6963:announceProvider", handler)
    }
  }, []);

  const connectWallet = async (provider: any) => {
    try{
      const browserProvider = new ethers.BrowserProvider(provider);
      const signer = await browserProvider.getSigner();
      const address = await signer.getAddress();
      setAddress(address);

    }catch (err){
    console.error("Error:", err)
  }
  }
  return (
    <div className="p-6">

      {address}
      <br />
      <Dialog>
        <DialogTrigger asChild>
          <Button>Connect Wallet</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select a Wallet</DialogTitle>
          </DialogHeader>

          {wallets.length === 0 ? (
            <p className="text-sm text-gray-500">No wallet detected</p>
          ) : (
            <ul className="space-y-3 mt-4">
              {wallets.map(({ info, provider }, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center border rounded-lg p-3"
                >
                  <span>
                    <strong>{info.name}</strong> <span>({info.rdns})</span>
                  </span>
                  <Button
                    size="sm"
                    onClick={() => connectWallet(provider)}
                  >
                    Connect
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}


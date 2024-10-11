"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight } from "lucide-react";
import {
  icon_discord,
  icon_google,
  icon_metamask_wallet,
  icon_telegram,
  icon_trust_wallet,
  icon_twitter,
  icon_wallet,
} from "@/icons";
import Image from "next/image";
import { Basenames } from "@/components/basename";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useWalletClient,
  useConnectors,
} from "wagmi";
import { baseSepolia } from "viem/chains";
import { useRouter } from "next/navigation";

const CreateAccount = () => {
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const connectors = useConnectors();
  const router = useRouter();

  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    // Disconnect on initial load
    if (!isInitialized) {
      disconnect();
      setIsInitialized(true);
    }
  }, [disconnect, isInitialized]);

  useEffect(() => {
    if (isConnected && address && hasAttemptedConnection) {
      router.push("/dashboard");
    }
  }, [isConnected, address, hasAttemptedConnection, router]);

  const handleConnect = () => {
    setHasAttemptedConnection(true);
    localStorage.setItem("hasConnected", "true");
    connect({ chainId: baseSepolia.id, connector: connectors[0] });
  };

  const handleDisconnect = () => {
    disconnect();
    localStorage.removeItem("hasConnected");
    setHasAttemptedConnection(false);
  };

  // Don't render until we've handled the initial disconnect
  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return (
    <div className="bg-white h-full flex flex-col p-8">
      <header className="flex items-center justify-between">
        <h3 className="font-medium text-lg">EnergyChain</h3>
        <div className="flex items-center gap-2">
          <span className="text-[#21250F] gap-2">Already have an account?</span>
          <Link href="#">
            <Button variant="secondary" className="text-[#766153]">
              Log in
            </Button>
          </Link>
        </div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center ">
        <div className="">
          <h3 className="text-[#21250F] text-2xl">Create an account</h3>
          <p className="mt-1 text-[#575757]">
            Join us in steering our climate to safety
          </p>
        </div>
        <div className="my-8">
          {isConnected ? (
            <div className="flex flex-col gap-4">
              <Basenames address={address} />
              <Button
                variant={"outline"}
                className="text-red-500"
                onClick={handleDisconnect}>
                Disconnect (for testing)
              </Button>
            </div>
          ) : (
            <Button
              variant={"outline"}
              className="flex items-center font-medium p-4 gap-4"
              onClick={handleConnect}>
              <span className="text-[16px]">Connect your wallet</span>
              <span className="flex items-center gap-2">
                <Image src={icon_wallet} alt="wallet icon" />
                <Image src={icon_trust_wallet} alt="trust wallet icon" />
                <Image src={icon_metamask_wallet} alt="metamask wallet icon" />
              </span>
            </Button>
          )}
        </div>
        <div className="w-full ">
          <p className="text-[#575757] text-sm">
            Link your onchain ID to an email address or social account
          </p>
          <div className="rounded-md border flex items-center gap-1 shadow-sm px-3 py-1.5 my-6">
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className="flex-1 outline-none shadow-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button className="bg-[#373D2040] hover:bg-[#373D20] text-white px-2 py-0.5">
              <ArrowRight className="" />
            </Button>
          </div>
          <div className="w-full flex items-center gap-1 text-[]">
            <div className="flex-1 h-[1px] bg-[#EFF1ED]" />
            <span className="text-[#808080]">or</span>
            <div className="flex-1 h-[1px] bg-[#EFF1ED]" />
          </div>
          <div className="flex items-center gap-6 justify-center my-6">
            <Button className="py-4" variant={"outline"}>
              <Image src={icon_google} alt="icon-google" />
            </Button>
            <Button className="py-4" variant={"outline"}>
              <Image src={icon_telegram} alt="icon-telegram" />
            </Button>
            <Button className="py-4" variant={"outline"}>
              <Image src={icon_discord} alt="icon-discord" />
            </Button>
            <Button className="py-4" variant={"outline"}>
              <Image src={icon_twitter} alt="icon-twitter" />
            </Button>
          </div>
        </div>
        <p className="text-[#575757] mt-6 text-sm">
          By continuing, you agree with our{" "}
          <Link href="#" className="text-[#CD5334]">
            Terms Of Use
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-[#CD5334]">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccount;

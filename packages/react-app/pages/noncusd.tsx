import Button from "@/components/Button";
import { useState } from "react";
import toast from "react-hot-toast";
import { parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";

export default function nonCUSD() {
    const publicClient = usePublicClient();
    const { isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();
    const [transferValue, setTransferValue] = useState("");
    const [receiver, setReceiver] = useState<string>("");

    async function sendCelo() {
        try {
            await walletClient?.sendTransaction({
                to: receiver as `0x${string}`,
                value: parseEther(transferValue),
            });
        } catch (e) {
            toast.error("Something went wrong!");
        }
    }

    return (
        <div className="w-screen flex flex-col justify-center items-center gap-y-4">
            <p>Send non-CUSD assets</p>
            {isConnected ? (
                <>
                    <input
                        className="text-[48px] bg-gypsum outline-none text-center"
                        type="number"
                        value={transferValue}
                        onChange={({ target }) =>
                            setTransferValue(target.value)
                        }
                        placeholder="0"
                    />
                    <p className="font-bold">Celo</p>
                    <div className="flex items-center gap-x-4">
                        <span>To:</span>
                        <input
                            value={receiver}
                            onChange={({ target }) => setReceiver(target.value)}
                            className="text-[16px] w-[250px] bg-gypsum border-b-2 outline-none"
                        />
                    </div>
                    <Button onClick={sendCelo} title="Send" />
                </>
            ) : (
                <p>Please connect wallet first</p>
            )}
        </div>
    );
}

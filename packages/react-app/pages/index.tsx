import { useState } from "react";
import { encodeFunctionData, parseEther, toHex } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import FederatedAttestationsAbi from "../abi/FederatedAttestation";
import stableTokenAbi from "../abi/StableToken";
import toast from "react-hot-toast";
import type { LookupResponse } from "./api/socialconnect/lookup";
import { FA_PROXY_ADDRESS, STABLE_TOKEN_ADDRESS } from "@/utils/constants";
import { celo, celoAlfajores } from "viem/chains";

const ISSUER_ADDRESS = "0xDF7d8B197EB130cF68809730b0D41999A830c4d7";

export default function Home() {
    const publicClient = usePublicClient();
    const { isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();
    const [resolvedReceiverAddress, setResolvedReceiverAddress] = useState("");
    const [identifier, setIdentifier] = useState("");
    const [transferValue, setTransferValue] = useState("");

    async function lookupAddress() {
        let response: Response = await fetch(
            `/api/socialconnect/lookup?${new URLSearchParams({
                handle: identifier,
            })}`,
            {
                method: "GET",
            }
        );

        let lookupResponse: LookupResponse = await response.json();

        if ("error" in lookupResponse) {
            toast.error(lookupResponse.error, { duration: 2000 });
            console.error(lookupResponse.error);
        } else {
            let { obfuscatedId } = lookupResponse;

            try {
                let resolvedAddress = (await publicClient.readContract({
                    address: FA_PROXY_ADDRESS,
                    abi: FederatedAttestationsAbi,
                    functionName: "lookupAttestations",
                    args: [obfuscatedId, [ISSUER_ADDRESS]],
                })) as string[][];

                setResolvedReceiverAddress(resolvedAddress[1][0]);
            } catch (error: any) {
                if ("message" in error) {
                    toast.error(error.message, { duration: 2000 });
                    console.error(error.message);
                }
            }
        }
    }

    async function sendCUSD() {
        // Refactor for window.ethereum can't use walletClient
        try {
            await walletClient?.sendTransaction({
                to: STABLE_TOKEN_ADDRESS,
                data: encodeFunctionData({
                    abi: stableTokenAbi,
                    functionName: "transfer",
                    args: [
                        resolvedReceiverAddress,
                        parseEther(`${Number(transferValue)}`),
                    ],
                }),
                chain:
                    process.env.NEXT_PUBLIC_ENVIRONMENT == "TESTNET"
                        ? celoAlfajores
                        : celo,
            });
        } catch (error: any) {
            toast.error(error.message, { duration: 2000 });
        }
    }

    // async function register() {
    //     if (walletClient) {
    //         try {
    //             let response = await fetch("/api/socialconnect/register", {
    //                 method: "POST",
    //                 body: JSON.stringify({
    //                     account: walletClient?.account.address,
    //                     identifier,
    //                 }),
    //             });

    //             let registerResponse = await response.json();

    //             if (registerResponse.error) {
    //                 toast.error("Something went wrong!");
    //                 console.error(registerResponse.error);
    //             }
    //         } catch (error: any) {
    //             toast.error(error.message);
    //             console.error(error.message);
    //         }
    //     }
    // }

    return (
        <div className="w-screen flex flex-col justify-center items-center gap-y-4">
            <p className="text-xl">Send cUSD to external users</p>
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
                    <p className="font-bold">cUSD</p>
                    <div className="flex items-center gap-x-4">
                        <span>To:</span>
                        <input
                            value={identifier}
                            onChange={({ target }) =>
                                setIdentifier(target.value)
                            }
                            className="text-[16px] w-[250px] bg-gypsum border-b-2 outline-none"
                        />
                    </div>
                    {resolvedReceiverAddress ? (
                        <div className="flex text-center flex-col gap-y-4 items-center">
                            <p>Resolved Address: {resolvedReceiverAddress}</p>
                            <button
                                onClick={sendCUSD}
                                className="rounded-md border border-black bg-prosperity px-3 py-1 text-base font-medium text-black shadow-sm"
                            >
                                Confirm
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                onClick={lookupAddress}
                                className="rounded-md border border-black bg-prosperity px-3 py-1 text-base font-medium text-black shadow-sm"
                            >
                                Send
                            </button>
                            {/* <button
                            onClick={register}
                            className="rounded-md border border-black bg-prosperity px-3 py-1 text-base font-medium text-black shadow-sm"
                        >
                            Register
                        </button> */}
                        </>
                    )}
                    <p className="text-center">
                        Issuer Address: {ISSUER_ADDRESS}
                    </p>
                </>
            ) : (
                <p>Please connect wallet first</p>
            )}
        </div>
    );
}

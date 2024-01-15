import { useState } from "react";
import { encodeFunctionData, isAddress, parseEther } from "viem";
import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import FederatedAttestationsAbi from "../abi/FederatedAttestation";
import stableTokenAbi from "../abi/StableToken";
import toast from "react-hot-toast";
import type { LookupResponse } from "./api/socialconnect/lookup";
import { FA_PROXY_ADDRESS, STABLE_TOKEN_ADDRESS } from "@/utils/constants";
import { celo, celoAlfajores } from "viem/chains";
import Button from "@/components/Button";

// const ISSUER_ADDRESS = "0xDF7d8B197EB130cF68809730b0D41999A830c4d7";
const ISSUER_ADDRESS = "0x7888612486844Bb9BE598668081c59A9f7367FBc";

export const E164_REGEX = /^\+[1-9][0-9]{1,14}$/;

export function validatePhoneNumber(phoneNumber: string): boolean {
    if (E164_REGEX.test(phoneNumber)) {
        return true;
    }
    return false;
}

export default function Home() {
    const publicClient = usePublicClient();
    const { isConnected } = useAccount();
    const { data: walletClient } = useWalletClient();

    const [resolvingAddress, setResolvingAddress] = useState(false);

    const [isValidAddress, setIsValidAddress] = useState(false);
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

    const [resolvedReceiverAddress, setResolvedReceiverAddress] = useState("");
    const [identifier, setIdentifier] = useState("");

    const [transferValue, setTransferValue] = useState("");

    async function lookupAddress() {
        setResolvingAddress(true);

        let resolvingToast = toast.loading("Looking up address", {
            duration: 6000,
        });

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
            toast.error(lookupResponse.error, {
                id: resolvingToast,
                duration: 2000,
            });

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

                if (resolvedAddress[1].length) {
                    toast.success("Address found", { id: resolvingToast });
                } else {
                    toast.error("No address found", { id: resolvingToast });
                }

                setResolvedReceiverAddress(resolvedAddress[1][0]);
            } catch (error: any) {
                if ("message" in error) {
                    toast.error(error.message, {
                        id: resolvingToast,
                        duration: 2000,
                    });
                    console.error(error.message);
                }
            } finally {
                setResolvingAddress(false);
            }
        }
    }

    async function sendCUSD() {
        // Refactor for window.ethereum can't use walletClient
        try {
            let hash = await walletClient?.sendTransaction({
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

            let txToast = toast.loading(
                "Transaction sent waiting for confirmation",
                {
                    duration: 6000,
                }
            );
            if (hash) {
                const transaction =
                    await publicClient.waitForTransactionReceipt({
                        hash,
                    });

                if (transaction.status === "success") {
                    toast.success("Transaction successful", {
                        id: txToast,
                        duration: 2000,
                    });
                } else {
                    toast.error("Something went wrong", {
                        id: txToast,
                        duration: 2000,
                    });
                }
            }
        } catch (error: any) {
            toast.error("Something went wrong", { duration: 2000 });
        }
    }

    async function handleIdentifierChange({ target }: any) {
        if (isAddress(target.value)) {
            setResolvedReceiverAddress(target.value);
            setIdentifier(target.value);
            setIsValidAddress(true);
            setIsValidPhoneNumber(false);
        } else {
            setIdentifier(target.value);
            setResolvedReceiverAddress("");
            setIsValidPhoneNumber(validatePhoneNumber(target.value));
            setIsValidAddress(false);
        }
    }

    return (
        <div className="w-screen flex flex-col justify-center items-center gap-y-4">
            <p className="text-xl">Send cUSD</p>
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
                            onChange={(e) => handleIdentifierChange(e)}
                            className="text-[16px] w-[250px] bg-gypsum border-b-2 outline-none"
                        />
                    </div>
                    <div className="flex text-center flex-col gap-y-4 items-center">
                        <p>Resolved Address: {resolvedReceiverAddress}</p>
                        <div className="flex gap-x-2">
                            <Button
                                onClick={lookupAddress}
                                disabled={
                                    isValidAddress ||
                                    !isValidPhoneNumber ||
                                    resolvingAddress
                                }
                                title="Find"
                            />
                            <Button
                                onClick={sendCUSD}
                                title="Confirm"
                                disabled={
                                    resolvedReceiverAddress.length === 0 ||
                                    transferValue.length === 0 ||
                                    Number(transferValue) == 0
                                }
                            />
                        </div>
                    </div>
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

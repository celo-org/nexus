import { useCallback } from "react";
import { encodeFunctionData, parseUnits } from "viem";
import { usePublicClient, useWalletClient } from "wagmi";
import toast from "react-hot-toast";
import stableTokenAbi from "../abi/StableToken";
import { celo, celoAlfajores } from "viem/chains";

export default function useSendErc20() {
  const { data: walletClient } = useWalletClient();

  const publicClient = usePublicClient();

  const sendErc20 = useCallback(
    async function (
      tokenAddress: `0x${string}`,
      receiverAddress: string,
      transferValue: string,
      tokenDecimals: number
    ) {
      let hash = await walletClient?.sendTransaction({
        to: tokenAddress,
        data: encodeFunctionData({
          abi: stableTokenAbi,
          functionName: "transfer",
          args: [
            receiverAddress,
            // Different tokens can have different decimals, cUSD (18), USDC (6)
            parseUnits(`${Number(transferValue)}`, tokenDecimals),
          ],
        }),
        // If the wallet is connected to a different network then you get an error.
        chain: celoAlfajores,
        // chain: celo,
      });
      console.log(tokenAddress);

      if (publicClient && hash) {
        let txToast = toast.loading(
          "Transaction sent waiting for confirmation",
          {
            duration: 6000,
          }
        );

        const transaction = await publicClient.waitForTransactionReceipt({
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
    },
    [walletClient]
  );

  return sendErc20;
}

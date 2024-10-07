import { useCallback } from "react";
import { encodeFunctionData, parseUnits } from "viem";
import { useWalletClient } from "wagmi";
import stableTokenAbi from "../abi/StableToken";
import { celo, celoAlfajores } from "viem/chains";
import { STABLE_TOKEN_ADDRESS, USDC_ADAPTER_ADDRESS } from "@/utils/constants";

export default function useSendErc20() {
  const { data: walletClient } = useWalletClient();

  const sendErc20 = useCallback(
    async function (
      tokenAddress: `0x${string}`,
      receiverAddress: string,
      transferValue: string,
      tokenDecimals: number
    ) {
      console.log("Transfer Value", transferValue);
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
      });

      if (hash) {
        return hash;
      }

      return null;
    },
    [walletClient]
  );

  return sendErc20;
}

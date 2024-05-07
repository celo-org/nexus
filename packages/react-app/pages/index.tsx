import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";
import toast from "react-hot-toast";
import { Button } from "@chakra-ui/react";
import useSendErc20 from "@/hooks/useSendErc20";
import { Address } from "viem";

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT as
  | "MAINNET"
  | "TESTNET";

const tokens: {
  42220: { [k: string]: { tokenAddress: Address; tokenDecimals: number } };
  44787: { [k: string]: { tokenAddress: Address; tokenDecimals: number } };
} = {
  42220: {
    cUSD: {
      tokenAddress: "0x765DE816845861e75A25fCA122bb6898B8B1282a",
      tokenDecimals: 18,
    },
    USDC: {
      tokenAddress: "0xcebA9300f2b948710d2653dD7B07f33A8B32118C",
      tokenDecimals: 6,
    },
    USDT: {
      tokenAddress: "0x48065fbbe25f71c9282ddf5e1cd6d6a887483d5e",
      tokenDecimals: 6,
    },
  },
  44787: {
    cUSD: {
      tokenAddress: "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1",
      tokenDecimals: 18,
    },
    USDC: {
      tokenAddress: "0x2F25deB3848C207fc8E0c34035B3Ba7fC157602B",
      tokenDecimals: 6,
    },
    // USDT: "",
  },
};

export const E164_REGEX = /^\+[1-9][0-9]{1,14}$/;

export function validatePhoneNumber(phoneNumber: string): boolean {
  if (E164_REGEX.test(phoneNumber)) {
    return true;
  }
  return false;
}

export default function Home() {
  const { isConnected } = useAccount();
  const sendErc20 = useSendErc20();
  const chainId = useChainId() as 42220 | 44787;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  async function sendToken({
    tokenAddress,
    tokenDecimals,
  }: {
    tokenAddress: Address;
    tokenDecimals: number;
  }) {
    try {
      await sendErc20(
        tokenAddress,
        "0x22ae7Cf4cD59773f058B685a7e6B7E0984C54966",
        "1",
        tokenDecimals
      );
    } catch (error: any) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  }

  return (
    <div className="w-screen flex flex-col justify-center items-center gap-y-4">
      {isConnected ? (
        <div className="flex flex-col md:flex-row text-center gap-4 items-center">
          <Button
            textColor={"white"}
            onClick={() => sendToken(tokens[chainId]["cUSD"])}
            bg={"#46CD85"}
            _hover={{ bg: "#46CD85" }}
            _active={{ bg: "#46CD85" }}
            leftIcon={
              <img
                className="h-[20px] w-[20px]"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/7236.png"
              />
            }
          >
            Send 1 cUSD
          </Button>
          <Button
            textColor={"white"}
            onClick={() => sendToken(tokens[chainId]["USDC"])}
            bg={"#2775CA"}
            _hover={{ bg: "#2775CA" }}
            _active={{ bg: "#2775CA" }}
            leftIcon={
              <img
                className="h-[20px] w-[20px]"
                src="https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png"
              />
            }
          >
            Send 1 USDC
          </Button>
          {chainId === 42220 && (
            <Button
              textColor={"white"}
              onClick={() => sendToken(tokens[chainId]["USDT"])}
              bg={"#009393"}
              _hover={{ bg: "#009393" }}
              _active={{ bg: "#009393" }}
              leftIcon={
                <img
                  className="h-[20px] w-[20px]"
                  src="https://s2.coinmarketcap.com/static/img/coins/64x64/825.png"
                />
              }
            >
              Send 1 USDT
            </Button>
          )}
        </div>
      ) : (
        <p>Please connect wallet first</p>
      )}
    </div>
  );
}

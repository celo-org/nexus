import { SocialConnectIssuer } from "@/utils/SocialConnect";
import { RPC } from "@/utils/constants";
import { IdentifierPrefix } from "@celo/identity/lib/odis/identifier";
import { AuthenticationMethod } from "@celo/identity/lib/odis/query";
import { Wallet, ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

export type RegisterResponse =
    | {
          receipt: string;
      }
    | {
          error: string;
      };

export default async function register(
    req: NextApiRequest,
    res: NextApiResponse<RegisterResponse>
) {
    switch (req.method) {
        case "POST":
            try {
                let { identifier, account } = JSON.parse(req.body);

                let wallet = new Wallet(
                    process.env.ISSUER_PRIVATE_KEY as string,
                    new ethers.providers.JsonRpcProvider(RPC)
                );

                const issuer = new SocialConnectIssuer(wallet, {
                    authenticationMethod: AuthenticationMethod.ENCRYPTION_KEY,
                    /**
                     * Recommended Authentication method to save ODIS Quota
                     *
                     * Steps to DEK here: https://github.com/celo-org/social-connect/blob/main/docs/key-setup.md
                     */
                    rawKey: process.env.DEK_PRIVATE_KEY as string,
                });

                /**
                 * This is Identifier Type, the SDK supports
                 *
                 * - DISCORD
                 * - TWITTER
                 * - EMAIL
                 * - FACEBOOK
                 * - SIGNAL
                 * - NULL
                 * - TELEGRAM
                 * - INSTAGRAM
                 * - PHONE_NUMBER
                 *
                 * But the value can be anything
                 *
                 * Read here: https://github.com/celo-org/social-connect/blob/main/docs/privacy.md#identifier-types-and-prefixes
                 * */

                const identifierType = IdentifierPrefix.PHONE_NUMBER;

                // Based on the type above the Identifier
                let registerResponse: string =
                    await issuer.registerOnChainIdentifier(
                        identifier,
                        identifierType,
                        account as string
                    );

                return res.status(200).json({ receipt: registerResponse });
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    error: "Something went wrong",
                });
            }

        default:
            return res.status(400).json({
                error: "Method not supported",
            });
    }
}

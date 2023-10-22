import type { NextApiRequest, NextApiResponse } from "next";
import { SocialConnectIssuer } from "@/utils/SocialConnect";
import { AuthenticationMethod } from "@celo/identity/lib/odis/query";
import { Wallet, ethers } from "ethers";
import { RPC } from "@/utils/constants";
import { IdentifierPrefix } from "@celo/identity/lib/odis/identifier";

export type LookupResponse =
    | {
          accounts: string[];
          obfuscatedId: string;
      }
    | {
          error: string;
      };

export default async function lookup(
    req: NextApiRequest,
    res: NextApiResponse<LookupResponse>
) {
    switch (req.method) {
        case "GET":
            try {
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
                const identifier = req.query.handle as string; // TODO typesafety

                // Addresses of Issuers under which to lookup
                /**
                 * In this example, we are looking up addresses under our own issuer.
                 * But SocialConnect allows looking up under other issuers just need their address.
                 */
                let issuerAddresses = [wallet.address];

                let lookupResponse: LookupResponse = await issuer.lookup(
                    identifier,
                    identifierType,
                    issuerAddresses
                );

                return res.status(200).json(lookupResponse);
            } catch (error) {
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

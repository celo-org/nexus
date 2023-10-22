const abi = [
    {
        inputs: [
            {
                internalType: "bool",
                name: "test",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "signer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "issuedOn",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "publishedOn",
                type: "uint64",
            },
        ],
        name: "AttestationRegistered",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                indexed: true,
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                indexed: false,
                internalType: "address",
                name: "signer",
                type: "address",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "issuedOn",
                type: "uint64",
            },
            {
                indexed: false,
                internalType: "uint64",
                name: "publishedOn",
                type: "uint64",
            },
        ],
        name: "AttestationRevoked",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "bytes32",
                name: "eip712DomainSeparator",
                type: "bytes32",
            },
        ],
        name: "EIP712DomainSeparatorSet",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "previousOwner",
                type: "address",
            },
            {
                indexed: true,
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "OwnershipTransferred",
        type: "event",
    },
    {
        constant: true,
        inputs: [],
        name: "EIP712_OWNERSHIP_ATTESTATION_TYPEHASH",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "MAX_ATTESTATIONS_PER_IDENTIFIER",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "MAX_IDENTIFIERS_PER_ADDRESS",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "addressToIdentifiers",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "eip712DomainSeparator",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "",
                type: "address",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        name: "identifierToAttestations",
        outputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "signer",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "issuedOn",
                type: "uint64",
            },
            {
                internalType: "uint64",
                name: "publishedOn",
                type: "uint64",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "initialized",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "isOwner",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "registryContract",
        outputs: [
            {
                internalType: "contract IRegistry",
                name: "",
                type: "address",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "renounceOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        name: "revokedAttestations",
        outputs: [
            {
                internalType: "bool",
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "newOwner",
                type: "address",
            },
        ],
        name: "transferOwnership",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [],
        name: "getVersionNumber",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
    {
        constant: false,
        inputs: [],
        name: "initialize",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "issuedOn",
                type: "uint64",
            },
        ],
        name: "registerAttestationAsIssuer",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "signer",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "issuedOn",
                type: "uint64",
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
            },
        ],
        name: "registerAttestation",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
        ],
        name: "revokeAttestation",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: false,
        inputs: [
            {
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                internalType: "bytes32[]",
                name: "identifiers",
                type: "bytes32[]",
            },
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
        ],
        name: "batchRevokeAttestations",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                internalType: "address[]",
                name: "trustedIssuers",
                type: "address[]",
            },
        ],
        name: "lookupAttestations",
        outputs: [
            {
                internalType: "uint256[]",
                name: "countsPerIssuer",
                type: "uint256[]",
            },
            {
                internalType: "address[]",
                name: "accounts",
                type: "address[]",
            },
            {
                internalType: "address[]",
                name: "signers",
                type: "address[]",
            },
            {
                internalType: "uint64[]",
                name: "issuedOns",
                type: "uint64[]",
            },
            {
                internalType: "uint64[]",
                name: "publishedOns",
                type: "uint64[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address[]",
                name: "trustedIssuers",
                type: "address[]",
            },
        ],
        name: "lookupIdentifiers",
        outputs: [
            {
                internalType: "uint256[]",
                name: "countsPerIssuer",
                type: "uint256[]",
            },
            {
                internalType: "bytes32[]",
                name: "identifiers",
                type: "bytes32[]",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "signer",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "issuedOn",
                type: "uint64",
            },
            {
                internalType: "uint8",
                name: "v",
                type: "uint8",
            },
            {
                internalType: "bytes32",
                name: "r",
                type: "bytes32",
            },
            {
                internalType: "bytes32",
                name: "s",
                type: "bytes32",
            },
        ],
        name: "validateAttestationSig",
        outputs: [],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
    {
        constant: true,
        inputs: [
            {
                internalType: "bytes32",
                name: "identifier",
                type: "bytes32",
            },
            {
                internalType: "address",
                name: "issuer",
                type: "address",
            },
            {
                internalType: "address",
                name: "account",
                type: "address",
            },
            {
                internalType: "address",
                name: "signer",
                type: "address",
            },
            {
                internalType: "uint64",
                name: "issuedOn",
                type: "uint64",
            },
        ],
        name: "getUniqueAttestationHash",
        outputs: [
            {
                internalType: "bytes32",
                name: "",
                type: "bytes32",
            },
        ],
        payable: false,
        stateMutability: "pure",
        type: "function",
    },
];

export default abi;

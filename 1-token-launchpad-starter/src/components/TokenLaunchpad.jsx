import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import {
    createInitializeMint2Instruction,
    getMinimumBalanceForRentExemptMint,
    MINT_SIZE,
    TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

export function TokenLaunchpad() {
    const { connection } = useConnection();
    const wallet = useWallet();
    // console.log({ wallet });
    // console.log({MINT_SIZE})//82

    const createToken = async () => {
        console.log("Creating Token");
        // const name = document.getElementById("name").value;
        // const symbol = document.getElementById("symbol").value;
        // const url = document.getElementById("url").value;
        // const amount = document.getElementById("amount").value;

        // console.log(name, url, symbol, amount);
        try {
            const mintKeypair = Keypair.generate();

            const lamports = await getMinimumBalanceForRentExemptMint(
                connection
            );

            console.log(mintKeypair.publicKey);

            const transaction = new Transaction().add(
                SystemProgram.createAccount({
                    fromPubkey: wallet.publicKey,
                    newAccountPubkey: mintKeypair.publicKey,
                    lamports,
                    programId: TOKEN_2022_PROGRAM_ID,
                    space: MINT_SIZE,
                }),
                createInitializeMint2Instruction(
                    mintKeypair.publicKey,
                    9,
                    wallet.publicKey,
                    wallet.publicKey,
                    TOKEN_2022_PROGRAM_ID
                )
            );

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (
                await connection.getLatestBlockhash()
            ).blockhash;
            transaction.partialSign(mintKeypair);

            const sentTransaction = await wallet.sendTransaction(
                transaction,
                connection
            );
            console.log({ sentTransaction });

            console.log(
                `Token mint created at ${mintKeypair.publicKey.toBase58()}`
            );
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <h1>Solana Token Launchpad</h1>
            <input
                className="inputText"
                type="text"
                placeholder="Name"
                id="name"
            ></input>{" "}
            <br />
            <input
                className="inputText"
                type="text"
                id="symbol"
                placeholder="Symbol"
            ></input>{" "}
            <br />
            <input
                className="inputText"
                id="url"
                type="text"
                placeholder="Image URL"
            ></input>{" "}
            <br />
            <input
                className="inputText"
                type="text"
                id="amount"
                placeholder="Initial Supply"
            ></input>{" "}
            <br />
            <button onClick={createToken} className="btn">
                Create a token
            </button>
        </div>
    );
}

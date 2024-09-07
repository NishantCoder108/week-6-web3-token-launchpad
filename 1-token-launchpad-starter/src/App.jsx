import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import "./App.css";
import { TokenLaunchpad } from "./components/TokenLaunchpad";
import {
    WalletDisconnectButton,
    WalletModalProvider,
    WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
function App() {
    const url = import.meta.env.VITE_RPC_URL;
    return (
        <div>
            <ConnectionProvider endpoint={url}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                padding: 20,
                            }}
                        >
                            <WalletMultiButton />
                            <WalletDisconnectButton />
                        </div>
                        <TokenLaunchpad></TokenLaunchpad>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
}

export default App;

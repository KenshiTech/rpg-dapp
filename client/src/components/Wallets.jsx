import { useEffect } from "react";
import styled from "styled-components";
import useEth from "../contexts/EthContext/useEth";
import { onboard } from "../lib/onboard";
import { Portal, Wallet } from "./icons";

const Button = styled.div`
  display: flex;
  font-size: 1em;
  border: none;
  align-items: center;
  justify-content: center;
  padding: 0.4em 1em;
  cursor: pointer;
  background: transparent;
  gap: 0.75em;
  align-self: flex-end;

  & svg {
    height: 1em;
  }

  & .address {
    width: 60px;
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
`;

export default function Wallets({ isMobile }) {
  const {
    state: { wallet },
    init,
    updateWallet,
    reset,
  } = useEth();

  const connect = async () => {
    if (wallet?.provider) {
      await onboard.disconnectWallet({ label: wallet.label });
      reset();
    } else {
      const [wallet] = await onboard.connectWallet();
      await onboard.setChain({ chainId: "0xa869" });
      init(wallet);
    }
  };

  useEffect(() => {
    const wallets = onboard.state.select("wallets");
    const { unsubscribe } = wallets.subscribe(([_wallet]) => updateWallet(_wallet));

    return () => {
      try {
        unsubscribe();
      } catch (error) {}
    };
  }, [updateWallet]);

  return (
    <Button onClick={connect}>
      {wallet?.provider ? (
        <>
          <Portal />
          {!isMobile && <span class="address">{wallet?.accounts?.[0]?.address || ""}</span>}
          {!isMobile && "Logout"}
        </>
      ) : (
        <>
          <Wallet />
          {!isMobile && "Connect"}
        </>
      )}
    </Button>
  );
}

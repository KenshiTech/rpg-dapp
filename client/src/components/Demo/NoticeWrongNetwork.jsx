function NoticeWrongNetwork() {
  return (
    <>
      <p>⚠️ MetaMask is not connected to the same network as the one you deployed to.</p>
      <p>
        Make sure you use{" "}
        <a href="https://docs.avax.network/quickstart/fuji-workflow" target="_blank" rel="noreferrer">
          Avalanche Fuji (C-Chain)
        </a>
        . Also, make sure you get some AVAX at{" "}
        <a href="https://faucet.avax.network/" target="_blank" rel="noreferrer">
          the faucet page.
        </a>
      </p>
    </>
  );
}

export default NoticeWrongNetwork;

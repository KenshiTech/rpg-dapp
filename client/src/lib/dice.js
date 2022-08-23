export const rollDice = async (contract, account) => {
  const sides = 20;
  console.log(`Rolling D${sides}...`);
  const callResult = await contract.methods.roll(sides).send({ from: account });
  const requestEvent = callResult.events?.Request;
  if (!requestEvent) {
    throw new Error("No request event.");
  }

  const requestId = requestEvent.returnValues.requestId;

  console.log("Request ID:", requestId);

  return requestId;
};

export const fetchEvent = async (requestId) => {
  const endpoint = "https://api.kenshi.io/index/graphql";
  const apiKey = process.env.REACT_APP_DEEP_INDEX_API_KEY;
  const owner = process.env.REACT_APP_OWNER;
  const contract = process.env.REACT_APP_CONTRACT_ADDRESS.toLowerCase();

  const query = `{
      getEntries(
        blockchain: "avalanche-fuji",
        apikey: "${apiKey}",
        owner: "${owner}",
        address: "${contract}",
        event: "Rolled"
      ) {
        event {
          args,
          name
        }
      }
    }`;

  const response = await fetch(endpoint, {
    method: "POST",
    body: JSON.stringify({ query }),
  });

  /**
   * Receive the data and print it
   */
  const { data, errors } = await response.json();
  if (errors) {
    throw errors[0];
  }
  if (data && Array.isArray(data.getEntries)) {
    const request = data.getEntries.find((e) =>
      e.event.args.some((a) => a[0] === "requestId" && parseInt(a[1], 16) === requestId)
    );
    if (request) {
      console.log(request.event);
      const arg = request.event.args.find((a) => a[0] === "result");
      if (arg) {
        return parseInt(arg[1], 16);
      }
    }
  }
  return null;
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const tryAgain = async (trials = 1, trialFunction = async () => true, delayMs = 5000) => {
  try {
    while (trials > 0) {
      console.log("Trying...");
      trials--;
      const result = await trialFunction();
      if (result) break;
      await delay(delayMs);
    }
  } catch (error) {
    console.error(error);
  }
};

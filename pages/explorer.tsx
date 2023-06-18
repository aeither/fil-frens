import type { NextPage } from "next";
import { useState } from "react";
import { useEnsName, useSigner } from "wagmi";
import { Database } from "@tableland/sdk";
import { ethers } from "ethers";
import { ethAddressFromDelegated } from "@glif/filecoin-address";

const Home: NextPage = () => {
  const [targetAddress, setTargetAddress] = useState();
  const [inputValue, setInputValue] = useState("");

  const ensName = useEnsName({
    address: "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e",
  });
  const { data: signer } = useSigner();

  const addDatabase = () => {
    if (!signer) return;

    const db = new Database({ signer });
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const getEthAddress = () => {
    const ethAddress = ethAddressFromDelegated(
      "f410f2oekwcmo2pueydmaq53eic2i62crtbeyuzx2gmy"
    );
    console.log(ethAddress.toString());
  };

  return (
    <div className="flex flex-row h-[calc(100vh-24px-32px-8px)] items-center justify-center">
      <div className="container">
        <div className="flex w-full h-full flex-col items-center gap-2">
          <h1 className="text-3xl font-bold underline">Hello world!</h1>
          {!ensName.isLoading && (
            <>
              <div>ENS name: {ensName.data}</div>
              <div>
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleChange}
                  className="input input-bordered w-full max-w-xs"
                />
                <p>Input value: {inputValue}</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const options = {
                    method: "GET",
                    headers: {
                      authorization: `Bearer ${process.env.NEXT_PUBLIC_BERYX_TOKEN}`,
                    },
                  };
                  console.log(
                    "🚀 ~ file: explorer.tsx:25 ~ onClick={ ~ options:",
                    options
                  );
                  //  0xFa038D5376fd1dcfC32F0A0803520d3C4C0AA294
                  // f410f7iby2u3w7uo47qzpbieaguqnhrgaviuu2xnskmq (xfiles.fil)
                  // f1trlskifqqifochzaax4fyxdpe43lnvjyaadu6cq get balance

                  fetch(
                    `https://api.zondax.ch/fil/data/v1/mainnet/account/balance/${inputValue}`,
                    options
                  )
                    .then((response) => response.json())
                    .then((response) => {
                      console.log(response);
                      const number = response.balances[0].value;
                      const formattedNumber = ethers.utils.formatUnits(
                        number,
                        18
                      );
                      console.log(
                        "🚀 ~ file: explorer.tsx:60 ~ .then ~ formattedNumber:",
                        formattedNumber
                      );
                    })
                    .catch((err) => console.error(err));
                }}
              >
                Get Balance
              </button>
              <button onClick={getEthAddress}>get address</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

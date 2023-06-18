import type { NextPage } from "next";
import { useState } from "react";
import { useEnsName, useSigner } from "wagmi";
import { Database } from "@tableland/sdk";
import { ethers } from "ethers";
import {
  ethAddressFromDelegated,
  newDelegatedEthAddress,
} from "@glif/filecoin-address";

// f410fudhxtcaw2s43tbtlkmyo5jdkda4c6ji6bmdo3yy ens

const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [ethAddress, setEthAddress] = useState("");

  const ensName = useEnsName({
    address: ethAddress as `0x${string}`,
  });
  const { data: signer } = useSigner();

  const addDatabase = () => {
    if (!signer) return;

    const db = new Database({ signer });
  };

  const handleChange = (e: any) => {
    if (e.target.value) {
      setInputValue(e.target.value);

      const _filAddress = getEthAddress(e.target.value);
      setEthAddress(_filAddress);
    }
  };

  const getFilAddress = () => {
    const filAddress = newDelegatedEthAddress(
      "0xA0Cf798816D4b9b9866b5330EEa46a18382f251e"
    );
    console.log(filAddress.toString());
    return filAddress.toString();
  };

  const getEthAddress = (address: string) => {
    const ethAddress = ethAddressFromDelegated(address);
    console.log(ethAddress.toString());
    return ethAddress.toString();
  };

  return (
    <div className="flex flex-row h-[calc(100vh-24px-32px-8px)] items-center justify-center">
      <div className="container">
        <div className="flex w-full h-full flex-col items-center gap-2">
          <h1 className="text-3xl font-bold underline">Find Fil Frens</h1>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              className="input input-bordered input-info w-full max-w-xs" 
              />
              <div>
            <p>Fil address: {inputValue}</p>
            <p>Eth address: {ethAddress}</p>
          </div>
          {!ensName.isLoading && (
            <>
              <div>ENS name: {ensName.data}</div>
              <button
                className="btn btn-primary"
                onClick={async () => {
                  const options = {
                    method: "GET",
                    headers: {
                      authorization: `Bearer ${process.env.NEXT_PUBLIC_BERYX_TOKEN}`,
                    },
                  };

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
                More Info
              </button>
              {/* <button onClick={getEthAddress}>get address</button>
              <button onClick={getFilAddress}>get getFilAddress</button> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

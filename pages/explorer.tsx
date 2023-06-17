import type { NextPage } from "next";
import { useState } from "react";
import { useEnsName, useSigner } from "wagmi";
import { Database } from "@tableland/sdk";

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

  return (
    <div>
      {!ensName.isLoading && (
        <>
          <div>ENS name: {ensName.data}</div>
          <div>
            <input type="text" value={inputValue} onChange={handleChange} />
            <p>Input value: {inputValue}</p>
          </div>
          <button
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

              fetch(
                "https://api.zondax.ch/fil/data/v1/mainnet/account/balance/f1trlskifqqifochzaax4fyxdpe43lnvjyaadu6cq",
                options
              )
                .then((response) => response.json())
                .then((response) => console.log(response))
                .catch((err) => console.error(err));
            }}
          >
            Get Balance
          </button>
        </>
      )}
    </div>
  );
};

export default Home;

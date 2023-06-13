import type { NextPage } from 'next'
import { useState } from 'react'
import { useEnsName } from 'wagmi'

const Home: NextPage = () => {
  const [targetAddress, setTargetAddress] = useState()
  const ensName = useEnsName({
    address: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  })

  return (
    <div>
      {!ensName.isLoading && (
        <>
          <div>ENS name: {ensName.data}</div>
          <button
            onClick={() => {
              const options = {
                method: 'GET',
                headers: {
                  authorization:
                    `Bearer ${process.env.NEXT_PUBLIC_BERYX_TOKEN}`,
                },
              }

              fetch(
                'https://api.zondax.ch/fil/data/v1/mainnet/account/balance/f1trlskifqqifochzaax4fyxdpe43lnvjyaadu6cq',
                options
              )
                .then((response) => response.json())
                .then((response) => console.log(response))
                .catch((err) => console.error(err))
            }}
          >
            Get Balance
          </button>
        </>
      )}
    </div>
  )
}

export default Home

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
          <div>{ensName.data}</div>
        </>
      )}
    </div>
  )
}

export default Home

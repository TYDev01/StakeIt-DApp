import { createPublicClient, http } from 'viem'
import { sepolia } from 'viem/chains'
 
export const publicClient = createPublicClient({ 
  chain: sepolia,
  transport: http(import.meta.env.VITE_TRANSPORT_URL)
})
//   const provider = new ethers.JsonRpcProvider('https://eth-sepolia.g.alchemy.com/v2/R8bgMnb8UJ2Q9SqNIt_U1');
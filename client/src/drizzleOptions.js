import Mining from "./contracts/Mining.json"

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    Mining
  ],
  events: {
    Mining: ['Refund']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions
import Mining from "./contracts/Mining.json";
export const options = { contracts: [Mining] };

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
    Mining: ['Refund','predictionMade']
  },
  polls: {
    accounts: 1500
  },
  syncAlways: true
}
export default drizzleOptions;
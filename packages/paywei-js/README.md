```ts
import { Paywei } from 'paywei-js'

const paywei = new Paywei({
  apiKey: 'xyz'
})

const product = await paywei.products.create({
  title: 'Product A',
  description: 'This produce is great',
  logoURL: 'https://paywei.link',
  network: 5,
  tokenAddress: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  amount: '1',
  recipientAddress: '0xBeE21365A462b8df12CFE9ab7C40f1BB5f5ED495',
  successURL: 'https://paywei.link/success'
})

const product = await paywei.products.get(id)

const txOptions = await paywei.products.pay(id)

// Submit transaction with programmatic account
const provider = new JsonRpcProvider(<your_rpc_url>)
const wallet = new Wallet(<your_private_key>).connect(provider);
const tx = await wallet.sendTransaction(txOptions);

// Or submit transaction with user's signer
const provider = new Web3Provider(window.ethereum)
const signer = provider.getSigner()
const tx = await wallet.sendTransaction(txOptions)
```

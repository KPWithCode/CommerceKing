import { ethers, Contract} from 'ethers';
// compilation artifact from truffle
import PaymentProcessor from './contracts/Payments.json';
import Dai from './contracts/Dai.json';


// Creates connection to ethereum
const getBlockchain = () => 
    new Promise((resolve, reject) => {
        window.addEventListener('load', async () => {
            if (window.ethereum) {
                await window.ethereum.enable()
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner()

                const paymentProcessor = new Contract(
                    PaymentProcessor.networks[window.ethereum.networkVersion].address,
                    PaymentProcessor.abi,
                    signer
                )
                const dai = new Contract(
                    Dai.networks[window.ethereum.networkVersion].address,
                    Dai.abi,
                    signer
                );
                // end of promise 
                resolve({provider, paymentProcessor, dai})
            }
            // if metamask is not installed
            resolve({provider: undefined, paymentProcessor: undefined, dai: undefined})
        })
    })

export default getBlockchain
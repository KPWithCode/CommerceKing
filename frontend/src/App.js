import React, { useState, useEffect} from 'react';
import getBlockchain from './eth';

function App() {
  const [paymentProcessor, setPaymentProcessor] = useState(undefined);
  const [dai, setDai] = useState(undefined);

  useEffect(async() => {
    const init = async () => {
      const { paymentProcessor,dai} = await getBlockchain();
      setPaymentProcessor(paymentProcessor);
      setDai(dai);
    }
    init();
  })
  // metamask not installed?
  if (typeof window.ethereum === 'undefined') {
    return (
      <div className='container'>
        <div className='col-sm-12'>
          <h1> Welcome to KCommerce</h1>
          <p>Install the latest version of metamask</p>
        </div>
      </div>
    )
  }
  return (
    <div className='container'>
        <div className='col-sm-12'>
          <h1> Welcome to KCommerce</h1>
          {/* <Store paymentProcessor={paymentProcessor} dai={dai} /> */}
        </div>
      </div>
  );
}

export default App;

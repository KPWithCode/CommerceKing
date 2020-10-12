import React from 'react';
import { ethers } from 'ethers';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

const ITEMS = [
    {
        id: 1,
        price: ethers.utils.parseEther('100')
    },
    {
        id: 2,
        price: ethers.utils.parseEther('200')
    },
    {
        id: 3,
        price: ethers.utils.parseEther('300')
    }
]

const Store = ({ paymentProcessor, dai }) => {
    const buy = async item => {
        const response1 = await axios.get(`${API_URL}/api/getPaymentId/${item.id}`)
        // approve payment processor to spend dai
        const tx1 = await dai.approve(paymentProcessor.address, item.price);
        await tx1.wait()

        const tx2 = await paymentProcessor.pay(item.price, response1.data.paymentId);
        await tx2.wait();

        // wait from backend to listen to payment event from the blockchain 
        // and update payment status in the database to avoid race condition
        // so we'll wait a couple seconds
        await new Promise(resolve => setTimeout(resolve, 5000));

        const response2 = await axios.get(`${API_URL}/api/getItemUrl/${response1.data.paymentId}`)
    }

    return (
        <ul className="list-group">
            <li className="list-group-item">
                Buy Item1 - <span className="font-weight-bold">100 DAI</span>
                <button type="button" className="btn btn-primary float-right" onClick={() => buy(ITEMS[0])}>BUY</button>
            </li>

            <li className="list-group-item">
                Buy Item2 - <span className="font-weight-bold">200 DAI</span>
                <button type="button" className="btn btn-primary float-right" onClick={() => buy(ITEMS[1])}>BUY</button>
            </li>

            <li className="list-group-item">
                Buy Item3 - <span className="font-weight-bold">300 DAI</span>
                <button type="button" className="btn btn-primary float-right" onClick={() => buy(ITEMS[2])}>BUY</button>
            </li>
        </ul>
    )
}

export default Store;
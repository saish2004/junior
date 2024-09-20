"use client"
import { useState } from 'react';

export const useKalpApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;

  const callApi = async (endpoint: string, args : { [key: string]: any }) => {
    setError(null);
    const params = {
      network: 'TESTNET',
      blockchain: 'KALP',
      walletAddress: '5e6cec94b86f1de60e3df78d90ef1366a780b30f',
      args: args,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey!,
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
      setLoading(false);
      return data;
    } catch (err : any) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  const claim = async (address : string) => {
    setLoading(true);
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/invoke/IbNjYRoffSZzfYRm1fS6yUdMV8Of2Axr1726824423797/Claim';
      
    const args = {
      amount: 100,
      address: address,
    };
    return callApi(endpoint, args);
  };

  const balanceOf = async (account : string) => {
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/IbNjYRoffSZzfYRm1fS6yUdMV8Of2Axr1726824423797/BalanceOf';
    const args = {
      account: account,
    };
    return callApi(endpoint, args);
  };

  const totalSupply = async () => {
    const endpoint =
      'https://gateway-api.kalp.studio/v1/contract/kalp/query/IbNjYRoffSZzfYRm1fS6yUdMV8Of2Axr1726824423797/TotalSupply';
    const args = {};
    return callApi(endpoint, args);
  };

  return { claim, balanceOf, totalSupply, loading, error };
};



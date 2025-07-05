// src/components/DebugComponent.tsx
'use client';

import { useState, useEffect } from 'react';

const DebugComponent = () => {
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        console.log('API Response:', data);
        setApiData(data);
      })
      .catch(err => {
        console.error('API Error:', err);
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <h3 className="text-red-800 font-bold">API Error:</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  if (!apiData) {
    return <div className="p-4">Loading API data...</div>;
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded mb-4">
      <h3 className="font-bold mb-2">Debug Info:</h3>
      <p><strong>Products count:</strong> {apiData.products?.length || 0}</p>
      {apiData.products?.[0] && (
        <div className="mt-2">
          <p><strong>First product name:</strong> {apiData.products[0].name}</p>
          <p><strong>First product images:</strong></p>
          <ul className="list-disc list-inside ml-4">
            <li>Yellow: {apiData.products[0].images?.yellow}</li>
            <li>Rose: {apiData.products[0].images?.rose}</li>
            <li>White: {apiData.products[0].images?.white}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DebugComponent;
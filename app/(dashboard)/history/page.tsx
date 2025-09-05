'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getHistory } from './lib/history';

const History = () => {
  const {
    data: history,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['history'],
    queryFn: () => {
      return getHistory();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div>
      History
      {history?.map((item) => (
        <div key={item.id}>
          <p>Station ID: {item.id}</p>
          <p>Last Visited: {Date.parse(item.updatedAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default History;

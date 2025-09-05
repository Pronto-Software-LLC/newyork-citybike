'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getHistory } from './lib/history';
import { HistStation } from './components/hist-station';

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
    <div className="p-4 rounded shadow">
      <div className="flex flex-col gap-6">
        {history?.map((station) =>
          station.id ? <HistStation key={station.id} station={station} /> : null
        )}
      </div>
    </div>
  );
};

export default History;

'use client';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getHistory } from './lib/history';
import { HistStation } from './components/hist-station';
import ClearAllHistory from './components/clear-all-history';

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

  if (history?.length === 0) {
    return (
      <div className="p-4 rounded shadow">
        No history, click on the map to add to history
      </div>
    );
  }

  return (
    <div className="p-4 rounded shadow">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-bold mb-4 ">History</h1>
        <ClearAllHistory />
      </div>
      <div className="flex flex-col gap-6">
        {history?.map((station) =>
          station.id ? <HistStation key={station.id} station={station} /> : null
        )}
      </div>
    </div>
  );
};

export default History;

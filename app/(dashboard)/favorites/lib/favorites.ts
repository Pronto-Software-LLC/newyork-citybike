'use server';

import { getUserIdFromSession } from '@/lib/session';

export async function addToFavorites(stationId: string) {
  console.log('🚀 ~ addToFavorites ~ stationId:', stationId);
  return new Promise((resolve) => setTimeout(resolve, 5));
}

export async function formToFavorites(name: string, stationId: string) {
  const userId = await getUserIdFromSession();
  console.log('🚀 ~ formToFavorites ~ name:', name, userId, stationId);
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return true;
}

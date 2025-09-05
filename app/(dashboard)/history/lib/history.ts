'use server';
import { getUserIdFromSession } from '@/lib/session';
import { getXataClient } from '@/lib/xata';

const client = getXataClient();

export async function getHistory() {
  const userId = await getUserIdFromSession();
  if (userId === null) {
    throw new Error('User ID is null');
  }
  const history = await client.db.history
    .select(['station_id', 'xata.updatedAt'])
    .filter('user.id', userId)
    .sort('xata.updatedAt', 'desc')
    .getMany();
  return history.map((hist) => {
    console.log('🚀 ~ getHistory ~ hist:', hist);
    return {
      id: hist.station_id,
      updatedAt: hist.xata.updatedAt.toString(),
    };
  });
}

export async function addToHistory(stationId: string) {
  try {
    const userId = await getUserIdFromSession();
    if (userId === null) {
      throw new Error('User ID is null');
    }
    const existing = await client.db.history
      .select(['station_id', 'xata.updatedAt'])
      .filter('user.id', userId)
      .filter('station_id', stationId)
      .getFirst();
    if (existing) {
      //update existing id with current UpdatedAt
      await client.db.history.update(existing.id, {
        station_id: stationId,
      });
    } else {
      await client.db.history.create({
        station_id: stationId,
        user: { id: userId },
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log('add history done');
    return await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

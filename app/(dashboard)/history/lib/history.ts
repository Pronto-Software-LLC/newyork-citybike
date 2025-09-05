'use server';
import { getRedis } from '@/lib/redis';
import { getUserIdFromSession } from '@/lib/session';
import { getXataClient } from '@/lib/xata';

const client = getXataClient();

export async function getHistory() {
  const userId = await getUserIdFromSession();
  const redis = await getRedis();
  if (userId === null) {
    throw new Error('User ID is null');
  }
  const history = await client.db.history
    .select(['station_id', 'xata.updatedAt'])
    .filter('user.id', userId)
    .sort('xata.updatedAt', 'desc')
    .getMany();

  const res = history.map(async (hist) => {
    const stationJson = await redis.hget(
      'locationsdetail',
      hist['station_id'] as string
    );
    const station =
      typeof stationJson === 'string' ? JSON.parse(stationJson) : stationJson;

    const stationStatusJson = await redis.hget(
      'station_status',
      hist['station_id'] as string
    );
    const stationStatus =
      typeof stationStatusJson === 'string'
        ? JSON.parse(stationStatusJson)
        : stationStatusJson;

    return {
      id: hist.station_id,
      updatedAt: hist.xata.updatedAt.toString(),
      ...station,
      ...stationStatus,
      coordinates: { lat: station.lat, lon: station.lon },
      bikes:
        stationStatus.num_bikes_available - stationStatus.num_ebikes_available,
      ebikes: stationStatus.num_ebikes_available,
      orig_name: station.name,
    };
  });
  return await Promise.all(res);
}

export async function addToHistory(stationId: string) {
  try {
    const userId = await getUserIdFromSession();
    if (userId === null) {
      throw new Error('User ID is null');
    }
    const favorite = await client.db.saved_locations
      .select(['station_id'])
      .filter('user.id', userId)
      .filter('station_id', stationId)
      .getFirst();
    if (favorite) {
      //don't add to history if it's in favorites
      return;
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
    return await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

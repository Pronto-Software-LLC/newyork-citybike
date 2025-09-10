'use server';
import { getRedis } from '@/lib/redis';
import { getUserIdFromSession } from '@/lib/session';
import { getXataClient } from '@/lib/xata';
import { HistStationType } from '@/types';

const client = getXataClient();

export async function getHistory(): Promise<HistStationType[]> {
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
      id: hist.station_id as string,
      name: station.name as string,
      orig_name: station.name as string,
      coordinates: { lat: station.lat as number, lon: station.lon as number },
      num_docks_available: stationStatus.num_docks_available as number,
      bikes: ((stationStatus.num_bikes_available as number) -
        stationStatus.num_ebikes_available) as number,
      ebikes: stationStatus.num_ebikes_available as number,
      updatedAt: hist.xata.updatedAt.getTime(),
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
    return await new Promise((resolve) => setTimeout(resolve, 5));
  }
}

export async function clearHistory() {
  const userId = await getUserIdFromSession();
  if (userId === null) {
    throw new Error('User ID is null');
  }
  //get all record ids first for the user
  const records = await client.db.history
    .select(['id'])
    .filter('user.id', userId)
    .getMany();
  if (records.length === 0) {
    return;
  }
  const recordIds = records.map((record) => record.id);
  //then delete by record ids
  await client.db.history.delete(recordIds);
}

export async function removeFromHistory(stationId: string) {
  const userId = await getUserIdFromSession();
  if (userId === null) {
    throw new Error('User ID is null');
  }
  //get the record id first
  const record = await client.db.history
    .select(['id'])
    .filter('user.id', userId)
    .filter('station_id', stationId)
    .getFirst();
  if (!record) {
    throw new Error('Record not found');
  }
  //then delete by record id
  await client.db.history.delete(record.id);
}

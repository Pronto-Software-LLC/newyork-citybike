'use server';

import { getUserIdFromSession } from '@/lib/session';
import { getXataClient } from '@/lib/xata';

const client = getXataClient();

export async function getFavorites() {
  const userId = await getUserIdFromSession();
  if (userId === null) {
    throw new Error('User ID is null');
  }
  const favorites = await client.db.saved_locations
    .select(['station_id', 'nickname'])
    .filter('user.id', userId)
    .getMany();
  return favorites.map((fav) => ({
    id: fav['station_id'],
    name: fav['nickname'],
  }));
}

export async function removeFromFavorites(stationId: string) {
  try {
    const userId = await getUserIdFromSession();
    if (userId === null) {
      throw new Error('User ID is null');
    }
    const existing = await client.db.saved_locations
      .select(['station_id'])
      .filter('user.id', userId)
      .filter('station_id', stationId)
      .getFirst();
    if (existing) {
      await client.db.saved_locations.delete(existing.id);
    }
  } catch (err) {
    console.error(err);
  } finally {
    console.log('removed');
    return await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

export async function formToFavorites(name: string, stationId: string) {
  try {
    const userId = await getUserIdFromSession();
    if (userId === null) {
      throw new Error('User ID is null');
    }

    const existing = await client.db.saved_locations
      .select(['station_id'])
      .filter('user.id', userId)
      .filter('station_id', stationId)
      .getFirst();

    if (existing) {
      //update existing id
      await client.db.saved_locations.update(existing.id, {
        nickname: name,
      });
    } else {
      //create new
      await client.db.saved_locations.create({
        user: {
          id: userId,
        },
        station_id: stationId,
        nickname: name,
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    return await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

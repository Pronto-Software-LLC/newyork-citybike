'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { formToFavorites } from '../../favorites/lib/favorites';
import { useQueryClient } from '@tanstack/react-query';
import { StationTypeProps } from '@/types';

export function SaveToFavorites({ station }: StationTypeProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;

      // simulate API call
      const result = await formToFavorites(name, station.id);
      console.log('Submitted:', name, result);

      // ✅ Close the dialog after success
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);

      // ✅ Refetch the query
      await queryClient.refetchQueries({
        queryKey: ['favorites'],
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <Star />
          add to favorites
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add to favorites</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Give a name to your favorite station
        </DialogDescription>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            defaultValue={station.name}
            className="w-full rounded-md border px-3 py-2"
            required
          />

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

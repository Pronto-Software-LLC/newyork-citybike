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
import {
  formToFavorites,
  // getFavorites,
  removeFromFavorites,
} from '../../favorites/lib/favorites';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface LiveStationsProps {
  station: {
    id: string;
    name: string;
  };
}

export function RemoveFromFavorites({ station }: LiveStationsProps) {
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
  const removeFavMutation = useMutation({
    mutationFn: async () => {
      return removeFromFavorites(station.id);
    },
    onSuccess: async () => {
      await queryClient.refetchQueries({
        queryKey: ['favorites'],
      });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setOpen(true)}>
          <Star fill="currentColor" />
          remove from favorites...
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit your name</DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
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
            <Button
              variant={'destructive'}
              disabled={removeFavMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                removeFavMutation.mutate();
              }}>
              {removeFavMutation.isPending ? 'removing...' : 'remove favorite'}
            </Button>
            <Button>reset</Button>{' '}
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

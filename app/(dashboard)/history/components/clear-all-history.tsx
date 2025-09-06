import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useQueryClient } from '@tanstack/react-query';
import { Delete, Trash } from 'lucide-react';
import React, { useState } from 'react';
import { clearHistory } from '../lib/history';

const ClearAllHistory = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await clearHistory();
      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      await queryClient.refetchQueries({
        queryKey: ['history'],
      });
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" onClick={() => setOpen(true)}>
            <Trash />
            Clear all history
            <Delete />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Clear all history</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure you want to clear all history? This action cannot be
            undone.
          </DialogDescription>
          <form onSubmit={handleSubmit} className="space-y-4">
            <DialogFooter>
              <Button type="submit" disabled={loading} variant="destructive">
                {loading ? 'Deleting...' : 'Delete'}
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
    </div>
  );
};

export default ClearAllHistory;

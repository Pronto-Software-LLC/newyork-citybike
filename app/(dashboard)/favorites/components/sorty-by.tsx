import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function SortBy() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Distance</SelectLabel>
          <SelectItem value="dist-asc">close to far</SelectItem>
          <SelectItem value="dist-desc">far to close</SelectItem>
          <SelectLabel>Date added</SelectLabel>
          <SelectItem value="date-asc">New to old</SelectItem>
          <SelectItem value="date-desc">Old to new</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

import { Button } from '@/components/ui/button';
import {
  Card,
  // CardAction,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Send } from 'lucide-react';
import { loadSettings, saveSettings } from './lib/save-settings';

export default async function Settings() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <h1>Settings</h1>
      <Card className="">
        <CardHeader>
          <CardTitle>Maps to use</CardTitle>
          <CardDescription className="items-middle">
            Choose which maps you want to use when pressing the{' '}
            <Button variant="secondary">
              <Send /> Map
            </Button>{' '}
            button
          </CardDescription>
          {/*   <CardAction>
            <Button variant="link">Sign Up</Button>
          </CardAction> */}
        </CardHeader>
        <div className="flex flex-col gap-6">
          <CardContent>
            <div className="flex flex-col gap-6">
              <Select
                onValueChange={saveSettings}
                defaultValue={(await loadSettings()) ?? undefined}>
                <SelectTrigger className="flex items-center w-auto">
                  <SelectValue placeholder="Maps to use" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple Maps</SelectItem>
                  <SelectItem value="google">Google Maps</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          {/* <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Save
              </Button>
            </CardFooter> */}
        </div>
      </Card>
    </div>
  );
}

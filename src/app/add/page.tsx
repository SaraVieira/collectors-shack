"use client";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Conditions, Consoles, Region } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { addGameSchema } from "~/lib/schemas";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "~/components/ui/calendar";
import { format } from "date-fns";
import { api } from "~/trpc/react";
import { platformsMap } from "~/lib/platforms";
import { omit } from "lodash-es";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Add() {
  const router = useRouter();
  const createGame = api.games.create.useMutation({
    onSuccess: async (data) => router.push(`/games/${data.id}`),
  });
  const form = useForm<z.infer<typeof addGameSchema>>({
    resolver: zodResolver(addGameSchema),
    defaultValues: {
      units: 1,
      region: Region.PAL,
      condition: Conditions.LOOSE,
    },
  });

  async function onSubmit(values: z.infer<typeof addGameSchema>) {
    if (values.images) {
      const formData = new FormData();

      formData.append("file", values.images);
      const response = await fetch("https://images.salsashack.co.uk", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      await createGame.mutateAsync({
        ...omit(values, ["images"]),
        images: [`https://images.salsashack.co.uk/${result.filename}`],
      });
    }

    await createGame.mutateAsync({
      ...omit(values, ["images"]),
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Game Name</FormLabel>
              <FormControl>
                <Input placeholder="Sonic" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="console"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Console</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Console" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Consoles).map((c) => (
                    <SelectItem value={c} key={c}>
                      {platformsMap[c as keyof typeof platformsMap] || c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Region).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idgbId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IGDB ID</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <Link
                  href="https://www.igdb.com"
                  target="_blank"
                  className="underline"
                >
                  Open IGDB
                </Link>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="units"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Units</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    form.setValue("units", parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priceChartingUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price Charting URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <Link
                  href="https://www.pricecharting.com/"
                  target="_blank"
                  className="underline"
                >
                  Open Price Charting
                </Link>{" "}
                and copy the url after <code>pricecharting.com/game/</code>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchasePrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Purchase Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    form.setValue("purchasePrice", parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="purchaseDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Purchase Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="condition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.keys(Conditions).map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field: { value, onChange, ...field } }) => {
            return (
              <FormItem>
                <FormLabel>Photos</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={value?.fileName}
                    onChange={(event) => {
                      onChange(event.target.files?.[0]);
                    }}
                    type="file"
                    id="images"
                    accept="image/png, image/jpeg"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comments</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

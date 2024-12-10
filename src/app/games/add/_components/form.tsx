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
import { Conditions, Consoles, Region } from "@prisma/client";
import { addGameSchema } from "~/lib/schemas";
import { api } from "~/trpc/react";
import { platformsMap } from "~/lib/platforms";
import { omit } from "lodash-es";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

import { FormInput } from "~/components/forms/Input";
import { ImageUpload } from "~/components/forms/imageInput";
import { FormSelect } from "~/components/forms/Select";
import { FormDate } from "~/components/forms/date";
import { Session } from "next-auth";

export const AddForm = ({ session }: { session: Session }) => {
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
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

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
        <FormInput
          label="Game Name"
          form={form}
          placeholder="Sonic"
          name="name"
        />
        <FormSelect
          form={form}
          label="Console"
          name="console"
          values={Object.keys(Consoles)}
          transformValue={(c) =>
            platformsMap[c as keyof typeof platformsMap] || c
          }
        />
        <FormSelect
          form={form}
          label="Region"
          name="region"
          values={Object.keys(Region)}
        />
        <FormInput type="number" form={form} name="idgbId" label="IGDB ID ">
          <FormDescription>
            <Link
              href="https://www.igdb.com"
              target="_blank"
              className="underline"
            >
              Open IGDB
            </Link>
          </FormDescription>
        </FormInput>

        <FormInput
          form={form}
          name="units"
          onChange={(e) => form.setValue("units", parseInt(e.target.value))}
          type="number"
          label="Units"
        />

        <FormInput
          form={form}
          name="priceChartingUrl"
          label="Price Charting URL "
        >
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
        </FormInput>

        <FormInput
          type="number"
          form={form}
          name="purchasePrice"
          label="Purchase Price"
          onChange={(e) =>
            form.setValue("purchasePrice", parseFloat(e.target.value))
          }
        />
        <FormDate form={form} name="purchaseDate" label="Purchase Date" />

        <FormSelect
          form={form}
          label="Condition"
          name="condition"
          values={Object.keys(Conditions)}
        />

        <ImageUpload name="images" form={form} />
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
};

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Conditions, ItemType } from "@prisma/client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "~/components/forms/Input";
import { FormSelect } from "~/components/forms/Select";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Form, FormDescription } from "~/components/ui/form";
import { addPurchaseSchema } from "~/lib/schemas";
import { api } from "~/trpc/react";

export function NewPurchase() {
  const form = useForm<z.infer<typeof addPurchaseSchema>>({
    resolver: zodResolver(addPurchaseSchema),
    defaultValues: {
      units: 1,
      condition: Conditions.LOOSE,
      type: ItemType.GAME,
    },
  });
  const createPurchase = api.purchases.create.useMutation({
    onSuccess: async (data) => {
      console.log("data", data);
    },
  });

  const onSubmit = async (values: z.infer<typeof addPurchaseSchema>) => {
    await createPurchase.mutateAsync(values);
    location.reload();
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add a purchase</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-auto sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a purchase</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormInput name="name" label="Game Name" form={form} />

            <FormInput name="link" label="Link" form={form} />

            <FormInput
              type="number"
              form={form}
              name="price"
              label="Price"
              onChange={(e) =>
                form.setValue("price", parseFloat(e.target.value))
              }
            />

            <FormInput
              type="number"
              form={form}
              name="shipping"
              label="Shipping"
              onChange={(e) =>
                form.setValue("shipping", parseFloat(e.target.value))
              }
            />

            <FormSelect
              form={form}
              label="Condition"
              name="condition"
              values={Object.keys(Conditions)}
            />
            <FormSelect
              name="type"
              form={form}
              label="Type"
              values={Object.keys(ItemType)}
            />
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

            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export const ImageUpload = ({
  form,
  name,
}: {
  form: UseFormReturn<any>;
  name: string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
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
  );
};

import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const FormSelect = ({
  values,
  form,
  label,
  name,
  transformValue,
}: {
  values: any[];
  form: UseFormReturn<any>;
  label: string;
  name: string;
  transformValue?: (value: any) => string;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={label} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {values.map((c) => (
                <SelectItem key={c} value={c}>
                  {transformValue ? transformValue(c) : c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

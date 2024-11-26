import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";

export const FormInput = ({
  form,
  placeholder,
  name,
  type = "text",
  onChange,
  label,
  children,
}: {
  form: UseFormReturn<any>;
  placeholder?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              {...field}
              onChange={(e) => (onChange ? onChange : field.onChange(e))}
            />
          </FormControl>
          <FormMessage />
          {children}
        </FormItem>
      )}
    />
  );
};

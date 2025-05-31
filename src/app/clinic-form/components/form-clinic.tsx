"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const clinicFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Nome da clínica é obrigatório" })
    .max(50, {
      message: "Nome da clínica deve conter no máximo 50 caracteres",
    }),
});

export function FormClinic() {
  function onSubmit(values: z.infer<typeof clinicFormSchema>) {
    console.log(values);
  }

  const form = useForm<z.infer<typeof clinicFormSchema>>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      name: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button type="submit">Criar clínica</Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
}

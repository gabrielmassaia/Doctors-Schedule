import { z } from "zod";

export const upsertPatientSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z.string().email({ message: "Email inválido" }),
  phoneNumber: z.string().min(1, { message: "Telefone é obrigatório" }),
  sex: z.enum(["male", "female"], {
    required_error: "Sexo é obrigatório",
  }),
  status: z.enum(["active", "inactive"]).default("active"),
});

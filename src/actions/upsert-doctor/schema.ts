import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z.string().trim().min(1, { message: "Nome é obrigatório" }),
    specialty: z
      .string()
      .trim()
      .min(1, { message: "Especialidade é obrigatória" }),
    appointmentPriceInCents: z
      .number()
      .min(1, { message: "Preço da consulta é obrigatório" }),
    availableFromWeekday: z
      .number()
      .min(1, { message: "Dia da semana é obrigatório" }),
    availableToWeekday: z
      .number()
      .min(0, { message: "Dia da semana é obrigatório" }),
    availableFromTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de início é obrigatória" }),
    availableToTime: z
      .string()
      .trim()
      .min(1, { message: "Hora de término é obrigatória" }),
  })
  .refine(
    (data) => {
      return data.availableFromTime < data.availableToTime;
    },
    {
      message: "A hora de início deve ser anterior à hora de término",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;

import { z } from "zod";

export const createAppointmentSchema = z.object({
  patientId: z.string({
    required_error: "Selecione um paciente",
  }),
  doctorId: z.string({
    required_error: "Selecione um médico",
  }),
  appointmentPriceInCents: z.number({
    required_error: "Informe o valor da consulta",
  }),
  date: z.string({
    required_error: "Selecione uma data",
  }),
  time: z.string({
    required_error: "Selecione um horário",
  }),
});

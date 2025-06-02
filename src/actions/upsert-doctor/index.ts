"use server";

import { headers } from "next/headers";

import { db } from "@/db";
import { doctorsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { upsertDoctorSchema } from "./schema";

export const upsertDoctor = actionClient
  .schema(upsertDoctorSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clínica não encontrada");
    }

    await db
      .insert(doctorsTable)
      .values({
        clinicId: session.user.clinic.id,
        name: parsedInput.name,
        speciality: parsedInput.specialty,
        availableFromWeekDay: parsedInput.availableFromWeekday,
        availableToWeekDay: parsedInput.availableToWeekday,
        availableFromTime: parsedInput.availableFromTime,
        availableToTime: parsedInput.availableToTime,
        appointmentPriceInCents: parsedInput.appointmentPriceInCents,
      })
      .onConflictDoUpdate({
        target: [doctorsTable.id],
        set: {
          name: parsedInput.name,
          speciality: parsedInput.specialty,
          availableFromWeekDay: parsedInput.availableFromWeekday,
          availableToWeekDay: parsedInput.availableToWeekday,
          availableFromTime: parsedInput.availableFromTime,
          availableToTime: parsedInput.availableToTime,
          appointmentPriceInCents: parsedInput.appointmentPriceInCents,
        },
      });
  });

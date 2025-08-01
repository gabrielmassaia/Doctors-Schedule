"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

export const togglePatientStatus = actionClient
  .schema(
    z.object({
      id: z.string(),
      status: z.enum(["active", "inactive"]),
    }),
  )
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Usuário não autenticado");
    }

    const patient = await db.query.patientsTable.findFirst({
      where: eq(patientsTable.id, parsedInput.id),
    });

    if (!patient) {
      throw new Error("Paciente não encontrado");
    }

    if (patient.clinicId !== session.user.clinic?.id) {
      throw new Error("Você não tem permissão para alterar este paciente");
    }

    await db
      .update(patientsTable)
      .set({
        status: parsedInput.status,
        updatedAt: new Date(),
      })
      .where(eq(patientsTable.id, parsedInput.id));

    revalidatePath("/patients");
  });

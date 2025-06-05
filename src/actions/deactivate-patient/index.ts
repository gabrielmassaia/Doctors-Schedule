"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { db } from "@/db";
import { patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { actionClient } from "@/lib/next-safe-action";

import { deactivatePatientSchema } from "./schema";

export const deactivatePatient = actionClient
  .schema(deactivatePatientSchema)
  .action(async ({ parsedInput }) => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    if (!session?.user.clinic?.id) {
      throw new Error("Clinic not found");
    }

    await db
      .update(patientsTable)
      .set({
        status: "inactive",
        updatedAt: new Date(),
      })
      .where(eq(patientsTable.id, parsedInput.id));

    revalidatePath("/patients");
  });

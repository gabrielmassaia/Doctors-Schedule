import { eq } from "drizzle-orm";

import { db } from "@/db";
import { doctorsTable, patientsTable } from "@/db/schema";

export async function getAppointmentFormData() {
  const doctors = await db.query.doctorsTable.findMany();
  const patients = await db.query.patientsTable.findMany({
    where: (patients, { eq }) => eq(patients.status, "active"),
  });

  return {
    doctors,
    patients,
  };
}

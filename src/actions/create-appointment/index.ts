import { db } from "@/db";
import { appointmentsTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { createSafeAction } from "@/lib/next-safe-action";

import { createAppointmentSchema } from "./schema";

const handler = async (data: {
  patientId: string;
  doctorId: string;
  appointmentPriceInCents: number;
  date: string;
  time: string;
}) => {
  const { patientId, doctorId, appointmentPriceInCents, date, time } = data;

  const session = await auth();
  if (!session?.user?.clinic?.id) {
    throw new Error("Usuário não está vinculado a uma clínica");
  }

  const [hours, minutes] = time.split(":");
  const appointmentDate = new Date(date);
  appointmentDate.setHours(parseInt(hours), parseInt(minutes));

  const appointment = await db.insert(appointmentsTable).values({
    patientId,
    doctorId,
    appointmentPriceInCents,
    date: appointmentDate,
    clinicId: session.user.clinic.id,
  });

  return { appointment };
};

export const createAppointment = createSafeAction(
  createAppointmentSchema,
  handler,
);

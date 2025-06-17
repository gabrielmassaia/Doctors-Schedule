"use server";

import { createAppointment } from "@/actions/create-appointment";

export async function handleAppointmentSubmit(values: any) {
  return createAppointment(values);
}

"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { doctorsTable, patientsTable } from "@/db/schema";

import { handleAppointmentSubmit } from "../_actions/handle-appointment-submit";
import { UpsertAppointmentForm } from "./upsert-appointment-form";

interface AppointmentFormDialogProps {
  trigger: React.ReactNode;
  doctors: (typeof doctorsTable.$inferSelect)[];
  patients: (typeof patientsTable.$inferSelect)[];
}

export function AppointmentFormDialog({
  trigger,
  doctors,
  patients,
}: AppointmentFormDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <UpsertAppointmentForm
          doctors={doctors}
          patients={patients}
          onSubmit={handleAppointmentSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

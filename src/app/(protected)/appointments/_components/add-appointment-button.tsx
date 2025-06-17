"use client";

import { PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { doctorsTable, patientsTable } from "@/db/schema";

import { AppointmentFormDialog } from "./appointment-form-dialog";

interface AddAppointmentButtonProps {
  doctors: (typeof doctorsTable.$inferSelect)[];
  patients: (typeof patientsTable.$inferSelect)[];
}

export function AddAppointmentButton({
  doctors,
  patients,
}: AddAppointmentButtonProps) {
  return (
    <AppointmentFormDialog
      doctors={doctors}
      patients={patients}
      trigger={
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      }
    />
  );
}

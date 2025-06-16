import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientTableActionsProps {
  patient: typeof patientsTable.$inferSelect;
}

export default function PatientTableActions({
  patient,
}: PatientTableActionsProps) {
  const [UpsertDialogIsOpen, setUpsertDialogIsOpen] = useState(false);

  return (
    <Dialog open={UpsertDialogIsOpen} onOpenChange={setUpsertDialogIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost" size="icon">
            <MoreVerticalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setUpsertDialogIsOpen(true)}>
            <EditIcon /> Editar
          </DropdownMenuItem>
          <DropdownMenuItem>
            <TrashIcon /> Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpsertPatientForm
        isOpen={UpsertDialogIsOpen}
        patient={patient}
        onSuccess={() => setUpsertDialogIsOpen(false)}
      />
    </Dialog>
  );
}

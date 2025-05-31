import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { FormClinic } from "./components/form-clinic";

export default function ClinicFormPage() {
  return (
    <Dialog open={true}>
      <form>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar clínica</DialogTitle>
            <DialogDescription>
              Adicione uma clínica para que você possa gerenciar seus pacientes
            </DialogDescription>
          </DialogHeader>
          <FormClinic />
        </DialogContent>
      </form>
    </Dialog>
  );
}

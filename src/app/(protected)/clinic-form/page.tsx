import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";

import FormClinic from "./_components/form-clinic";

export default async function ClinicFormPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect("/authentication");
  }

  if (session.user.clinic) {
    redirect("/dashboard");
  }

  return (
    <div>
      <Dialog open>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar clínica</DialogTitle>
            <DialogDescription>
              Adicione uma clínica para continuar.
            </DialogDescription>
          </DialogHeader>
          <FormClinic />
        </DialogContent>
      </Dialog>
    </div>
  );
}

"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { UpsertDoctorForm } from "./upsert-doctor-form";

export function AddDoctorButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar Doutor
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm />
    </Dialog>
  );
}

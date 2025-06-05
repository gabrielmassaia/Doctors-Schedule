"use client";

import { AtSign, Phone, TrashIcon, User2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

import { deactivatePatient } from "@/actions/deactivate-patient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

export default function PatientCard({ patient }: PatientCardProps) {
  const [isUpsertPatientDialogOpen, setIsUpsertPatientDialogOpen] =
    useState(false);

  const patientInitial = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  const deactivatePatientAction = useAction(deactivatePatient, {
    onSuccess: () => {
      toast.success("Paciente excluído com sucesso");
    },
    onError: (error) => {
      toast.error("Erro ao excluir paciente");
      console.error(error);
    },
  });

  const handleDeactivatePatient = () => {
    deactivatePatientAction.execute({ id: patient.id });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitial}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">
              {patient.sex === "male" ? "Masculino" : "Feminino"}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <AtSign className="mr-1 h-4 w-4" />
          {patient.email}
        </Badge>
        <Badge variant="outline">
          <Phone className="mr-1 h-4 w-4" />
          {patient.phoneNumber}
        </Badge>
        <Badge variant="outline">
          <User2 className="mr-1 h-4 w-4" />
          {patient.sex === "male" ? "Masculino" : "Feminino"}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter className="flex gap-2">
        <Dialog
          open={isUpsertPatientDialogOpen}
          onOpenChange={setIsUpsertPatientDialogOpen}
        >
          <DialogTrigger asChild>
            <Button className="flex-1">Editar Cadastro</Button>
          </DialogTrigger>
          <UpsertPatientForm
            isOpen={isUpsertPatientDialogOpen}
            patient={patient}
            onSuccess={() => setIsUpsertPatientDialogOpen(false)}
          />
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="flex-1">
              <TrashIcon className="h-4 w-4" /> Excluir Paciente
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Tem certeza que deseja excluir esse paciente?
              </AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. O paciente será desativado e
                não aparecerá mais na lista.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeactivatePatient}>
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

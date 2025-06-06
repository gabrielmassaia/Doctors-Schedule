"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditIcon, MoreVerticalIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { patientsTable } from "@/db/schema";

type Patient = typeof patientsTable.$inferSelect;

export const PatientsTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: (params) => {
      const phone = params.row.original.phoneNumber;
      if (!phone) return "-";

      return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    },
  },

  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: (params) => {
      return params.row.original.sex === "male" ? "Masculino" : "Feminino";
    },
  },

  {
    id: "actions",
    cell: (params) => {
      const patient = params.row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon">
              <MoreVerticalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{patient.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <EditIcon className="h-4 w-4" /> Editar
            </DropdownMenuItem>
            <DropdownMenuItem>
              <TrashIcon className="h-4 w-4" /> Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { patientsTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import PatientTableActions from "./table-actions";

type Patient = typeof patientsTable.$inferSelect;

export const PatientsTableColumns: ColumnDef<Patient>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      const isInactive = row.original.status === "inactive";
      return (
        <span className={cn(isInactive && "text-muted-foreground")}>
          {row.original.name}
        </span>
      );
    },
    filterFn: (row, id, value) => {
      return row
        .getValue<string>(id)
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
  },
  {
    id: "email",
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const isInactive = row.original.status === "inactive";
      return (
        <span className={cn(isInactive && "text-muted-foreground")}>
          {row.original.email}
        </span>
      );
    },
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: "Telefone",
    cell: ({ row }) => {
      const phone = row.original.phoneNumber;
      const isInactive = row.original.status === "inactive";

      if (!phone) return "-";

      return (
        <span className={cn(isInactive && "text-muted-foreground")}>
          {phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")}
        </span>
      );
    },
  },
  {
    id: "sex",
    accessorKey: "sex",
    header: "Sexo",
    cell: ({ row }) => {
      const isInactive = row.original.status === "inactive";
      return (
        <span className={cn(isInactive && "text-muted-foreground")}>
          {row.original.sex === "male" ? "Masculino" : "Feminino"}
        </span>
      );
    },
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status === "active" ? "Ativo" : "Inativo"}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const patient = row.original;
      return <PatientTableActions patient={patient} />;
    },
  },
];

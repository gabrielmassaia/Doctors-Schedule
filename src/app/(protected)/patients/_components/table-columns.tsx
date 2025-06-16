"use client";

import { ColumnDef } from "@tanstack/react-table";

import { patientsTable } from "@/db/schema";

import PatientTableActions from "./table-actions";

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

      return <PatientTableActions patient={patient} />;
    },
  },
];

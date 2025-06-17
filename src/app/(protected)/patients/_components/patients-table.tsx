"use client";

import { DataTable } from "@/components/ui/data-table";
import { patientsTable } from "@/db/schema";

import { PatientsTableColumns } from "./table-columns";
import { TableFilters } from "./table-filters";

interface PatientsTableProps {
  patients: (typeof patientsTable.$inferSelect)[];
}

export function PatientsTable({ patients }: PatientsTableProps) {
  return (
    <div className="space-y-4">
      <DataTable
        columns={PatientsTableColumns}
        data={patients}
        filters={TableFilters}
      />
    </div>
  );
}

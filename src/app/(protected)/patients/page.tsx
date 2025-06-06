import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { DataTable } from "@/components/ui/data-table";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { auth } from "@/lib/auth";

import AddPatientButton from "./_components/add-patient-button";
import { PatientsTableColumns } from "./_components/table-columns";

export default async function PatientsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.clinic?.id) {
    throw new Error("Clinic not found");
  }

  const clinicId = session.user.clinic.id;

  const patients = await db.query.patientsTable.findMany({
    where: (patients) =>
      eq(patients.clinicId, clinicId) && eq(patients.status, "active"),
  });

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Pacientes</PageTitle>
          <PageDescription>
            Gerencie os pacientes da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddPatientButton />
        </PageActions>
      </PageHeader>
      <PageContent>
        <DataTable columns={PatientsTableColumns} data={patients} />
      </PageContent>
    </PageContainer>
  );
}

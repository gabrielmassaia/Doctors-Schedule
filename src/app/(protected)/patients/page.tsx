import { eq } from "drizzle-orm";

import { requirePlan } from "@/_helpers/require-plan";
import {
  PageActions,
  PageContainer,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { patientsTable } from "@/db/schema";

import AddPatientButton from "./_components/add-patient-button";
import { PatientsTable } from "./_components/patients-table";

export default async function PatientsPage() {
  const session = await requirePlan();

  const clinicId = session?.user?.clinic?.id;

  const patients = await db.query.patientsTable.findMany({
    where: eq(patientsTable.clinicId, clinicId!),
    orderBy: (patients, { desc }) => [desc(patients.createdAt)],
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
      <PatientsTable patients={patients} />
    </PageContainer>
  );
}

import { Plus } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { auth } from "@/lib/auth";

export default async function DoctorsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Doutores</PageTitle>
          <PageDescription>
            Gerenciamento dos profissionais cadastrados na clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>
            <Plus />
            Adicionar Doutor
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Profissionais</h2>
        </div>
      </PageContent>
    </PageContainer>
  );
}

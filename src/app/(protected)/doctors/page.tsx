import { Plus } from "lucide-react";

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

export default function DoctorsPage() {
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Médicos</PageTitle>
          <PageDescription>
            Gerenciamento dos médicos cadastrados na clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <Button>
            <Plus />
            Novo médico
          </Button>
        </PageActions>
      </PageHeader>
      <PageContent>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">Médicos</h2>
        </div>
      </PageContent>
    </PageContainer>
  );
}


import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Building } from "lucide-react";

interface Organization {
  id: string;
  name: string;
}

interface OrganizationSelectPageProps {
  onSelectOrganization: (orgId: string) => void;
}

const OrganizationSelectPage = ({ onSelectOrganization }: OrganizationSelectPageProps) => {
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  
  // Mock data - em produção virá do backend
  const organizations: Organization[] = [
    { id: "1", name: "Agro Solutions Ltda" },
    { id: "2", name: "Fazenda Santa Clara" },
  ];

  const handleSelectOrganization = () => {
    if (selectedOrg) {
      onSelectOrganization(selectedOrg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
              <Leaf className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Selecione a Organização
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {organizations.length === 0 ? (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Você ainda não está vinculado a nenhuma organização
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-3">
                {organizations.map((org) => (
                  <div
                    key={org.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/40 ${
                      selectedOrg === org.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-background/50"
                    }`}
                    onClick={() => setSelectedOrg(org.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                        <Building className="w-5 h-5 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{org.name}</h3>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        selectedOrg === org.id
                          ? "border-primary bg-primary"
                          : "border-muted-foreground"
                      }`}>
                        {selectedOrg === org.id && (
                          <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button
                onClick={handleSelectOrganization}
                disabled={!selectedOrg}
                className="w-full h-12 text-lg font-medium"
              >
                Entrar
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationSelectPage;

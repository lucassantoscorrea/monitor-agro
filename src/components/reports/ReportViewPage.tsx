
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

const ReportViewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reportData, setReportData] = useState<any>(null);

  useEffect(() => {
    // Simular carregamento de dados do relatório
    const mockReportData = {
      id: id,
      date: "09/06/2025 08:30",
      isIncomplete: Math.random() > 0.7, // 30% chance de ser incompleto
      results: [
        {
          id: 1,
          productName: "ROUNDUP ORIGINAL DI",
          price: "R$ 89,90",
          supplier: "AgroVendas SP",
          address: "Rua das Plantas, 123 - São Paulo, SP"
        },
        {
          id: 2,
          productName: "NATIVO SC",
          price: "R$ 156,75",
          supplier: "Fazenda Distribuidor",
          address: "Av. Rural, 456 - Ribeirão Preto, SP"
        },
        {
          id: 3,
          productName: "KARATE ZEON 50 CS",
          price: "R$ 234,50",
          supplier: "Campo & Cia",
          address: "Rod. BR-050, Km 15 - Uberlândia, MG"
        },
        {
          id: 4,
          productName: "TORDON 2,4-D",
          price: "R$ 178,90",
          supplier: "AgroMax Ltda",
          address: "Rua do Agronegócio, 789 - Goiânia, GO"
        }
      ]
    };
    setReportData(mockReportData);
  }, [id]);

  const handleDownloadExcel = () => {
    console.log("Downloading Excel report...");
  };

  const handleDownloadPDF = () => {
    console.log("Downloading PDF report...");
  };

  if (!reportData) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <SidebarInset>
            <div className="flex-1 space-y-6 p-6">
              <div>Carregando relatório...</div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/reports")}
                  className="mb-4 p-0 h-auto hover:bg-transparent"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar para Relatórios
                </Button>
                <h1 className="text-3xl font-bold text-foreground">
                  Relatório de {reportData.date}
                </h1>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  onClick={handleDownloadExcel}
                  className="h-12 px-6"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Baixar em Excel
                </Button>
                <Button 
                  onClick={handleDownloadPDF}
                  className="h-12 px-6"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Baixar em PDF
                </Button>
              </div>
            </div>

            {reportData.isIncomplete && (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertDescription className="text-yellow-800">
                  Alguns produtos não retornaram resultados
                </AlertDescription>
              </Alert>
            )}

            <Card className="premium-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Dados Coletados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome do Produto</TableHead>
                      <TableHead>Preço</TableHead>
                      <TableHead>Fornecedor</TableHead>
                      <TableHead>Endereço</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.results.map((result: any) => (
                      <TableRow key={result.id} className="hover:bg-secondary/30">
                        <TableCell className="font-medium">{result.productName}</TableCell>
                        <TableCell className="font-bold text-green-600">{result.price}</TableCell>
                        <TableCell>{result.supplier}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{result.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ReportViewPage;

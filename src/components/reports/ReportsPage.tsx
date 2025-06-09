
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Calendar, Eye } from "lucide-react";

const ReportsPage = () => {
  const reports = [
    {
      id: 1,
      date: "09/06/2025 08:30",
      products: 12,
      status: "Completo",
      results: 89,
      downloadUrl: "#"
    },
    {
      id: 2,
      date: "08/06/2025 14:00",
      products: 12,
      status: "Completo",
      results: 95,
      downloadUrl: "#"
    },
    {
      id: 3,
      date: "08/06/2025 08:30",
      products: 10,
      status: "Parcial",
      results: 67,
      downloadUrl: "#"
    },
    {
      id: 4,
      date: "07/06/2025 14:00",
      products: 10,
      status: "Completo",
      results: 82,
      downloadUrl: "#"
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status === "Completo") {
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completo</Badge>;
    }
    return <Badge variant="outline" className="border-yellow-500 text-yellow-700">Parcial</Badge>;
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground mt-2">
            Histórico de buscas e resultados de preços
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{reports.length}</div>
            <p className="text-sm text-muted-foreground">Total de Relatórios</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {reports.filter(r => r.status === "Completo").length}
            </div>
            <p className="text-sm text-muted-foreground">Buscas Completas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">
              {Math.round(reports.reduce((sum, r) => sum + r.results, 0) / reports.length)}
            </div>
            <p className="text-sm text-muted-foreground">Média de Resultados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">Hoje</div>
            <p className="text-sm text-muted-foreground">Último Relatório</p>
          </CardContent>
        </Card>
      </div>

      <Card className="premium-shadow">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Histórico de Relatórios
          </CardTitle>
          <CardDescription>
            Relatórios gerados automaticamente pelo sistema de monitoramento
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum relatório gerado ainda</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data da Geração</TableHead>
                  <TableHead>Produtos</TableHead>
                  <TableHead>Resultados</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id} className="hover:bg-secondary/30">
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{report.date}</span>
                    </TableCell>
                    <TableCell>{report.products} produtos</TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">{report.results} preços</span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(report.status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Eye className="w-4 h-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Download className="w-4 h-4 mr-1" />
                        Excel
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-1" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;

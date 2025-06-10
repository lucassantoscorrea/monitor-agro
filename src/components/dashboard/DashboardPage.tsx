
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Leaf, FileText, Calendar, Plus, Users } from "lucide-react";

const DashboardPage = () => {
  const hasProducts = true; // This would come from your data/state management
  
  const stats = [
    {
      title: "Produtos Monitorados",
      value: hasProducts ? "12" : "0",
      description: hasProducts ? "Ativos no sistema" : "Nenhum produto cadastrado",
      icon: Leaf,
      color: "text-primary"
    },
    {
      title: "Último Relatório",
      value: hasProducts ? "Hoje" : "-",
      description: hasProducts ? "08:30 - 12 produtos" : "Aguardando produtos",
      icon: FileText,
      color: "text-accent"
    },
    {
      title: "Próxima Busca",
      value: hasProducts ? "14:00" : "-",
      description: hasProducts ? "Agendada para hoje" : "Sem busca programada",
      icon: Calendar,
      color: "text-primary"
    }
  ];

  const recentProducts = [
    { name: "ROUNDUP ORIGINAL DI", category: "Herbicida", lastUpdate: "Hoje 08:30", status: "Ativo" },
    { name: "NATIVO SC", category: "Fungicida", lastUpdate: "Hoje 08:30", status: "Ativo" },
    { name: "KARATE ZEON 50 CS", category: "Inseticida", lastUpdate: "Hoje 08:30", status: "Ativo" },
    { name: "TORDON 2,4-D", category: "Herbicida", lastUpdate: "Hoje 08:30", status: "Ativo" }
  ];

  const nextSearchDate = "Hoje às 14:00";

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bem-vindo ao MonitorAgro</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie seus produtos e acompanhe os preços do mercado
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 h-12 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Produto
        </Button>
      </div>

      {/* Aviso da próxima busca */}
      {hasProducts && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-accent" />
            <p className="text-foreground font-medium">
              Próxima busca programada para {nextSearchDate}
            </p>
          </div>
        </div>
      )}

      {/* Blocos de resumo */}
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover premium-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Conteúdo condicional baseado na existência de produtos */}
      {hasProducts ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary" />
                Produtos Recentes
              </CardTitle>
              <CardDescription>
                Últimos produtos adicionados ao monitoramento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.category}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary" className="mb-1">
                        {product.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground">{product.lastUpdate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="premium-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                Próximas Buscas
              </CardTitle>
              <CardDescription>
                Cronograma de monitoramento automático
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-accent/10 border border-accent/20">
                  <div>
                    <h4 className="font-medium text-foreground">Busca Programada</h4>
                    <p className="text-sm text-muted-foreground">12 produtos monitorados</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-accent">{nextSearchDate}</p>
                    <Badge variant="outline" className="border-accent/50 text-accent">
                      Em 2 horas
                    </Badge>
                  </div>
                </div>
                
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground">
                    Sistema executará busca automática no "Menor Preço" do governo MT
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="premium-shadow">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Leaf className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhum produto monitorado ainda
            </h3>
            <p className="text-muted-foreground text-center mb-6 max-w-md">
              Comece adicionando produtos para monitorar preços e receber relatórios automáticos do mercado.
            </p>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-5 h-5 mr-2" />
              Adicionar Primeiro Produto
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DashboardPage;

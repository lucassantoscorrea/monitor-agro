
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Edit, Calendar } from "lucide-react";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const products = [
    {
      id: 1,
      name: "ROUNDUP ORIGINAL DI",
      category: "Herbicida",
      lastSearch: "Hoje 08:30",
      status: "Ativo",
      resultsCount: 8
    },
    {
      id: 2,
      name: "NATIVO SC",
      category: "Fungicida", 
      lastSearch: "Hoje 08:30",
      status: "Ativo",
      resultsCount: 5
    },
    {
      id: 3,
      name: "KARATE ZEON 50 CS",
      category: "Inseticida",
      lastSearch: "Hoje 08:30",
      status: "Ativo",
      resultsCount: 12
    },
    {
      id: 4,
      name: "TORDON 2,4-D",
      category: "Herbicida",
      lastSearch: "Hoje 08:30",
      status: "Ativo",
      resultsCount: 3
    },
    {
      id: 5,
      name: "GRAMOXONE 200",
      category: "Herbicida",
      lastSearch: "Ontem 14:00",
      status: "Ativo",
      resultsCount: 7
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Produtos Monitorados</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie os produtos para monitoramento automático de preços
          </p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 h-12 px-6">
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Produto
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{products.length}</div>
            <p className="text-sm text-muted-foreground">Total de Produtos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-accent">
              {products.filter(p => p.lastSearch.includes('Hoje')).length}
            </div>
            <p className="text-sm text-muted-foreground">Buscas Hoje</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {products.reduce((sum, p) => sum + p.resultsCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Resultados Encontrados</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Taxa de Sucesso</p>
          </CardContent>
        </Card>
      </div>

      <Card className="premium-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Lista de Produtos</CardTitle>
              <CardDescription>
                Produtos configurados para monitoramento automático
              </CardDescription>
            </div>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Buscar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {searchTerm ? "Nenhum produto encontrado." : "Adicione os produtos que deseja monitorar"}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome do Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Última Busca</TableHead>
                  <TableHead>Resultados</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id} className="hover:bg-secondary/30">
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      {product.lastSearch}
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-green-600">{product.resultsCount} encontrados</span>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="mr-2">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Remover
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

export default ProductsPage;

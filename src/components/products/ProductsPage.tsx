
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Edit, Trash2, Calendar, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();

  // Sugestões de produtos para autocomplete
  const productSuggestions = [
    "ROUNDUP ORIGINAL DI",
    "NATIVO SC",
    "KARATE ZEON 50 CS",
    "TORDON 2,4-D",
    "GRAMOXONE 200",
    "CONNECT",
    "PRIMÓLEO",
    "VERDICT R",
    "POLO 500 WP",
    "ACTARA 250 WG"
  ];

  const filteredSuggestions = productSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(productName.toLowerCase())
  );

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "ROUNDUP ORIGINAL DI",
      category: "Herbicida",
      lastSearchDate: "10/06/2025 08:30"
    },
    {
      id: 2,
      name: "NATIVO SC",
      category: "Fungicida", 
      lastSearchDate: "10/06/2025 08:30"
    },
    {
      id: 3,
      name: "KARATE ZEON 50 CS",
      category: "Inseticida",
      lastSearchDate: "10/06/2025 08:30"
    },
    {
      id: 4,
      name: "TORDON 2,4-D",
      category: "Herbicida",
      lastSearchDate: "10/06/2025 08:30"
    },
    {
      id: 5,
      name: "GRAMOXONE 200",
      category: "Herbicida",
      lastSearchDate: "09/06/2025 14:00"
    }
  ]);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveProduct = (productId: number) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({
      title: "Produto removido com sucesso",
      description: "O produto foi removido da lista de monitoramento.",
    });
  };

  const handleSaveProduct = async () => {
    if (!productName.trim()) {
      toast({
        title: "Erro",
        description: "Informe o nome do produto",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simular salvamento
    setTimeout(() => {
      const newProduct = {
        id: products.length + 1,
        name: productName,
        category: category || "Sem categoria",
        lastSearchDate: new Date().toLocaleString("pt-BR")
      };
      
      setProducts(prev => [...prev, newProduct]);
      setIsLoading(false);
      setIsDialogOpen(false);
      setProductName("");
      setCategory("");
      setShowSuggestions(false);
      
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso",
      });
    }, 1500);
  };

  const handleProductSelect = (selectedProduct: string) => {
    setProductName(selectedProduct);
    setShowSuggestions(false);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <div className="flex-1 space-y-6 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Produtos Monitorados</h1>
                <p className="text-muted-foreground mt-2">
                  Gerencie os produtos para monitoramento automático de preços
                </p>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 h-12 px-6">
                    <Plus className="w-5 h-5 mr-2" />
                    Adicionar Produto
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Adicionar Produto</DialogTitle>
                    <DialogDescription>
                      Cadastre um novo produto para monitoramento de preços
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="productName">Nome do Produto *</Label>
                      <div className="relative">
                        <Input
                          id="productName"
                          placeholder="Digite o nome do produto..."
                          value={productName}
                          onChange={(e) => {
                            setProductName(e.target.value);
                            setShowSuggestions(true);
                          }}
                          onFocus={() => setShowSuggestions(true)}
                          className="w-full"
                        />
                        
                        {showSuggestions && productName && filteredSuggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 z-50 mt-1">
                            <Command className="rounded-lg border shadow-md">
                              <CommandList>
                                <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                                <CommandGroup>
                                  {filteredSuggestions.map((suggestion) => (
                                    <CommandItem
                                      key={suggestion}
                                      onSelect={() => handleProductSelect(suggestion)}
                                      className="cursor-pointer"
                                    >
                                      {suggestion}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Categoria (opcional)</Label>
                      <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Herbicida">Herbicida</SelectItem>
                          <SelectItem value="Fungicida">Fungicida</SelectItem>
                          <SelectItem value="Inseticida">Inseticida</SelectItem>
                          <SelectItem value="Acaricida">Acaricida</SelectItem>
                          <SelectItem value="Nematicida">Nematicida</SelectItem>
                          <SelectItem value="Fertilizante">Fertilizante</SelectItem>
                          <SelectItem value="Adjuvante">Adjuvante</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={handleSaveProduct}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Salvando...
                          </>
                        ) : (
                          "Salvar Produto"
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                        disabled={isLoading}
                      >
                        Cancelar
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                        <TableHead>Data da Última Busca</TableHead>
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
                            {product.lastSearchDate}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="mr-2">
                              <Edit className="w-4 h-4" />
                              Editar
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-destructive hover:text-destructive"
                              onClick={() => handleRemoveProduct(product.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
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
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProductsPage;

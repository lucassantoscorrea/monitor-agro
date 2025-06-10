
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Plus, Loader2, Check, ChevronsUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  category: string;
  lastSearchDate: string;
}

interface ListedProduct {
  id: string;
  comercialName: string;
  activeIngredient: string;
  manufacturer: string;
  category: string;
}

interface AddProductDialogProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  listedProducts: ListedProduct[];
}

const AddProductDialog = ({ products, setProducts, listedProducts }: AddProductDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("listed");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [openProductCombobox, setOpenProductCombobox] = useState(false);
  const { toast } = useToast();

  const handleSaveProduct = async () => {
    if (activeTab === "listed" && !selectedProduct) {
      toast({
        title: "Erro",
        description: "Selecione um produto da lista",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === "generic" && !productName.trim()) {
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
      let newProduct;
      
      if (activeTab === "listed") {
        const product = listedProducts.find(p => p.id === selectedProduct);
        newProduct = {
          id: products.length + 1,
          name: product?.comercialName || "",
          category: product?.category || "Sem categoria",
          lastSearchDate: new Date().toLocaleString("pt-BR")
        };
      } else {
        newProduct = {
          id: products.length + 1,
          name: productName,
          category: category || "Sem categoria",
          lastSearchDate: new Date().toLocaleString("pt-BR")
        };
      }
      
      setProducts(prev => [...prev, newProduct]);
      setIsLoading(false);
      setIsDialogOpen(false);
      setProductName("");
      setCategory("");
      setSelectedProduct("");
      setActiveTab("listed");
      
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso",
      });
    }, 1500);
  };

  const resetForm = () => {
    setProductName("");
    setCategory("");
    setSelectedProduct("");
    setActiveTab("listed");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if (!open) resetForm();
    }}>
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
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="listed">Produtos Listados</TabsTrigger>
            <TabsTrigger value="generic">Produtos Genéricos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="listed" className="space-y-4">
            <div className="space-y-2">
              <Label>Produto *</Label>
              <Popover open={openProductCombobox} onOpenChange={setOpenProductCombobox}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openProductCombobox}
                    className="w-full justify-between"
                  >
                    {selectedProduct
                      ? listedProducts.find((product) => product.id === selectedProduct)?.comercialName
                      : "Selecione um produto..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <Command>
                    <CommandInput placeholder="Buscar por nome comercial, princípio ativo ou fabricante..." />
                    <CommandEmpty>Nenhum produto encontrado.</CommandEmpty>
                    <CommandList>
                      <CommandGroup>
                        {listedProducts.map((product) => (
                          <CommandItem
                            key={product.id}
                            value={product.id}
                            onSelect={(currentValue) => {
                              setSelectedProduct(currentValue === selectedProduct ? "" : currentValue);
                              setOpenProductCombobox(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedProduct === product.id ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex flex-col">
                              <span className="font-medium">{product.comercialName}</span>
                              <span className="text-sm text-muted-foreground">
                                {product.activeIngredient} - {product.manufacturer}
                              </span>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            
            {selectedProduct && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Informações do Produto</h4>
                {(() => {
                  const product = listedProducts.find(p => p.id === selectedProduct);
                  return product ? (
                    <div className="space-y-1 text-sm">
                      <p><strong>Nome Comercial:</strong> {product.comercialName}</p>
                      <p><strong>Princípio Ativo:</strong> {product.activeIngredient}</p>
                      <p><strong>Fabricante:</strong> {product.manufacturer}</p>
                      <p><strong>Categoria:</strong> {product.category}</p>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="generic" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="productName">Nome do Produto *</Label>
              <Input
                id="productName"
                placeholder="Digite o nome do produto..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
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
          </TabsContent>
        </Tabs>

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
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;

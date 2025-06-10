
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { listedProducts } from "@/data/listedProducts";
import ListedProductsTab from "./ListedProductsTab";

interface Product {
  id: number;
  name: string;
  category: string;
  lastSearchDate: string;
}

interface EditProductDialogProps {
  product: Product;
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}

const EditProductDialog = ({ product, products, setProducts }: EditProductDialogProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productName, setProductName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Detectar se o produto atual existe na lista de produtos cadastrados
  const isListedProduct = listedProducts.some(p => p.comercialName === product.name);
  const currentListedProduct = listedProducts.find(p => p.comercialName === product.name);

  const handleSaveProduct = async () => {
    if (isListedProduct) {
      if (!selectedProduct) {
        toast({
          title: "Erro",
          description: "Selecione um produto da lista",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!productName.trim()) {
        toast({
          title: "Erro",
          description: "Informe o nome do produto",
          variant: "destructive",
        });
        return;
      }
    }

    setIsLoading(true);

    // Simular salvamento
    setTimeout(() => {
      let updatedProduct;
      
      if (isListedProduct) {
        const selectedListedProduct = listedProducts.find(p => p.id === selectedProduct);
        updatedProduct = {
          ...product,
          name: selectedListedProduct?.comercialName || product.name,
          category: selectedListedProduct?.category || product.category
        };
      } else {
        updatedProduct = {
          ...product,
          name: productName,
          category: category || "Sem categoria"
        };
      }
      
      setProducts(prev => prev.map(p => 
        p.id === product.id ? updatedProduct : p
      ));
      
      setIsLoading(false);
      setIsDialogOpen(false);
      
      toast({
        title: "Sucesso",
        description: "Produto atualizado com sucesso",
      });
    }, 1000);
  };

  const resetForm = () => {
    setProductName(product.name);
    setCategory(product.category);
    setSelectedProduct(currentListedProduct?.id || "");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if (!open) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="mr-2">
          <Edit className="w-4 h-4" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            {isListedProduct 
              ? "Selecione outro produto da lista de produtos cadastrados"
              : "Atualize as informações do produto"
            }
          </DialogDescription>
        </DialogHeader>
        
        {isListedProduct ? (
          <div className="space-y-4">
            <ListedProductsTab 
              listedProducts={listedProducts}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="editProductName">Nome do Produto *</Label>
              <Input
                id="editProductName"
                placeholder="Digite o nome do produto..."
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="editCategory">Categoria *</Label>
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
          </div>
        )}

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
              "Salvar Alterações"
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

export default EditProductDialog;

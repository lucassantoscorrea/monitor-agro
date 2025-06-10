
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ListedProductsTab from "./ListedProductsTab";
import GenericProductsTab from "./GenericProductsTab";

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
      resetForm();
      
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
          
          <TabsContent value="listed">
            <ListedProductsTab 
              listedProducts={listedProducts}
              selectedProduct={selectedProduct}
              setSelectedProduct={setSelectedProduct}
            />
          </TabsContent>
          
          <TabsContent value="generic">
            <GenericProductsTab 
              productName={productName}
              setProductName={setProductName}
              category={category}
              setCategory={setCategory}
            />
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

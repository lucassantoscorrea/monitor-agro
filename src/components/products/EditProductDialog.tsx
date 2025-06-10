
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

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
      setProducts(prev => prev.map(p => 
        p.id === product.id 
          ? { ...p, name: productName, category: category || "Sem categoria" }
          : p
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Produto</DialogTitle>
          <DialogDescription>
            Atualize as informações do produto
          </DialogDescription>
        </DialogHeader>
        
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

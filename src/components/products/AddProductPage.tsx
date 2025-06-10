
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProductPage = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleSave = async () => {
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
      setIsLoading(false);
      toast({
        title: "Sucesso",
        description: "Produto adicionado com sucesso",
      });
      
      // Redirecionar para a lista de produtos
      navigate("/products");
    }, 1500);
  };

  const handleProductSelect = (selectedProduct: string) => {
    setProductName(selectedProduct);
    setShowSuggestions(false);
  };

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/products")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Adicionar Produto</h1>
          <p className="text-muted-foreground mt-2">
            Cadastre um novo produto para monitoramento de preços
          </p>
        </div>
      </div>

      <Card className="max-w-2xl premium-shadow">
        <CardHeader>
          <CardTitle>Informações do Produto</CardTitle>
          <CardDescription>
            Preencha os dados do produto que deseja monitorar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
              onClick={handleSave}
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
              onClick={() => navigate("/products")}
              disabled={isLoading}
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProductPage;


import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ListedProduct {
  id: string;
  comercialName: string;
  activeIngredient: string;
  manufacturer: string;
  category: string;
}

interface ListedProductsTabProps {
  listedProducts: ListedProduct[];
  selectedProduct: string;
  setSelectedProduct: (value: string) => void;
}

const ListedProductsTab = ({ listedProducts, selectedProduct, setSelectedProduct }: ListedProductsTabProps) => {
  const [openProductCombobox, setOpenProductCombobox] = useState(false);

  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ListedProductsTab;

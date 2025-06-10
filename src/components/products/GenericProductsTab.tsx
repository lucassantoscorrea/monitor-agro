
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface GenericProductsTabProps {
  productName: string;
  setProductName: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

const GenericProductsTab = ({ productName, setProductName, category, setCategory }: GenericProductsTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default GenericProductsTab;

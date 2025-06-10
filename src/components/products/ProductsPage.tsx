
import { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import AddProductDialog from "./AddProductDialog";
import ProductsTable from "./ProductsTable";
import { listedProducts } from "@/data/listedProducts";

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

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
              <AddProductDialog 
                products={products}
                setProducts={setProducts}
                listedProducts={listedProducts}
              />
            </div>

            <ProductsTable 
              products={products}
              setProducts={setProducts}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ProductsPage;

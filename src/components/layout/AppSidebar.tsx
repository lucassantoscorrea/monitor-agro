
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter
} from "@/components/ui/sidebar";
import { Leaf, FileText, User, Users, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useProfile } from "@/hooks/useProfile";
import { useMemo } from "react";

const AppSidebar = () => {
  const location = useLocation();
  const { isAdmin } = useProfile();

  // Memoizar os itens do menu para evitar re-cálculos desnecessários
  const menuItems = useMemo(() => [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Produtos Monitorados",
      url: "/products",
      icon: Leaf,
    },
    {
      title: "Relatórios",
      url: "/reports",
      icon: FileText,
    },
    // Só mostra a página de usuários para administradores - verificação restaurada
    ...(isAdmin ? [{
      title: "Usuários",
      url: "/users",
      icon: Users,
    }] : []),
    {
      title: "Perfil",
      url: "/profile",
      icon: User,
    },
  ], [isAdmin]);

  const isActive = (url: string) => {
    if (url === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(url);
  };

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="h-32 flex items-center justify-center p-6 border-b border-sidebar-border">
        <div className="w-full h-full flex items-center justify-center">
          <img 
            src="/lovable-uploads/6dac44d4-275c-49b5-bbe1-4095e09cfbc4.png" 
            alt="MonitorAgro Logo" 
            className="h-24 w-auto object-contain"
          />
        </div>
      </SidebarHeader>
      
      <SidebarContent className="flex-1">
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    className="h-12"
                    isActive={isActive(item.url)}
                  >
                    <Link to={item.url} className="flex items-center gap-3 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="text-xs text-sidebar-foreground/50 text-center">
          <p>Próxima busca:</p>
          <p className="font-medium text-accent">Hoje às 14:00</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export { AppSidebar };

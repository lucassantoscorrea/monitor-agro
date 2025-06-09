
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
import { Leaf, Calendar, FileText, User } from "lucide-react";

const menuItems = [
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
  {
    title: "Perfil",
    url: "/profile",
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
            <Leaf className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-sidebar-foreground">MonitorAgro</h2>
            <p className="text-xs text-sidebar-foreground/70">Agro Solutions</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/60">Menu Principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-12">
                    <a href={item.url} className="flex items-center gap-3 text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent transition-colors">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.title}</span>
                    </a>
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
}

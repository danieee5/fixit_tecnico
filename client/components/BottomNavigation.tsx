import { Link, useLocation } from "react-router-dom";
import { Home, TrendingUp, ClipboardList, User } from "lucide-react";

export default function BottomNavigation() {
  const location = useLocation();

  const navItems = [
    { path: "/", icon: Home, label: "Inicio" },
    { path: "/mi-desempeno", icon: TrendingUp, label: "Mi Desempeño" },
    { path: "/services", icon: Wrench, label: "Servicios" },
    { path: "/profile", icon: User, label: "Perfil" }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? "text-technician-primary"
                : "text-muted-foreground"
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}

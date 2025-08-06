import {
  ArrowLeft,
  Settings,
  User,
  Edit,
  FileText,
  Briefcase,
  Bell,
  Headphones,
  UserCheck,
  Star,
  Clock,
  TrendingUp,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import BottomNavigation from "../components/BottomNavigation";
import NotificationsModal from "../components/NotificationsModal";

export default function Profile() {
  const [currentRole, setCurrentRole] = useState("tecnico");
  const [showNotifications, setShowNotifications] = useState(false);

  // User data (in a real app, this would come from a context or API)
  const userData = {
    name: "Carlos Mendoza",
    email: "carlos.mendoza@fixit.com",
    avatar: null, // null = no image uploaded
    completedServices: 156,
    averageRating: 4.8,
    responseTime: "15 min",
    joinDate: "Enero 2023"
  };

  const quickAccessItems = [
    {
      id: "history",
      title: "Historial de solicitudes",
      subtitle: "Ver todas mis solicitudes completadas",
      icon: FileText,
      count: userData.completedServices
    },
    {
      id: "active",
      title: "Servicios activos",
      subtitle: "Solicitudes en progreso",
      icon: Briefcase,
      count: 3
    },
    {
      id: "notifications",
      title: "Notificaciones",
      subtitle: "Configurar alertas y avisos",
      icon: Bell,
      count: 2
    },
    {
      id: "support",
      title: "Soporte técnico",
      subtitle: "Ayuda y contacto",
      icon: Headphones,
      count: null
    }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">

      <div className="px-5 py-6 pb-24">

        {/* User Information Card */}
        <div 
          className="bg-white p-5 mb-6 shadow-sm"
          style={{ borderRadius: '20px' }}
        >
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-technician-primary rounded-full flex items-center justify-center">
              {userData.avatar ? (
                <img 
                  src={userData.avatar} 
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <User className="w-8 h-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-foreground">{userData.name}</h2>
              <p className="text-muted-foreground text-sm">{userData.email}</p>
              <p className="text-xs text-muted-foreground mt-1">Miembro desde {userData.joinDate}</p>
            </div>
            <button 
              className="p-2 border border-technician-primary text-technician-primary rounded-full hover:bg-technician-primary hover:text-white transition-colors"
              style={{ borderRadius: '12px' }}
            >
              <Edit className="w-4 h-4" />
            </button>
          </div>

          {/* Edit Profile Button */}
          <button 
            className="w-full mt-4 py-3 border border-technician-primary text-technician-primary font-medium rounded-xl hover:bg-technician-primary hover:text-white transition-colors"
            style={{ borderRadius: '16px' }}
          >
            Editar Perfil
          </button>
        </div>


        {/* Quick Access Items */}
        <div 
          className="bg-white shadow-sm mb-6"
          style={{ borderRadius: '20px' }}
        >
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-foreground">Accesos rápidos</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {quickAccessItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === "notifications") {
                    setShowNotifications(true);
                  } else {
                    // Handle other navigation items
                    console.log("Navigate to:", item.id);
                  }
                }}
                className="w-full p-5 flex items-center space-x-4 hover:bg-gray-50 transition-colors active:bg-gray-100"
              >
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-technician-primary" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    {item.count && (
                      <span className="bg-technician-primary text-white text-xs px-2 py-1 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>

        {/* Role Change Card */}
        <div 
          className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 shadow-sm"
          style={{ borderRadius: '20px' }}
        >
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-1">
                ¿Necesitas un servicio como cliente?
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Puedes cambiar de rol para solicitar ayuda como cliente.
              </p>
              <button
                className="bg-technician-primary text-white px-6 py-3 font-medium flex items-center space-x-2 hover:bg-orange-600 transition-colors"
                style={{ borderRadius: '16px' }}
              >
                <UserCheck className="w-4 h-4" />
                <span>Regresar a rol de Cliente</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <BottomNavigation />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}

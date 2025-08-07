import { useState, useEffect } from "react";
import {
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
  ChevronRight,
  ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import NotificationsModal from "../components/NotificationsModal";
import CertificationBanner from "../components/CertificationBanner";
import useScrollToTop from "../hooks/use-scroll-to-top";

interface TechnicianProfileProps {
  isVerified?: boolean;
  showVerificationBanner?: boolean;
}

export default function TechnicianProfile({ 
  isVerified = true, 
  showVerificationBanner = true 
}: TechnicianProfileProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showBanner, setShowBanner] = useState(showVerificationBanner);

  // User data (in a real app, this would come from a context or API)
  const userData = {
    name: "Carlos Mendoza",
    email: "carlos.mendoza@fixit.com",
    avatar: null, // null = no image uploaded
    completedServices: 156,
    averageRating: 4.8,
    responseTime: "15 min",
    joinDate: "Enero 2023",
    isVerified: isVerified
  };

  const handleBannerClose = () => {
    setShowBanner(false);
    // In a real app, you would also update the backend to mark banner as seen
    localStorage.setItem('certificationBannerSeen', 'true');
  };

  const performanceStats = [
    {
      title: "Calificación promedio",
      value: userData.averageRating,
      icon: Star,
      color: "text-yellow-500"
    },
    {
      title: "Servicios completados",
      value: userData.completedServices,
      icon: TrendingUp,
      color: "text-green-500"
    },
    {
      title: "Tiempo de respuesta",
      value: userData.responseTime,
      icon: Clock,
      color: "text-blue-500"
    }
  ];

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
      <div className="px-4 pt-8 pb-24 overflow-y-auto"
           style={{ minHeight: 'calc(100vh - 56px)' }}>

        {/* User Information Card with Verification Badge */}
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
              <div className="flex items-center space-x-2 mb-1">
                <h2 className="text-lg font-semibold text-foreground">{userData.name}</h2>
                {userData.isVerified && (
                  <div className="group relative">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 hidden sm:block">
                      Técnico certificado por FixIt Home
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                    </div>
                  </div>
                )}
              </div>
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

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {performanceStats.map((stat, index) => (
            <div 
              key={index}
              className="bg-white p-4 text-center shadow-sm"
              style={{ borderRadius: '16px' }}
            >
              <stat.icon className={`w-6 h-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Access Items */}
        <div
          className="bg-white shadow-sm mb-6"
          style={{ borderRadius: '20px' }}
        >
          <div className="px-5 py-4 border-b border-gray-100">
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
                className="w-full px-5 py-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors active:bg-gray-100 touch-manipulation"
              >
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-technician-primary" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{item.title}</h4>
                    {item.count && (
                      <span className="bg-technician-primary text-white text-xs px-2 py-1 rounded-full flex-shrink-0">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Role Change Section */}
        <div className="text-center mb-6">
          <div
            className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 shadow-sm mb-4"
            style={{ borderRadius: '20px' }}
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              ¿Necesitas un servicio como cliente?
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Puedes cambiar de rol para solicitar ayuda como cliente.
            </p>
          </div>

          <button
            className="w-full max-w-sm mx-auto border-2 border-technician-primary text-technician-primary px-6 py-3 font-medium flex items-center justify-center space-x-2 hover:bg-technician-primary hover:text-white transition-colors"
            style={{ borderRadius: '16px' }}
          >
            <UserCheck className="w-5 h-5" />
            <span>Volver a rol de Cliente</span>
          </button>
        </div>
      </div>

      <BottomNavigation />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Certification Banner */}
      <CertificationBanner
        isVisible={showBanner && userData.isVerified}
        onClose={handleBannerClose}
      />
    </div>
  );
}

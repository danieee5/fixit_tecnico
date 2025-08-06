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

export default function Profile() {
  const [currentRole, setCurrentRole] = useState("tecnico");

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
      count: null
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
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-border px-5 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="mr-4">
              <ArrowLeft className="w-6 h-6 text-muted-foreground" />
            </Link>
            <h1 className="text-xl font-semibold text-foreground">Mi Perfil</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="w-6 h-6 text-muted-foreground" />
          </button>
        </div>
      </header>

      <div className="px-5 py-6 pb-24">
        {/* Role Selector */}
        <div className="mb-6">
          <div 
            className="flex bg-gray-100 p-1 rounded-full"
            style={{ borderRadius: '20px' }}
          >
            <button
              onClick={() => setCurrentRole("tecnico")}
              className={`flex-1 py-2 px-4 rounded-full font-medium text-sm transition-colors ${
                currentRole === "tecnico"
                  ? "bg-technician-primary text-white shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Técnico
            </button>
            <button
              onClick={() => setCurrentRole("cliente")}
              className={`flex-1 py-2 px-4 rounded-full font-medium text-sm transition-colors ${
                currentRole === "cliente"
                  ? "bg-technician-primary text-white shadow-sm"
                  : "text-muted-foreground"
              }`}
            >
              Cliente
            </button>
          </div>
        </div>

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

        {/* Performance Summary */}
        <div 
          className="bg-white p-5 mb-6 shadow-sm"
          style={{ borderRadius: '20px' }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Resumen de actividad</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Briefcase className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userData.completedServices}</p>
              <p className="text-xs text-muted-foreground">Servicios completados</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userData.averageRating}</p>
              <p className="text-xs text-muted-foreground">Calificación promedio</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{userData.responseTime}</p>
              <p className="text-xs text-muted-foreground">Tiempo respuesta</p>
            </div>
          </div>
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

        {/* Additional Stats */}
        <div 
          className="bg-white p-5 mt-6 shadow-sm"
          style={{ borderRadius: '20px' }}
        >
          <h3 className="text-lg font-semibold text-foreground mb-4">Estadísticas del mes</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <span className="text-foreground">Ingresos totales</span>
              </div>
              <span className="font-semibold text-technician-primary">$2,840</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Work className="w-5 h-5 text-blue-500" />
                <span className="text-foreground">Servicios este mes</span>
              </div>
              <span className="font-semibold text-foreground">23</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-foreground">Nuevas reseñas</span>
              </div>
              <span className="font-semibold text-foreground">12</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

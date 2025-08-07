import { useState } from "react";
import {
  X,
  MapPin,
  CheckCircle,
  Camera,
  Clock,
  MessageCircle,
  Star,
  Filter,
  Bell,
  ShieldCheck
} from "lucide-react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Notification types for technicians
const notificationsData = [
  {
    id: "0",
    type: "certificacion",
    title: "¡Felicidades! Has sido certificado",
    description: "Tu perfil ahora cuenta con el distintivo de técnico verificado.",
    time: "Hoy, 11:30 AM",
    icon: ShieldCheck,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    isUnread: true,
    action: "Ver",
    requestId: "CERT-001",
    redirectTo: "/perfil-tecnico"
  },
  {
    id: "1",
    type: "nueva_solicitud",
    title: "Nueva solicitud en tu zona",
    description: "Nueva solicitud disponible cerca de ti en categoría Plomería",
    time: "Hoy, 10:12 AM",
    icon: MapPin,
    iconColor: "text-technician-primary",
    iconBg: "bg-orange-100",
    isUnread: true,
    action: "Ver",
    requestId: "REQ-123456"
  },
  {
    id: "2",
    type: "solicitud_aceptada",
    title: "Solicitud aceptada",
    description: "Has aceptado la solicitud #123456. Contacta al cliente.",
    time: "Hoy, 9:45 AM",
    icon: CheckCircle,
    iconColor: "text-green-600",
    iconBg: "bg-green-100",
    isUnread: true,
    action: "Ir",
    requestId: "REQ-123456"
  },
  {
    id: "3",
    type: "nuevas_fotos",
    title: "Cliente subió nuevas fotos",
    description: "La solicitud #123456 ha sido actualizada con nuevas imágenes.",
    time: "Hoy, 8:30 AM",
    icon: Camera,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-100",
    isUnread: false,
    action: "Ver",
    requestId: "REQ-123456"
  },
  {
    id: "4",
    type: "recordatorio",
    title: "Recordatorio de servicio",
    description: "Tienes una solicitud pendiente para hoy a las 3:00 PM.",
    time: "Hoy, 8:00 AM",
    icon: Clock,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    isUnread: false,
    action: "Ver",
    requestId: "REQ-789012"
  },
  {
    id: "5",
    type: "mensaje_cliente",
    title: "Nuevo mensaje del cliente",
    description: "Juan Pérez te ha enviado un mensaje en la solicitud #123456.",
    time: "Ayer, 6:20 PM",
    icon: MessageCircle,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-100",
    isUnread: false,
    action: "Ver",
    requestId: "REQ-123456"
  },
  {
    id: "6",
    type: "calificacion",
    title: "Recibiste una calificación",
    description: "Tu servicio fue calificado con 5 estrellas por María R.",
    time: "Ayer, 4:15 PM",
    icon: Star,
    iconColor: "text-yellow-600",
    iconBg: "bg-yellow-100",
    isUnread: false,
    action: "Ver",
    requestId: "REQ-654321"
  },
  {
    id: "7",
    type: "nueva_solicitud",
    title: "Nueva solicitud en tu zona",
    description: "Nueva solicitud disponible cerca de ti en categoría Electricidad",
    time: "Ayer, 2:30 PM",
    icon: MapPin,
    iconColor: "text-technician-primary",
    iconBg: "bg-orange-100",
    isUnread: false,
    action: "Ver",
    requestId: "REQ-789013"
  },
  {
    id: "8",
    type: "recordatorio",
    title: "Recordatorio de servicio",
    description: "No olvides confirmar tu cita de mañana a las 10:00 AM.",
    time: "Ayer, 1:00 PM",
    icon: Clock,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-100",
    isUnread: false,
    action: "Ver",
    requestId: "REQ-456789"
  }
];

export default function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const [filterType, setFilterType] = useState<string>("all");

  const unreadCount = notificationsData.filter(n => n.isUnread).length;

  const filteredNotifications = filterType === "all" 
    ? notificationsData 
    : notificationsData.filter(n => n.type === filterType);

  const markAllAsRead = () => {
    // In a real app, this would update the state/API
    console.log("Marking all notifications as read");
  };

  const handleNotificationClick = (notification: any) => {
    // In a real app, this would navigate to the appropriate page
    if (notification.redirectTo) {
      console.log("Navigating to:", notification.redirectTo);
      // Navigate to profile or specific page
      window.location.href = notification.redirectTo;
    } else {
      console.log("Navigating to:", notification.requestId);
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Container */}
      <div 
        className="relative w-full max-w-md mx-4 max-h-[80vh] flex flex-col"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/20">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-foreground" />
          </button>
          
          <h2 className="text-xl font-semibold text-foreground">Notificaciones</h2>
          
          <button 
            onClick={markAllAsRead}
            className="text-sm text-technician-primary font-medium hover:text-orange-600 transition-colors"
          >
            Marcar todas
          </button>
        </div>

        {/* Filter Options */}
        <div className="px-5 py-3 border-b border-white/20">
          <div className="flex items-center space-x-2 overflow-x-auto">
            <button
              onClick={() => setFilterType("all")}
              className={`flex items-center space-x-2 px-3 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                filterType === "all"
                  ? "bg-technician-primary text-white"
                  : "bg-white/50 text-muted-foreground"
              }`}
              style={{borderRadius: '20px'}}
            >
              <span>Todas</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                filterType === "all"
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {notificationsData.length}
              </span>
            </button>
            
            <button
              onClick={() => setFilterType("nueva_solicitud")}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                filterType === "nueva_solicitud"
                  ? "bg-technician-primary text-white"
                  : "bg-white/50 text-muted-foreground"
              }`}
              style={{borderRadius: '20px'}}
            >
              Solicitudes
            </button>
            
            <button
              onClick={() => setFilterType("mensaje_cliente")}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                filterType === "mensaje_cliente"
                  ? "bg-technician-primary text-white"
                  : "bg-white/50 text-muted-foreground"
              }`}
              style={{borderRadius: '20px'}}
            >
              Mensajes
            </button>
            
            <button
              onClick={() => setFilterType("recordatorio")}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                filterType === "recordatorio"
                  ? "bg-technician-primary text-white"
                  : "bg-white/50 text-muted-foreground"
              }`}
              style={{borderRadius: '20px'}}
            >
              Recordatorios
            </button>

            <button
              onClick={() => setFilterType("certificacion")}
              className={`px-3 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                filterType === "certificacion"
                  ? "bg-technician-primary text-white"
                  : "bg-white/50 text-muted-foreground"
              }`}
              style={{borderRadius: '20px'}}
            >
              Certificación
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`relative p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${
                notification.isUnread 
                  ? 'bg-white/80 shadow-lg' 
                  : 'bg-white/60 shadow-sm'
              }`}
              style={{
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: notification.type === "certificacion" && notification.isUnread
                  ? '1px solid rgba(33, 150, 243, 0.4)'
                  : notification.isUnread
                    ? '1px solid rgba(234, 139, 73, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.4)'
              }}
            >
              {/* Unread indicator */}
              {notification.isUnread && (
                <div className="absolute top-3 right-3 w-3 h-3 bg-technician-primary rounded-full"></div>
              )}

              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`w-12 h-12 ${notification.iconBg} rounded-full flex items-center justify-center`}>
                  <notification.icon className={`w-6 h-6 ${notification.iconColor}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground text-sm mb-1">
                    {notification.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                    {notification.description}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>

                {/* Action Button */}
                <button 
                  className="px-3 py-1 bg-technician-primary text-white text-xs font-medium hover:bg-orange-600 transition-colors"
                  style={{borderRadius: '12px'}}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNotificationClick(notification);
                  }}
                >
                  {notification.action}
                </button>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No hay notificaciones</h3>
              <p className="text-muted-foreground">
                No tienes notificaciones en esta categoría.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {unreadCount > 0 && (
          <div className="p-4 border-t border-white/20">
            <p className="text-center text-sm text-muted-foreground">
              Tienes <span className="font-semibold text-technician-primary">{unreadCount}</span> notificaciones sin leer
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

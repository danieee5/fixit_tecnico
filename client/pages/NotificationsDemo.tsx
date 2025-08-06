import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationsModal from "../components/NotificationsModal";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

export default function NotificationsDemo() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="min-h-screen bg-background font-inter">
      <Header 
        userName="Carlos"
        location="Centro, Caracas" 
        notificationCount={2}
      />

      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-technician-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Bell className="w-12 h-12 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Demo de Notificaciones
          </h1>
          
          <p className="text-muted-foreground mb-8 max-w-md">
            Prueba el modal de notificaciones con diseño glassmorphism y Material Design 3
          </p>
          
          <button 
            onClick={() => setShowNotifications(true)}
            className="btn-primary px-8 py-4 text-lg"
          >
            Abrir Notificaciones
          </button>

          <div className="mt-8 grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">Características</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Glassmorphism</li>
                <li>• Material Design 3</li>
                <li>• 8 tipos de notificaciones</li>
                <li>• Filtros por categoría</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <h3 className="font-semibold text-foreground mb-2">Interacciones</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Tap para ver detalles</li>
                <li>• Marcar como leídas</li>
                <li>• Feedback táctil</li>
                <li>• Scroll vertical</li>
              </ul>
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

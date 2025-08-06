import { useState } from "react";
import {
  Calendar,
  Clock,
  DollarSign,
  Phone,
  Eye,
  CheckCircle,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Zap,
  Wrench,
  Settings,
  Hammer
} from "lucide-react";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import { getCategoryInfo, getSubcategoryInfo, getStatusStyle } from "../lib/categories";

// Dummy data for technician requests
const requestsData = {
  disponibles: [
    {
      id: "REQ-001",
      title: "Electricidad - Instalación",
      category: "electricidad",
      subcategory: "instalacion",
      description: "Instalar nuevos interruptores y tomacorrientes en sala y dormitorio principal",
      fullDescription: "Necesito instalar 3 interruptores nuevos en la sala y 2 tomacorrientes adicionales en el dormitorio principal. El trabajo incluye hacer las conexiones necesarias y asegurar que todo quede funcionando correctamente.",
      client: "María González",
      date: "2024-03-15",
      time: "14:30",
      location: "Centro",
      address: "Av. Libertador 1234, Apt 5B",
      price: 85,
      urgency: "normal",
      status: "publicado",
      isNew: true,
      validationCode: "K8S9ZP",
      photos: ["photo1.jpg", "photo2.jpg"],
      clientPhone: "+58 412-123-4567"
    },
    {
      id: "REQ-002",
      title: "Plomería - Reparación",
      category: "plomeria",
      subcategory: "reparacion",
      description: "Reparar fuga de agua en grifería de cocina",
      fullDescription: "Hay una fuga constante en el grifo de la cocina que está causando desperdicio de agua. El grifo gotea incluso cuando está cerrado completamente.",
      client: "Carlos Mendoza",
      date: "2024-03-15",
      time: "09:00",
      location: "Norte",
      address: "Calle 45 #12-34",
      price: 65,
      urgency: "urgente",
      status: "publicado",
      isNew: false,
      validationCode: "L9K3XM",
      photos: ["photo3.jpg"],
      clientPhone: "+58 414-567-8901"
    },
    {
      id: "REQ-003",
      title: "Electrodomésticos - Mantenimiento", 
      category: "Electrodomésticos",
      subcategory: "Mantenimiento",
      description: "Revisión y limpieza de aire acondicionado, no enfría bien",
      client: "Ana López",
      date: "2024-03-16",
      time: "16:00",
      location: "Centro",
      address: "Carrera 15 #78-90",
      price: 120,
      urgency: "Normal",
      status: "Publicado",
      icon: Settings,
      isNew: true
    }
  ],
  enProgreso: [
    {
      id: "REQ-004",
      title: "Carpintería - Instalación",
      category: "Carpintería", 
      subcategory: "Instalación",
      description: "Instalación de estantería empotrada en habitación",
      client: "Roberto Silva",
      date: "2024-03-14",
      time: "10:00",
      location: "Sur",
      address: "Calle 67 #89-12",
      price: 150,
      urgency: "Normal",
      status: "En progreso",
      icon: Hammer,
      progress: 65,
      appointmentTime: "10:00 - 14:00",
      clientPhone: "+58 412-345-6789"
    },
    {
      id: "REQ-005",
      title: "Electricidad - Reparación",
      category: "Electricidad",
      subcategory: "Reparación", 
      description: "Revisar sistema eléctrico, cortes de luz frecuentes",
      client: "Elena Vargas",
      date: "2024-03-14",
      time: "15:30",
      location: "Este",
      address: "Av. Principal 567",
      price: 95,
      urgency: "Urgente",
      status: "En progreso",
      icon: Zap,
      progress: 30,
      appointmentTime: "15:30 - 18:00",
      clientPhone: "+58 414-789-0123"
    }
  ],
  finalizadas: [
    {
      id: "REQ-006",
      title: "Plomería - Instalación",
      category: "Plomería",
      subcategory: "Instalación",
      description: "Instalación de grifería nueva en baño principal",
      client: "Luis Torres",
      date: "2024-03-13",
      time: "11:00",
      location: "Centro",
      address: "Calle 23 #45-67",
      price: 75,
      urgency: "Normal",
      status: "Finalizado",
      icon: Wrench,
      completedDate: "2024-03-13",
      rating: 4.8
    },
    {
      id: "REQ-007",
      title: "Electricidad - Mantenimiento",
      category: "Electricidad", 
      subcategory: "Mantenimiento",
      description: "Cambio de breakers y revisión de panel eléctrico",
      client: "Patricia Ruiz",
      date: "2024-03-12",
      time: "08:30",
      location: "Norte",
      address: "Av. Central 890",
      price: 110,
      urgency: "Normal",
      status: "Finalizado", 
      icon: Zap,
      completedDate: "2024-03-12",
      rating: 4.9
    }
  ]
};

export default function PantallaSolicitudesTecnico() {
  const [activeTab, setActiveTab] = useState("disponibles");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const tabs = [
    { 
      id: "disponibles", 
      label: "Disponibles", 
      count: requestsData.disponibles.length 
    },
    { 
      id: "enProgreso", 
      label: "En Progreso", 
      count: requestsData.enProgreso.length 
    },
    { 
      id: "finalizadas", 
      label: "Finalizadas", 
      count: requestsData.finalizadas.length 
    }
  ];

  const getActiveRequests = () => {
    let requests = requestsData[activeTab as keyof typeof requestsData] || [];
    
    if (searchQuery.trim()) {
      requests = requests.filter(request => 
        request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return requests;
  };

  const getUrgencyColor = (urgency: string) => {
    return urgency === "Urgente" 
      ? "bg-red-100 text-red-600" 
      : "bg-yellow-100 text-yellow-600";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publicado":
        return "bg-blue-100 text-blue-600";
      case "En progreso":
        return "bg-technician-primary text-white";
      case "Finalizado":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const newNotificationsCount = requestsData.disponibles.filter(r => r.isNew).length;

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Shared Header */}
      <Header
        userName="Carlos"
        location="Centro, Caracas"
        notificationCount={newNotificationsCount}
      />

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar solicitudes..."
            className="input-field w-full pl-10 pr-12"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-6">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "bg-technician-primary text-white"
                  : "bg-white text-muted-foreground border border-border"
              }`}
              style={{borderRadius: '20px'}}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="px-4 pb-20">
        {getActiveRequests().length === 0 ? (
          /* Empty State */
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {searchQuery ? "No se encontraron solicitudes" : "No hay solicitudes disponibles"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "Prueba con otros términos de búsqueda"
                : "No hay solicitudes en esta categoría por ahora"
              }
            </p>
            {activeTab === "disponibles" && !searchQuery && (
              <button className="btn-primary">
                Ver todas las zonas
              </button>
            )}
          </div>
        ) : (
          /* Requests Cards */
          <div className="space-y-4">
            {getActiveRequests().map((request: any) => (
              <div key={request.id} className={`card-soft ${request.isNew ? "ring-2 ring-technician-primary/30" : ""}`}>
                {/* Request Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <request.icon className="w-8 h-8 text-technician-primary mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-foreground">{request.title}</h4>
                        {request.isNew && (
                          <span className="text-xs px-2 py-1 bg-technician-primary text-white font-medium" style={{borderRadius: '12px'}}>
                            Nuevo
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">#{request.id}</p>
                      <p className="text-sm text-foreground mb-2 line-clamp-2">{request.description}</p>
                      <p className="text-sm font-medium text-foreground">Cliente: {request.client}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`text-xs px-3 py-1 font-medium ${getUrgencyColor(request.urgency)}`} style={{borderRadius: '20px'}}>
                      {request.urgency}
                    </span>
                    <span className={`text-xs px-3 py-1 font-medium ${getStatusColor(request.status)}`} style={{borderRadius: '20px'}}>
                      {request.status}
                    </span>
                  </div>
                </div>

                {/* Request Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{request.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{request.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-technician-primary" />
                    <span className="font-medium text-technician-primary">${request.price}</span>
                  </div>
                </div>

                {/* Progress Bar for In Progress requests */}
                {activeTab === "enProgreso" && request.progress && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progreso del servicio</span>
                      <span className="text-xs font-medium text-foreground">{request.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-technician-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${request.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Rating for Completed requests */}
                {activeTab === "finalizadas" && request.rating && (
                  <div className="mb-4 flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Calificación:</span>
                    <div className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span className="text-sm font-medium text-foreground">{request.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">• Completado {request.completedDate}</span>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center space-x-3">
                  {activeTab === "disponibles" && (
                    <>
                      <button className="flex-1 btn-primary py-2">
                        Aceptar solicitud
                      </button>
                      <button className="px-4 py-2 border border-technician-primary text-technician-primary font-medium text-sm flex items-center space-x-1" style={{borderRadius: '20px'}}>
                        <Eye className="w-4 h-4" />
                        <span>Ver detalles</span>
                      </button>
                    </>
                  )}
                  
                  {activeTab === "enProgreso" && (
                    <>
                      <button className="flex-1 text-technician-primary font-medium text-sm flex items-center justify-center space-x-1 py-2 border border-technician-primary" style={{borderRadius: '20px'}}>
                        <Calendar className="w-4 h-4" />
                        <span>Ver cita</span>
                      </button>
                      <button className="px-4 py-2 text-technician-primary font-medium text-sm flex items-center space-x-1 border border-technician-primary" style={{borderRadius: '20px'}}>
                        <Phone className="w-4 h-4" />
                        <span>Contactar</span>
                      </button>
                      <button className="px-4 py-2 btn-primary">
                        Finalizar
                      </button>
                    </>
                  )}
                  
                  {activeTab === "finalizadas" && (
                    <button className="flex-1 text-technician-primary font-medium text-sm flex items-center justify-center space-x-1 py-2 border border-technician-primary" style={{borderRadius: '20px'}}>
                      <Eye className="w-4 h-4" />
                      <span>Ver detalles</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

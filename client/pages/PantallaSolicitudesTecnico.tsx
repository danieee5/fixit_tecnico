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
  MapPin
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
      category: "electrodomesticos",
      subcategory: "mantenimiento",
      description: "Revisión y limpieza de aire acondicionado, no enfría bien",
      fullDescription: "El aire acondicionado de la habitación principal no está enfriando como debería. Necesita una revisión completa y limpieza del filtro y sistema interno.",
      client: "Ana López",
      date: "2024-03-16",
      time: "16:00",
      location: "Centro",
      address: "Carrera 15 #78-90",
      price: 120,
      urgency: "normal",
      status: "publicado",
      isNew: true,
      validationCode: "M2N7QR",
      photos: ["photo4.jpg", "photo5.jpg"],
      clientPhone: "+58 416-234-5678"
    }
  ],
  enProgreso: [
    {
      id: "REQ-004",
      title: "Carpintería - Instalación",
      category: "carpinteria", 
      subcategory: "instalacion",
      description: "Instalación de estantería empotrada en habitación",
      fullDescription: "Instalación completa de estantería empotrada en habitación principal con 5 niveles y sistema de iluminación LED integrado.",
      client: "Roberto Silva",
      date: "2024-03-14",
      time: "10:00",
      location: "Sur",
      address: "Calle 67 #89-12",
      price: 150,
      urgency: "normal",
      status: "en progreso",
      progress: 65,
      appointmentTime: "10:00 - 14:00",
      clientPhone: "+58 412-345-6789",
      validationCode: "P5T8WX"
    },
    {
      id: "REQ-005",
      title: "Electricidad - Reparación",
      category: "electricidad",
      subcategory: "reparacion", 
      description: "Revisar sistema eléctrico, cortes de luz frecuentes",
      fullDescription: "Revisar completamente el sistema eléctrico de la casa debido a cortes de luz frecuentes. Verificar panel principal y conexiones.",
      client: "Elena Vargas",
      date: "2024-03-14",
      time: "15:30",
      location: "Este",
      address: "Av. Principal 567",
      price: 95,
      urgency: "urgente",
      status: "en progreso",
      progress: 30,
      appointmentTime: "15:30 - 18:00",
      clientPhone: "+58 414-789-0123",
      validationCode: "R7Y3VK"
    }
  ],
  finalizadas: [
    {
      id: "REQ-006",
      title: "Plomería - Instalación",
      category: "plomeria",
      subcategory: "instalacion",
      description: "Instalación de grifería nueva en baño principal",
      fullDescription: "Instalación completa de grifería nueva en baño principal, incluyendo ducha y lavamanos con acabados modernos.",
      client: "Luis Torres",
      date: "2024-03-13",
      time: "11:00",
      location: "Centro",
      address: "Calle 23 #45-67",
      price: 75,
      urgency: "normal",
      status: "finalizado",
      completedDate: "2024-03-13",
      rating: 4.8,
      validationCode: "H4J9BN"
    },
    {
      id: "REQ-007",
      title: "Electricidad - Mantenimiento",
      category: "electricidad", 
      subcategory: "mantenimiento",
      description: "Cambio de breakers y revisión de panel eléctrico",
      fullDescription: "Cambio completo de breakers antiguos y revisión general del panel eléctrico para mejorar la seguridad del hogar.",
      client: "Patricia Ruiz",
      date: "2024-03-12",
      time: "08:30",
      location: "Norte",
      address: "Av. Central 890",
      price: 110,
      urgency: "normal",
      status: "finalizado", 
      completedDate: "2024-03-12",
      rating: 4.9,
      validationCode: "Z8X5CP"
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

  const newNotificationsCount = requestsData.disponibles.filter(r => r.isNew).length;

  const toggleCardExpansion = (requestId: string) => {
    setExpandedCard(expandedCard === requestId ? null : requestId);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Shared Header */}
      <Header 
        userName="Carlos"
        location="Centro, Caracas" 
        notificationCount={newNotificationsCount}
      />

      {/* Search Bar */}
      <div style={{padding: '16px 20px'}}>
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
      <div style={{padding: '0 20px 24px 20px'}}>
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
      <div style={{padding: '0 20px 100px 20px'}}>
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
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
            {getActiveRequests().map((request: any) => {
              const categoryInfo = getCategoryInfo(request.category);
              const subcategoryInfo = getSubcategoryInfo(request.subcategory);
              const isExpanded = expandedCard === request.id;

              return (
                <div 
                  key={request.id} 
                  className={request.isNew ? "ring-2 ring-technician-primary/30" : ""} 
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '20px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  {/* Request Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-full" style={{backgroundColor: `${categoryInfo.color}20`}}>
                        <categoryInfo.icon className="w-6 h-6" style={{color: categoryInfo.color}} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-foreground">
                            {categoryInfo.name} - {subcategoryInfo.name}
                          </h4>
                          {request.isNew && (
                            <span className={`text-xs px-2 py-1 font-medium ${getStatusStyle("nuevo")}`} style={{borderRadius: '12px'}}>
                              Nuevo
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">#{request.id}</p>
                        <p className="text-sm text-foreground mb-2">{request.description}</p>
                        <p className="text-sm font-medium text-foreground">Cliente: {request.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`text-xs px-3 py-1 font-medium ${getStatusStyle(request.urgency)}`} style={{borderRadius: '20px'}}>
                        {request.urgency.charAt(0).toUpperCase() + request.urgency.slice(1)}
                      </span>
                      <span className={`text-xs px-3 py-1 font-medium ${getStatusStyle(request.status)}`} style={{borderRadius: '20px'}}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
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

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="mb-4 p-4 bg-gray-50 rounded-2xl">
                      <h5 className="font-semibold text-foreground mb-2">Descripción completa:</h5>
                      <p className="text-sm text-foreground mb-4">{request.fullDescription}</p>
                      
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-foreground">Dirección completa:</span>
                          <p className="text-muted-foreground">{request.address}</p>
                        </div>
                        
                        <div>
                          <span className="font-medium text-foreground">Código de validación:</span>
                          <p className="text-technician-primary font-mono">{request.validationCode}</p>
                        </div>

                        {request.photos && (
                          <div>
                            <span className="font-medium text-foreground">Fotos adjuntas:</span>
                            <div className="flex space-x-2 mt-1">
                              {request.photos.map((photo, index) => (
                                <div key={index} className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                                  <Eye className="w-4 h-4 text-gray-400" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-3">
                    {activeTab === "disponibles" && (
                      <>
                        <button className="flex-1 btn-primary py-2">
                          Aceptar solicitud
                        </button>
                        <button 
                          onClick={() => toggleCardExpansion(request.id)}
                          className="px-4 py-2 border border-technician-primary text-technician-primary font-medium text-sm flex items-center space-x-1" 
                          style={{borderRadius: '20px'}}
                        >
                          <Eye className="w-4 h-4" />
                          <span>Ver detalles</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
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
                      <button 
                        onClick={() => toggleCardExpansion(request.id)}
                        className="flex-1 text-technician-primary font-medium text-sm flex items-center justify-center space-x-1 py-2 border border-technician-primary" 
                        style={{borderRadius: '20px'}}
                      >
                        <Eye className="w-4 h-4" />
                        <span>Ver detalles</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

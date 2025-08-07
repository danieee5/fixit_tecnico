import { useState } from "react";
import { 
  Calendar,
  Clock,
  DollarSign,
  Eye,
  Search,
  Filter,
  MapPin,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";
import NotificationsModal from "../components/NotificationsModal";

export default function PantallaSolicitudesTecnico() {
  const [activeTab, setActiveTab] = useState("disponibles");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);

  const tabs = [
    { id: "disponibles", label: "Disponibles", count: 3 },
    { id: "enProgreso", label: "En Progreso", count: 2 },
    { id: "finalizadas", label: "Finalizadas", count: 2 }
  ];

  const sampleRequests = [
    {
      id: "REQ-001",
      title: "Electricidad - Instalación",
      description: "Instalar nuevos interruptores y tomacorrientes",
      client: "María González",
      date: "2024-03-15",
      time: "14:30",
      location: "Centro",
      price: 85,
      urgency: "Normal",
      status: "Publicado",
      isNew: true
    },
    {
      id: "REQ-002",
      title: "Plomería - Reparación", 
      description: "Reparar fuga de agua en grifería de cocina",
      client: "Carlos Mendoza",
      date: "2024-03-15",
      time: "09:00",
      location: "Norte",
      price: 65,
      urgency: "Urgente",
      status: "Publicado",
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Shared Header */}
      <Header 
        userName="Carlos"
        location="Centro, Caracas" 
        notificationCount={2}
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
        <div style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          {sampleRequests.map((request) => (
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
                  <div className="p-2 rounded-full bg-yellow-100">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{request.title}</h4>
                      {request.isNew && (
                        <span className="text-xs px-2 py-1 bg-orange-500 text-white font-medium" style={{borderRadius: '12px'}}>
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
                  <span className={`text-xs px-3 py-1 font-medium ${
                    request.urgency === "Urgente" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                  }`} style={{borderRadius: '20px'}}>
                    {request.urgency}
                  </span>
                  <span className="text-xs px-3 py-1 font-medium bg-blue-100 text-blue-600" style={{borderRadius: '20px'}}>
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

              {/* Actions */}
              <div className="flex items-center space-x-3">
                <button className="flex-1 btn-primary py-2">
                  Aceptar solicitud
                </button>
                <button className="px-4 py-2 border border-technician-primary text-technician-primary font-medium text-sm flex items-center space-x-1" style={{borderRadius: '20px'}}>
                  <Eye className="w-4 h-4" />
                  <span>Ver detalles</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

import { useState } from "react";
import { ArrowLeft, Zap, Wrench, Settings, Hammer, Search, Clock, MapPin, DollarSign, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

const solicitudesData = [
  {
    id: 1,
    service: "Reparación de lavadora",
    client: "Ana López",
    location: "2.5 km",
    address: "Calle 12 #34-56, Apto 301",
    time: "30 min",
    urgency: "Urgente",
    price: "$85",
    description: "Lavadora no centrifuga, hace ruido extraño al lavar",
    icon: Settings,
    distance: 2.5,
    timePosted: "Hace 15 min"
  },
  {
    id: 2,
    service: "Cambio de interruptor",
    client: "Roberto Silva",
    location: "1.8 km",
    address: "Av. Principal 789, Casa 45",
    time: "15 min",
    urgency: "Normal",
    price: "$45",
    description: "Interruptor de luz de sala no funciona, posible cortocircuito",
    icon: Zap,
    distance: 1.8,
    timePosted: "Hace 25 min"
  },
  {
    id: 3,
    service: "Instalación de grifo",
    client: "Carmen Morales",
    location: "3.2 km",
    address: "Carrera 45 #67-89",
    time: "45 min",
    urgency: "Normal",
    price: "$70",
    description: "Instalar grifo nuevo en cocina, incluye conexiones",
    icon: Wrench,
    distance: 3.2,
    timePosted: "Hace 1 hora"
  },
  {
    id: 4,
    service: "Reparación de estantería",
    client: "Diego Hernández",
    location: "4.1 km",
    address: "Calle 78 #12-34",
    time: "1 hora",
    urgency: "Baja",
    price: "$120",
    description: "Estantería se cayó, necesita refuerzo y reinstalación",
    icon: Hammer,
    distance: 4.1,
    timePosted: "Hace 2 horas"
  },
  {
    id: 5,
    service: "Revisión eléctrica",
    client: "Elena Vargas",
    location: "1.2 km",
    address: "Av. Libertador 234",
    time: "20 min",
    urgency: "Urgente",
    price: "$95",
    description: "Cortes de luz frecuentes, revisar panel eléctrico",
    icon: Zap,
    distance: 1.2,
    timePosted: "Hace 5 min"
  },
  {
    id: 6,
    service: "Instalación de ducha",
    client: "Fernando Castro",
    location: "5.8 km",
    address: "Calle 90 #56-78",
    time: "2 horas",
    urgency: "Normal",
    price: "$150",
    description: "Instalar ducha nueva, incluye conexiones de agua caliente y fría",
    icon: Wrench,
    distance: 5.8,
    timePosted: "Hace 3 horas"
  }
];

export default function PantallaSolicitudes() {
  const [selectedFilter, setSelectedFilter] = useState("todas");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "todas", label: "Todas", count: solicitudesData.length },
    { id: "Urgente", label: "Urgentes", count: solicitudesData.filter(s => s.urgency === "Urgente").length },
    { id: "cercanas", label: "Cercanas", count: solicitudesData.filter(s => s.distance <= 3).length },
    { id: "mejor_pago", label: "Mejor pago", count: solicitudesData.filter(s => parseInt(s.price.replace('$', '')) >= 100).length }
  ];

  const filteredSolicitudes = solicitudesData.filter(solicitud => {
    let matchesFilter = true;
    
    switch (selectedFilter) {
      case "Urgente":
        matchesFilter = solicitud.urgency === "Urgente";
        break;
      case "cercanas":
        matchesFilter = solicitud.distance <= 3;
        break;
      case "mejor_pago":
        matchesFilter = parseInt(solicitud.price.replace('$', '')) >= 100;
        break;
    }
    
    const matchesSearch = solicitud.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         solicitud.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         solicitud.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         solicitud.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  // Sort by urgency first, then by distance
  const sortedSolicitudes = filteredSolicitudes.sort((a, b) => {
    if (a.urgency === "Urgente" && b.urgency !== "Urgente") return -1;
    if (b.urgency === "Urgente" && a.urgency !== "Urgente") return 1;
    return a.distance - b.distance;
  });

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "Urgente":
        return "bg-red-100 text-red-600";
      case "Normal":
        return "bg-yellow-100 text-yellow-600";
      case "Baja":
        return "bg-green-100 text-green-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Solicitudes Disponibles</h1>
            <p className="text-sm text-muted-foreground">{sortedSolicitudes.length} solicitudes cerca de ti</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por servicio, cliente o ubicación..."
            className="input-field w-full pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 mb-6">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 font-medium text-sm whitespace-nowrap transition-colors ${
                selectedFilter === filter.id
                  ? "bg-technician-primary text-white"
                  : "bg-white text-muted-foreground border border-border"
              }`}
              style={{borderRadius: '20px'}}
            >
              <span>{filter.label}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                selectedFilter === filter.id
                  ? "bg-white/20 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}>
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Requests List */}
      <div className="px-4 pb-20">
        <div className="space-y-4">
          {sortedSolicitudes.map((solicitud) => (
            <div key={solicitud.id} className="card-soft">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <solicitud.icon className="w-8 h-8 text-technician-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{solicitud.service}</h4>
                      {solicitud.urgency === "Urgente" && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{solicitud.client}</p>
                    <p className="text-xs text-muted-foreground mb-2">{solicitud.address}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{solicitud.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{solicitud.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <DollarSign className="w-3 h-3 text-technician-primary" />
                        <span className="font-medium text-technician-primary">{solicitud.price}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-foreground bg-gray-50 p-2 rounded-lg mb-2">
                      {solicitud.description}
                    </p>
                    
                    <p className="text-xs text-muted-foreground">{solicitud.timePosted}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`text-xs px-3 py-1 font-medium ${getUrgencyColor(solicitud.urgency)}`} style={{borderRadius: '20px'}}>
                    {solicitud.urgency}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="flex-1 btn-primary py-2">
                  Aceptar solicitud
                </button>
                <button className="px-4 py-2 border border-technician-primary text-technician-primary font-medium text-sm" style={{borderRadius: '20px'}}>
                  Ver detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {sortedSolicitudes.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No hay solicitudes</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "No se encontraron solicitudes que coincidan con tu búsqueda." : "No hay solicitudes disponibles en este momento."}
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

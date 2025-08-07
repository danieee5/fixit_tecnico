import { useState } from "react";
import { ArrowLeft, Zap, Wrench, Settings, Hammer, Filter, Search, Clock, MapPin, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import useScrollToTop from "../hooks/use-scroll-to-top";

const servicesData = [
  {
    id: 1,
    client: "María González",
    status: "En progreso",
    description: "Reparación de sistema eléctrico",
    address: "Av. Libertador 1234, Apt 5B",
    progress: 65,
    icon: Zap,
    priority: "alta",
    estimatedTime: "2 horas",
    price: "$120"
  },
  {
    id: 2,
    client: "Juan Pérez",
    status: "Pendiente",
    description: "Instalación de grifería",
    address: "Calle 23 #45-67",
    progress: 20,
    icon: Wrench,
    priority: "media",
    estimatedTime: "1.5 horas",
    price: "$80"
  },
  {
    id: 3,
    client: "Carlos Rodríguez",
    status: "Finalizado",
    description: "Reparación de lavadora",
    address: "Carrera 15 #78-90",
    progress: 100,
    icon: Settings,
    priority: "baja",
    estimatedTime: "1 hora",
    price: "$65"
  },
  {
    id: 4,
    client: "Ana Silva",
    status: "En progreso",
    description: "Instalación de estantería",
    address: "Calle 45 #12-34",
    progress: 45,
    icon: Hammer,
    priority: "media",
    estimatedTime: "3 horas",
    price: "$150"
  },
  {
    id: 5,
    client: "Luis Torres",
    status: "Pendiente",
    description: "Cambio de interruptores",
    address: "Av. Central 567",
    progress: 0,
    icon: Zap,
    priority: "alta",
    estimatedTime: "45 min",
    price: "$45"
  },
  {
    id: 6,
    client: "Patricia Ruiz",
    status: "Finalizado",
    description: "Reparación de grifo cocina",
    address: "Calle 67 #89-12",
    progress: 100,
    icon: Wrench,
    priority: "baja",
    estimatedTime: "30 min",
    price: "$35"
  }
];

export default function PantallaServicios() {
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = [
    { id: "todos", label: "Todos", count: servicesData.length },
    { id: "En progreso", label: "En progreso", count: servicesData.filter(s => s.status === "En progreso").length },
    { id: "Pendiente", label: "Pendiente", count: servicesData.filter(s => s.status === "Pendiente").length },
    { id: "Finalizado", label: "Finalizado", count: servicesData.filter(s => s.status === "Finalizado").length }
  ];

  const filteredServices = servicesData.filter(service => {
    const matchesFilter = selectedFilter === "todos" || service.status === selectedFilter;
    const matchesSearch = service.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "En progreso":
        return "bg-technician-primary text-white";
      case "Pendiente":
        return "bg-yellow-100 text-yellow-700";
      case "Finalizado":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-600";
      case "media":
        return "bg-yellow-100 text-yellow-600";
      case "baja":
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
            <h1 className="text-lg font-semibold text-foreground">Mis Servicios</h1>
            <p className="text-sm text-muted-foreground">{filteredServices.length} servicios</p>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar por cliente, servicio o dirección..."
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

      {/* Services List */}
      <div className="px-4 pb-20">
        <div className="space-y-4">
          {filteredServices.map((service) => (
            <div key={service.id} className="card-soft">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <service.icon className="w-8 h-8 text-technician-primary mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{service.client}</h4>
                      <span className={`text-xs px-2 py-1 font-medium ${getPriorityColor(service.priority)}`} style={{borderRadius: '12px'}}>
                        {service.priority.charAt(0).toUpperCase() + service.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">{service.description}</p>
                    <p className="text-xs text-muted-foreground mb-2">{service.address}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{service.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="font-medium text-technician-primary">{service.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className={`text-xs px-3 py-1 font-medium ${getStatusColor(service.status)}`} style={{borderRadius: '20px'}}>
                  {service.status}
                </span>
              </div>
              
              {service.status !== "Finalizado" && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">Progreso</span>
                    <span className="text-xs font-medium text-foreground">{service.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-technician-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${service.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                {service.status === "Finalizado" ? (
                  <button className="flex-1 text-green-600 font-medium text-sm flex items-center justify-center space-x-2 py-2">
                    <CheckCircle className="w-4 h-4" />
                    <span>Completado</span>
                  </button>
                ) : (
                  <>
                    <button className="flex-1 btn-primary py-2">
                      Ver detalles
                    </button>
                    {service.status === "Pendiente" && (
                      <button className="px-4 py-2 border border-technician-primary text-technician-primary font-medium text-sm" style={{borderRadius: '20px'}}>
                        Iniciar
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No hay servicios</h3>
            <p className="text-muted-foreground">
              {searchQuery ? "No se encontraron servicios que coincidan con tu búsqueda." : "No tienes servicios en esta categoría."}
            </p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}

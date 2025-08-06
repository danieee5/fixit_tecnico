import { useState } from "react";
import { 
  Bell, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MapPin, 
  GraduationCap,
  Gift,
  Award,
  ChevronRight,
  Zap,
  Wrench,
  Hammer,
  Settings,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import BottomNavigation from "../components/BottomNavigation";

// Dummy data for search functionality
const coursesData = [
  {
    id: 1,
    title: "Electricidad Residencial",
    subtitle: "Nivel básico",
    duration: "8 horas",
    rating: 4.8,
    price: "$49",
    originalPrice: "$89",
    icon: Zap,
    category: "electricidad",
    level: "básico"
  },
  {
    id: 2,
    title: "Plomería Avanzada",
    subtitle: "Certificación",
    duration: "12 horas",
    rating: 4.9,
    price: "$69",
    originalPrice: "$120",
    icon: Wrench,
    category: "plomería",
    level: "avanzado"
  },
  {
    id: 3,
    title: "Carpintería Moderna",
    subtitle: "Técnicas nuevas",
    duration: "16 horas",
    rating: 4.7,
    price: "$79",
    originalPrice: "$140",
    icon: Hammer,
    category: "carpintería",
    level: "intermedio"
  },
  {
    id: 4,
    title: "Instalación Básica",
    subtitle: "Módulo inicial",
    duration: "6 horas",
    rating: 4.6,
    price: "Gratis",
    originalPrice: "$45",
    icon: Settings,
    category: "instalación",
    level: "básico",
    type: "beca"
  }
];

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(coursesData);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredCourses(coursesData);
      return;
    }

    const filtered = coursesData.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      course.category.toLowerCase().includes(query.toLowerCase()) ||
      course.level.toLowerCase().includes(query.toLowerCase()) ||
      course.duration.toLowerCase().includes(query.toLowerCase()) ||
      (course.type && course.type.toLowerCase().includes(query.toLowerCase())) ||
      query.toLowerCase().includes("gratis") && course.price === "Gratis" ||
      query.toLowerCase().includes("beca") && course.type === "beca" ||
      query.toLowerCase().includes("descuento") && course.originalPrice
    );
    setFilteredCourses(filtered);
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Shared Header */}
      <Header
        userName="Carlos"
        location="Centro, Caracas"
        notificationCount={3}
      />

      {/* Warm Greeting Section */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center space-x-3">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              ¡Hola, <span className="text-technician-primary">Carlos</span>! 👋
            </h1>
            <p className="text-muted-foreground mt-1">¿Listo para brindar el mejor servicio hoy?</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="¿Qué curso o certificación buscas?"
            className="input-field w-full pl-10 pr-12"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Hero Promotional */}
      <div className="px-4 mb-6">
        <div className="card-glass relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-technician-primary/20 to-technician-secondary/20"></div>
          <div className="relative z-10 p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-foreground mb-2">
                  ¡Capacítate gratis este mes con nuestras becas!
                </h2>
                <p className="text-muted-foreground mb-4">
                  Accede a cursos premium sin costo
                </p>
                <button className="btn-primary">
                  Ver ofertas
                </button>
              </div>
              <div className="ml-4">
                <GraduationCap className="w-12 h-12 text-technician-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Carousel */}
      <div className="mb-6">
        <div className="px-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Cursos disponibles para ti</h3>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {filteredCourses.map((course, index) => (
              <div key={course.id} className="card-soft min-w-[280px] w-72">
                <div className="mb-3">
                  <course.icon className="w-12 h-12 text-technician-primary" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">{course.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{course.subtitle}</p>
                
                <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-technician-primary">{course.price}</span>
                    {course.originalPrice && course.price !== "Gratis" && (
                      <span className="text-sm text-muted-foreground line-through ml-2">{course.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button className="btn-primary w-full">
                  Inscribirse ahora
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scholarships and Promotions */}
      <div className="mb-6">
        <div className="px-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Becas y promociones activas</h3>
        </div>
        <div className="px-4 space-y-4">
          {[
            {
              title: "Beca Completa - Electricidad",
              subtitle: "Curso completo gratuito",
              type: "BECA",
              typeColor: "bg-green-500",
              icon: Award
            },
            {
              title: "50% OFF - Plomería Premium",
              subtitle: "Oferta por tiempo limitado",
              type: "PROMOCIÓN",
              typeColor: "bg-technician-secondary",
              icon: Gift
            }
          ].map((promo, index) => (
            <div key={index} className="card-soft">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-3 py-1 text-white font-medium ${promo.typeColor}`} style={{borderRadius: '20px'}}>
                      {promo.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{promo.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{promo.subtitle}</p>
                  <button className="text-technician-primary font-medium text-sm">
                    Aplicar ahora
                  </button>
                </div>
                <promo.icon className="w-8 h-8 text-technician-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services in Progress */}
      <div className="mb-6">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Tus servicios en curso</h3>
          <Link to="/mis-servicios" className="text-technician-primary font-medium text-sm flex items-center">
            Ver todos
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {[
              {
                client: "María González",
                status: "En progreso",
                description: "Reparación de sistema eléctrico",
                progress: 65,
                icon: Zap
              },
              {
                client: "Juan Pérez",
                status: "Pendiente",
                description: "Instalación de grifería",
                progress: 20,
                icon: Wrench
              }
            ].map((service, index) => (
              <div key={index} className="card-glass min-w-[280px] w-72">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <service.icon className="w-6 h-6 text-technician-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground">{service.client}</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 font-medium ${
                    service.status === "En progreso" 
                      ? "bg-technician-primary text-white" 
                      : "bg-gray-100 text-gray-600"
                  }`} style={{borderRadius: '20px'}}>
                    {service.status}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-technician-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${service.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{service.progress}% completado</p>
                </div>

                <button className="text-technician-primary font-medium text-sm flex items-center">
                  Ver detalles
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* New Requests */}
      <div className="mb-20">
        <div className="px-4 mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Solicitudes cercanas</h3>
          <Link to="/solicitudes" className="text-technician-primary font-medium text-sm flex items-center">
            Ver todas
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {[
              {
                service: "Reparación de lavadora",
                client: "Ana López",
                location: "2.5 km",
                time: "30 min",
                urgency: "Urgente",
                icon: Settings
              },
              {
                service: "Cambio de interruptor",
                client: "Roberto Silva",
                location: "1.8 km",
                time: "15 min",
                urgency: "Normal",
                icon: Zap
              }
            ].map((request, index) => (
              <div key={index} className="card-soft min-w-[280px] w-72">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <request.icon className="w-6 h-6 text-technician-primary mt-1" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{request.service}</h4>
                      <p className="text-sm text-muted-foreground">{request.client}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 font-medium ${
                    request.urgency === "Urgente" 
                      ? "bg-red-100 text-red-600" 
                      : "bg-gray-100 text-gray-600"
                  }`} style={{borderRadius: '20px'}}>
                    {request.urgency}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{request.time}</span>
                  </div>
                </div>

                <button className="btn-primary w-full">
                  Aceptar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

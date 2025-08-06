import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Search,
  Filter,
  Star,
  Clock,
  MapPin,
  GraduationCap,
  Home,
  Wrench,
  User,
  Gift,
  Award,
  ChevronRight,
  Play
} from "lucide-react";

export default function Index() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-foreground">
              Hola, <span className="text-technician-primary">Carlos</span>
            </h1>
            <p className="text-sm text-muted-foreground">¿Listo para trabajar hoy?</p>
          </div>
          <div className="relative">
            <Bell className="w-6 h-6 text-muted-foreground" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-technician-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">3</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="px-4 py-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="¿Qué curso o certificación buscas?"
            className="input-field w-full pl-10 pr-12"
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
            {[
              {
                title: "Electricidad Residencial",
                subtitle: "Nivel básico",
                duration: "8 horas",
                rating: 4.8,
                price: "$49",
                originalPrice: "$89",
                image: "⚡"
              },
              {
                title: "Plomería Avanzada",
                subtitle: "Certificación",
                duration: "12 horas",
                rating: 4.9,
                price: "$69",
                originalPrice: "$120",
                image: "🔧"
              },
              {
                title: "Carpintería Moderna",
                subtitle: "Técnicas nuevas",
                duration: "16 horas",
                rating: 4.7,
                price: "$79",
                originalPrice: "$140",
                image: "🪚"
              }
            ].map((course, index) => (
              <div key={index} className="card-soft min-w-[280px] w-72">
                <div className="text-4xl mb-3">{course.image}</div>
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
                    <span className="text-sm text-muted-foreground line-through ml-2">{course.originalPrice}</span>
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
              typeColor: "bg-green-500"
            },
            {
              title: "50% OFF - Plomería Premium",
              subtitle: "Oferta por tiempo limitado",
              type: "PROMOCIÓN",
              typeColor: "bg-technician-secondary"
            }
          ].map((promo, index) => (
            <div key={index} className="card-soft">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full text-white font-medium ${promo.typeColor}`}>
                      {promo.type}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground mb-1">{promo.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{promo.subtitle}</p>
                  <button className="text-technician-primary font-medium text-sm">
                    Aplicar ahora
                  </button>
                </div>
                <Gift className="w-8 h-8 text-technician-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services in Progress */}
      <div className="mb-6">
        <div className="px-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Tus servicios en curso</h3>
        </div>
        <div className="px-4 space-y-4">
          {[
            {
              client: "María González",
              status: "En progreso",
              description: "Reparación de sistema eléctrico",
              progress: 65
            },
            {
              client: "Juan Pérez",
              status: "Pendiente",
              description: "Instalación de grifería",
              progress: 20
            }
          ].map((service, index) => (
            <div key={index} className="card-glass">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-foreground">{service.client}</h4>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  service.status === "En progreso" 
                    ? "bg-technician-primary text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}>
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

      {/* New Requests */}
      <div className="mb-20">
        <div className="px-4 mb-4">
          <h3 className="text-lg font-semibold text-foreground">Solicitudes cercanas</h3>
        </div>
        <div className="overflow-x-auto">
          <div className="flex space-x-4 px-4">
            {[
              {
                service: "Reparación de lavadora",
                client: "Ana López",
                location: "2.5 km",
                time: "30 min",
                urgency: "Urgente"
              },
              {
                service: "Cambio de interruptor",
                client: "Roberto Silva",
                location: "1.8 km",
                time: "15 min",
                urgency: "Normal"
              }
            ].map((request, index) => (
              <div key={index} className="card-soft min-w-[280px] w-72">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{request.service}</h4>
                    <p className="text-sm text-muted-foreground">{request.client}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    request.urgency === "Urgente" 
                      ? "bg-red-100 text-red-600" 
                      : "bg-gray-100 text-gray-600"
                  }`}>
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

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
        <div className="flex items-center justify-around py-2">
          {[
            { id: "home", icon: Home, label: "Inicio" },
            { id: "certifications", icon: GraduationCap, label: "Certificaciones" },
            { id: "services", icon: Wrench, label: "Servicios" },
            { id: "profile", icon: User, label: "Perfil" }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "text-technician-primary"
                  : "text-muted-foreground"
              }`}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}

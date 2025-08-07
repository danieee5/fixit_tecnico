import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  DollarSign,
  User,
  Phone,
  MessageCircle,
  Zap,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";
import AcceptRequestFlow from "../components/AcceptRequestFlow";

// Sample request data - in real app this would come from API
const getRequestById = (id: string) => {
  const requests = {
    "REQ-001": {
      id: "REQ-001",
      title: "Electricidad - Instalación",
      description: "Instalar nuevos interruptores y tomacorrientes en la sala principal y dormitorio. Se requiere cambiar el cableado de algunos puntos que están obsoletos.",
      client: {
        name: "María González",
        phone: "+593 99 123 4567",
        rating: 4.8,
        reviewsCount: 23
      },
      date: "2024-03-15",
      time: "14:30",
      location: {
        address: "Av. 9 de Octubre 1234, Centro, Guayaquil",
        coordinates: "2.1894° S, 79.8890° W"
      },
      price: {
        suggested: 85,
        negotiable: true
      },
      urgency: "Normal",
      status: "Publicado",
      details: {
        category: "Electricidad",
        estimatedDuration: "3-4 horas",
        toolsRequired: ["Destornilladores", "Alicates", "Multímetro"],
        accessInstructions: "Tocar el timbre del departamento 2B, tercer piso",
        additionalNotes: "La cliente estará disponible todo el día. Hay mascotas en casa (un gato muy tranquilo)."
      },
      code: "A4B7K9",
      createdAt: "2024-03-14 18:30",
      isNew: true
    }
  };
  
  return requests[id as keyof typeof requests] || null;
};

export default function RequestDetail() {
  const { id } = useParams();
  const [showAcceptFlow, setShowAcceptFlow] = useState(false);
  
  const request = getRequestById(id || "");
  
  if (!request) {
    return (
      <div className="min-h-screen bg-background font-inter flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Solicitud no encontrada</h2>
          <Link to="/solicitudes-tecnico" className="text-technician-primary">
            Volver a solicitudes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center">
          <Link to="/solicitudes-tecnico" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Detalle de solicitud</h1>
            <p className="text-sm text-muted-foreground">#{request.id}</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 pb-24">
        {/* Status Banner */}
        <div className="mb-6">
          <div className={`p-4 rounded-2xl ${
            request.isNew 
              ? "bg-orange-50 border border-orange-200" 
              : "bg-blue-50 border border-blue-200"
          }`}>
            <div className="flex items-center space-x-3">
              {request.isNew ? (
                <AlertCircle className="w-6 h-6 text-orange-600" />
              ) : (
                <CheckCircle className="w-6 h-6 text-blue-600" />
              )}
              <div>
                <h3 className={`font-semibold ${
                  request.isNew ? "text-orange-800" : "text-blue-800"
                }`}>
                  {request.isNew ? "Nueva solicitud disponible" : "Solicitud activa"}
                </h3>
                <p className={`text-sm ${
                  request.isNew ? "text-orange-600" : "text-blue-600"
                }`}>
                  {request.isNew 
                    ? "Sé el primero en responder para tener más posibilidades"
                    : "Esta solicitud está esperando respuesta"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Service Information */}
        <div className="card-soft mb-6">
          <div className="flex items-start space-x-4 mb-4">
            <div className="p-3 rounded-full bg-yellow-100">
              <Zap className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-2">{request.title}</h2>
              <div className="flex items-center space-x-4 mb-3">
                <span className={`text-xs px-3 py-1 font-medium ${
                  request.urgency === "Urgente" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                }`} style={{borderRadius: '20px'}}>
                  {request.urgency}
                </span>
                <span className="text-xs px-3 py-1 font-medium bg-blue-100 text-blue-600" style={{borderRadius: '20px'}}>
                  {request.status}
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed">{request.description}</p>
            </div>
          </div>
        </div>

        {/* Client Information */}
        <div className="card-soft mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Información del cliente</h3>
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-technician-primary rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">{request.client.name}</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>⭐ {request.client.rating}</span>
                <span>•</span>
                <span>{request.client.reviewsCount} reseñas</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 bg-green-100 rounded-full">
                <Phone className="w-5 h-5 text-green-600" />
              </button>
              <button className="p-2 bg-blue-100 rounded-full">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="card-soft mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Detalles del servicio</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Fecha preferida</p>
                <p className="text-sm text-muted-foreground">{request.date}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Hora preferida</p>
                <p className="text-sm text-muted-foreground">{request.time} (Duración estimada: {request.details.estimatedDuration})</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-1" />
              <div>
                <p className="font-medium text-foreground">Ubicación</p>
                <p className="text-sm text-muted-foreground">{request.location.address}</p>
                <p className="text-xs text-muted-foreground mt-1">{request.location.coordinates}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <DollarSign className="w-5 h-5 text-technician-primary" />
              <div>
                <p className="font-medium text-foreground">Precio sugerido</p>
                <div className="flex items-center space-x-2">
                  <p className="text-lg font-bold text-technician-primary">${request.price.suggested}</p>
                  {request.price.negotiable && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-600 rounded-full">
                      Negociable
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="card-soft mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Información adicional</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-medium text-foreground mb-2">Herramientas requeridas</p>
              <div className="flex flex-wrap gap-2">
                {request.details.toolsRequired.map((tool, index) => (
                  <span key={index} className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="font-medium text-foreground mb-2">Instrucciones de acceso</p>
              <p className="text-sm text-muted-foreground">{request.details.accessInstructions}</p>
            </div>
            
            <div>
              <p className="font-medium text-foreground mb-2">Notas adicionales</p>
              <p className="text-sm text-muted-foreground">{request.details.additionalNotes}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-20 left-4 right-4 bg-white p-4 rounded-2xl shadow-lg border border-border">
          <div className="flex space-x-3">
            <button 
              onClick={() => setShowAcceptFlow(true)}
              className="flex-1 btn-primary py-3"
            >
              Aceptar solicitud
            </button>
            <button className="px-6 py-3 border border-technician-primary text-technician-primary font-medium rounded-2xl">
              Consultar
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />

      {/* Accept Request Flow */}
      <AcceptRequestFlow
        isOpen={showAcceptFlow}
        onClose={() => setShowAcceptFlow(false)}
        request={{
          id: request.id,
          title: request.title,
          client: request.client.name,
          location: request.location.address,
          suggestedPrice: request.price.suggested,
          suggestedDate: request.date,
          suggestedTime: request.time
        }}
      />
    </div>
  );
}

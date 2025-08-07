import { useState } from "react";
import { 
  X, 
  CheckCircle, 
  DollarSign, 
  Calendar, 
  Clock, 
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft
} from "lucide-react";

interface AcceptRequestFlowProps {
  isOpen: boolean;
  onClose: () => void;
  request: {
    id: string;
    title: string;
    client: string;
    location: string;
    suggestedPrice: number;
    suggestedDate: string;
    suggestedTime: string;
  };
}

export default function AcceptRequestFlow({ isOpen, onClose, request }: AcceptRequestFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    finalPrice: request?.suggestedPrice || 0,
    visitDate: request?.suggestedDate || "",
    visitTime: request?.suggestedTime || "",
    verificationCode: ""
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the API
    console.log("Accepting request with data:", formData);
    // Close flow and show success
    setCurrentStep(4);
  };

  const handleFinish = () => {
    onClose();
    // Navigate to requests in progress
    window.location.href = "/solicitudes-tecnico";
  };

  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl max-h-[90vh] overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-foreground">
            {currentStep === 4 ? "¡Éxito!" : `Paso ${currentStep} de 3`}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="px-6 py-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-technician-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {/* Step 1: Confirmation */}
          {currentStep === 1 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                ¿Estás por aceptar esta solicitud?
              </h3>
              
              <div className="bg-gray-50 rounded-2xl p-4 mb-6 text-left">
                <h4 className="font-semibold text-foreground mb-3">{request.title}</h4>
                
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{request.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{request.suggestedDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{request.suggestedTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-technician-primary" />
                    <span className="font-semibold text-technician-primary">${request.suggestedPrice}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Price and Schedule */}
          {currentStep === 2 && (
            <div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
                Confirma los datos del servicio
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Precio final propuesto
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="number"
                      value={formData.finalPrice}
                      onChange={(e) => setFormData({...formData, finalPrice: Number(e.target.value)})}
                      className="input-field w-full pl-10"
                      placeholder="85"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Fecha de visita
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Hora de visita
                  </label>
                  <input
                    type="time"
                    value={formData.visitTime}
                    onChange={(e) => setFormData({...formData, visitTime: e.target.value})}
                    className="input-field w-full"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Verification Code */}
          {currentStep === 3 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-orange-600" />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Código de verificación
              </h3>
              
              <p className="text-sm text-muted-foreground mb-6">
                Este código fue generado cuando el cliente publicó la solicitud
              </p>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Ingresa el código de 6 caracteres
                </label>
                <input
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({...formData, verificationCode: e.target.value.toUpperCase()})}
                  className="input-field w-full text-center text-lg font-mono tracking-widest"
                  placeholder="A4B7K9"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Combina letras y números (ej: A4B7K9)
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {currentStep === 4 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-2">
                ¡Solicitud aceptada con éxito!
              </h3>
              
              <p className="text-muted-foreground mb-6">
                La solicitud ahora aparece en tu sección "En progreso". 
                El cliente recibirá una notificación con tus datos de contacto.
              </p>
              
              <div className="bg-green-50 rounded-2xl p-4 mb-6">
                <h4 className="font-semibold text-foreground mb-2">Próximos pasos:</h4>
                <ul className="text-sm text-muted-foreground text-left space-y-1">
                  <li>• Contacta al cliente para coordinar detalles</li>
                  <li>• Confirma la fecha y hora de la visita</li>
                  <li>• Prepara las herramientas necesarias</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-100">
          {currentStep < 4 && (
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button 
                  onClick={handlePrevious}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 font-medium rounded-2xl flex items-center justify-center space-x-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              )}
              
              <button 
                onClick={currentStep === 3 ? handleSubmit : handleNext}
                className="flex-1 btn-primary py-3 flex items-center justify-center space-x-2"
                disabled={
                  (currentStep === 2 && (!formData.finalPrice || !formData.visitDate || !formData.visitTime)) ||
                  (currentStep === 3 && formData.verificationCode.length !== 6)
                }
              >
                <span>{currentStep === 3 ? "Confirmar" : "Siguiente"}</span>
                {currentStep < 3 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}
          
          {currentStep === 4 && (
            <button 
              onClick={handleFinish}
              className="w-full btn-primary py-3"
            >
              Volver a mis solicitudes
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

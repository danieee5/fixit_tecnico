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
  ArrowLeft,
  AlertCircle
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
    visitDate: "",
    visitTime: "",
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
    // Simulate API call
    console.log("Accepting request with data:", formData);
    setCurrentStep(4);
  };

  const handleViewRequest = () => {
    onClose();
    window.location.href = `/solicitud/${request.id}`;
  };

  const handleBackToRequests = () => {
    onClose();
    window.location.href = "/solicitudes-tecnico";
  };

  const isFormValid = () => {
    switch (currentStep) {
      case 2:
        return formData.finalPrice > 0 && formData.visitDate && formData.visitTime;
      case 3:
        return formData.verificationCode.length === 6;
      default:
        return true;
    }
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen || !request) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container - Mobile First Design */}
      <div 
        className="relative w-full sm:max-w-lg sm:mx-4 max-h-[95vh] sm:max-h-[90vh] flex flex-col"
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px 24px 0 0',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 -10px 40px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              {currentStep === 4 ? "¡Éxito!" : `Paso ${currentStep} de 3`}
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Progress Bar */}
        {currentStep < 4 && (
          <div className="px-4 sm:px-6 py-3 border-b border-white/10 flex-shrink-0">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-technician-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Content - Scrollable Area */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          {/* Step 1: Confirmación inicial */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  Estás por aceptar esta solicitud
                </h3>
                <p className="text-sm text-muted-foreground">
                  Revisa los datos antes de continuar
                </p>
              </div>
              
              {/* Service Info Card */}
              <div 
                className="bg-gradient-to-br from-technician-primary/5 to-technician-secondary/5 p-4 sm:p-5 space-y-4"
                style={{ borderRadius: '20px', border: '1px solid rgba(234, 139, 73, 0.1)' }}
              >
                <h4 className="font-bold text-foreground text-base sm:text-lg">{request.title}</h4>
                <p className="text-sm text-muted-foreground">Cliente: {request.client}</p>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                    <MapPin className="w-5 h-5 text-technician-primary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">Dirección</p>
                      <p className="text-sm font-semibold text-foreground truncate">{request.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                    <Calendar className="w-5 h-5 text-technician-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground">Fecha sugerida</p>
                      <p className="text-sm font-semibold text-foreground">{request.suggestedDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                    <DollarSign className="w-5 h-5 text-technician-primary flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-xs font-medium text-muted-foreground">Precio sugerido</p>
                      <p className="text-lg font-bold text-technician-primary">${request.suggestedPrice}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Precio y fecha/hora */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-technician-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-8 h-8 text-technician-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  Ingreso de precio y fecha/hora de visita
                </h3>
                <p className="text-sm text-muted-foreground">
                  Establece el precio final y programa tu visita
                </p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Precio final que cobrarás
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-technician-primary" />
                    <input
                      type="number"
                      value={formData.finalPrice || ""}
                      onChange={(e) => setFormData({...formData, finalPrice: Number(e.target.value)})}
                      className="w-full pl-12 pr-4 py-4 text-lg font-semibold bg-white/80 border-2 border-technician-primary/20 rounded-2xl focus:border-technician-primary focus:ring-0 transition-colors"
                      placeholder="85"
                      min="1"
                    />
                  </div>
                  {formData.finalPrice <= 0 && (
                    <p className="text-xs text-red-500 mt-1 flex items-center space-x-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>El precio debe ser mayor a 0</span>
                    </p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Día de tu visita
                  </label>
                  <input
                    type="date"
                    value={formData.visitDate}
                    onChange={(e) => setFormData({...formData, visitDate: e.target.value})}
                    className="w-full px-4 py-4 text-base bg-white/80 border-2 border-technician-primary/20 rounded-2xl focus:border-technician-primary focus:ring-0 transition-colors"
                    min={getTomorrowDate()}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Hora estimada de llegada
                  </label>
                  <input
                    type="time"
                    value={formData.visitTime}
                    onChange={(e) => setFormData({...formData, visitTime: e.target.value})}
                    className="w-full px-4 py-4 text-base bg-white/80 border-2 border-technician-primary/20 rounded-2xl focus:border-technician-primary focus:ring-0 transition-colors"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Código de validación */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                  Ingreso de código de validación
                </h3>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-2xl">
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Ingresa el código de publicación</strong> que fue generado por el cliente cuando creó esta solicitud
                </p>
              </div>
              
              <div className="space-y-4">
                <label className="block text-sm font-semibold text-foreground">
                  Código de 6 caracteres alfanuméricos
                </label>
                <input
                  type="text"
                  value={formData.verificationCode}
                  onChange={(e) => setFormData({...formData, verificationCode: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-5 text-2xl font-mono font-bold text-center bg-white/80 border-2 border-orange-200 rounded-2xl focus:border-orange-500 focus:ring-0 transition-colors tracking-widest"
                  placeholder="A4B7K9"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground text-center">
                  Ejemplo: A4B7K9 (combina letras y números)
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Confirmación final */}
          {currentStep === 4 && (
            <div className="space-y-6 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                  ¡Solicitud aceptada con éxito!
                </h3>
                <p className="text-sm text-muted-foreground">
                  La solicitud ahora se encuentra en estado 'En progreso'
                </p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-2xl text-left">
                <h4 className="font-semibold text-green-800 mb-3">Próximos pasos:</h4>
                <ul className="text-sm text-green-700 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>El cliente recibirá una notificación</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Puedes contactar al cliente directamente</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>Prepara las herramientas necesarias</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions - Fixed at bottom */}
        <div className="p-4 sm:p-6 border-t border-white/20 flex-shrink-0">
          {currentStep < 4 && (
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <button 
                  onClick={handlePrevious}
                  className="flex-1 py-3 px-4 bg-white/80 border border-gray-300 text-gray-700 font-semibold rounded-2xl flex items-center justify-center space-x-2 hover:bg-white transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Anterior</span>
                </button>
              )}
              
              <button 
                onClick={currentStep === 3 ? handleSubmit : handleNext}
                disabled={!isFormValid()}
                className="flex-1 py-3 px-4 bg-technician-primary text-white font-semibold rounded-2xl flex items-center justify-center space-x-2 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span>
                  {currentStep === 1 ? "Continuar" : currentStep === 2 ? "Confirmar y continuar" : "Finalizar"}
                </span>
                {currentStep < 3 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}
          
          {currentStep === 4 && (
            <div className="space-y-3">
              <button 
                onClick={handleViewRequest}
                className="w-full py-3 px-4 bg-technician-primary text-white font-semibold rounded-2xl hover:bg-orange-600 transition-colors"
              >
                Ver solicitud
              </button>
              <button 
                onClick={handleBackToRequests}
                className="w-full py-3 px-4 bg-white/80 border border-technician-primary text-technician-primary font-semibold rounded-2xl hover:bg-white transition-colors"
              >
                Volver a mis solicitudes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

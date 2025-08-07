import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CertificationBannerProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function CertificationBanner({ isVisible, onClose }: CertificationBannerProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsOpen(true);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Banner Modal */}
      <div
        className={`relative w-full max-w-sm mx-4 sm:mx-0 transition-all duration-300 ${
          isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Close Button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8 text-center">
          {/* Celebration Icon */}
          <div className="text-6xl mb-4">🎉</div>
          
          {/* Main Message */}
          <h2 className="text-xl font-bold text-foreground mb-4">
            ¡Enhorabuena!
          </h2>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Ahora eres un técnico verificado. Los clientes verán tu insignia de confianza en tu perfil.
          </p>
          
          {/* Accept Button */}
          <button 
            onClick={handleClose}
            className="w-full py-3 px-6 bg-technician-primary text-white font-medium hover:bg-orange-600 transition-colors"
            style={{borderRadius: '20px'}}
          >
            Aceptar
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-technician-primary/20 to-technician-secondary/20 rounded-full blur-sm" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-gradient-to-br from-technician-secondary/20 to-technician-primary/20 rounded-full blur-sm" />
      </div>
    </div>
  );
}

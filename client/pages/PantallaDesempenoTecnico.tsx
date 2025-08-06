import { ArrowLeft, DollarSign, Clock, Award, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

export default function PantallaDesempenoTecnico() {
  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </Link>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Mi Desempeño</h1>
            <p className="text-sm text-muted-foreground">Analiza tu progreso y métricas como técnico</p>
          </div>
        </div>
      </header>

      <div className="px-4 py-6 pb-20">
        {/* Monthly Metrics */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Resumen mensual</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="card-soft text-center">
              <DollarSign className="w-8 h-8 text-technician-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">$2,840</p>
              <p className="text-sm text-muted-foreground">Ingresos del mes</p>
            </div>
            <div className="card-soft text-center">
              <Clock className="w-8 h-8 text-technician-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">2.5h</p>
              <p className="text-sm text-muted-foreground">Tiempo promedio</p>
            </div>
          </div>
        </div>

        {/* Top 3 Technicians */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Top 3 Técnicos del Mes</h2>
          <div className="space-y-3">
            <div className="card-soft">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <div className="w-12 h-12 bg-technician-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">CM</span>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-foreground">Carlos Mendoza</h4>
                    <span className="text-xs px-2 py-1 bg-technician-primary text-white font-medium" style={{borderRadius: '12px'}}>
                      Tú
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>1.º lugar</span>
                    <div className="flex items-center space-x-1">
                      <span>⭐</span>
                      <span>4.9</span>
                    </div>
                    <span>89 servicios</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivational State */}
        <div className="mb-6">
          <div className="card-glass bg-gradient-to-r from-technician-primary/10 to-technician-secondary/10 p-6">
            <div className="flex items-start space-x-4">
              <Award className="w-12 h-12 text-technician-primary" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Técnico en Ascenso</h3>
                <p className="text-muted-foreground mb-4">
                  Estás en el top 3 este mes. ¡Sigue así para alcanzar el primer lugar!
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-3 py-1 bg-technician-primary text-white font-medium" style={{borderRadius: '20px'}}>
                    Técnico Activo
                  </span>
                  <span className="text-xs px-3 py-1 bg-technician-primary text-white font-medium" style={{borderRadius: '20px'}}>
                    Técnico destacado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

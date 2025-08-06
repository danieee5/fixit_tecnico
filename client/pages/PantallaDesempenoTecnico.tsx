import { useState } from "react";
import {
  ArrowLeft,
  DollarSign,
  Clock,
  Award,
  CheckCircle,
  TrendingUp,
  ThumbUp,
  Zap,
  MapPin,
  Trophy,
  Filter,
  TrendingDown
} from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

// Dummy data for the performance dashboard
const monthlyMetrics = {
  earnings: 2840,
  averageTime: 2.5
};

const topTechnicians = [
  {
    id: 1,
    name: "Carlos Mendoza",
    position: 1,
    rating: 4.9,
    isCurrentUser: true,
    avatar: "CM",
    completedServices: 89
  },
  {
    id: 2,
    name: "María Rodriguez",
    position: 2,
    rating: 4.8,
    isCurrentUser: false,
    avatar: "MR",
    completedServices: 85
  },
  {
    id: 3,
    name: "Juan Silva",
    position: 3,
    rating: 4.7,
    isCurrentUser: false,
    avatar: "JS",
    completedServices: 82
  }
];

const categoriesData = [
  {
    name: "Electricidad",
    requests: 45,
    change: 12,
    isPositive: true
  },
  {
    name: "Plomería", 
    requests: 38,
    change: 8,
    isPositive: true
  },
  {
    name: "Carpintería",
    requests: 23,
    change: -5,
    isPositive: false
  },
  {
    name: "Electrodomésticos",
    requests: 19,
    change: 15,
    isPositive: true
  }
];

const parishesData = [
  {
    name: "Centro",
    completed: 28,
    total: 35,
    percentage: 80
  },
  {
    name: "Norte",
    completed: 22,
    total: 25,
    percentage: 88
  },
  {
    name: "Sur",
    completed: 15,
    total: 20,
    percentage: 75
  },
  {
    name: "Este",
    completed: 12,
    total: 15,
    percentage: 80
  }
];

const performanceStats = [
  {
    title: "Precio promedio por hora",
    value: "$35",
    icon: TrendingUp
  },
  {
    title: "Servicios completados",
    value: "156",
    icon: CheckCircle
  }
];

const achievements = [
  {
    title: "Técnico Activo",
    description: "+10 servicios en el mes",
    icon: CheckCircle,
    earned: true
  },
  {
    title: "Rápido y eficaz",
    description: "Tiempo medio < 2h",
    icon: Speed,
    earned: false
  },
  {
    title: "Favorito del cliente",
    description: "20 calificaciones positivas",
    icon: ThumbUp,
    earned: true
  },
  {
    title: "Técnico en Ruta",
    description: "Trabaja en 3 parroquias",
    icon: Map,
    earned: true
  },
  {
    title: "Técnico destacado",
    description: "Top 3 mensual",
    icon: WorkspacePremium,
    earned: true
  }
];

export default function PantallaDesempenoTecnico() {
  const [selectedFilter, setSelectedFilter] = useState("global");

  const filters = [
    { id: "global", label: "Global" },
    { id: "parroquia", label: "Mi Parroquia" }
  ];

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1:
        return <EmojiEvents className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <WorkspacePremium className="w-6 h-6 text-gray-400" />;
      case 3:
        return <WorkspacePremium className="w-6 h-6 text-orange-600" />;
      default:
        return null;
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
              <AttachMoney className="w-8 h-8 text-technician-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">${monthlyMetrics.earnings.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Ingresos del mes</p>
            </div>
            <div className="card-soft text-center">
              <Schedule className="w-8 h-8 text-technician-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{monthlyMetrics.averageTime}h</p>
              <p className="text-sm text-muted-foreground">Tiempo promedio</p>
            </div>
          </div>
        </div>

        {/* Top 3 Technicians */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Top 3 Técnicos del Mes</h2>
            <div className="flex space-x-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 text-xs font-medium transition-colors ${
                    selectedFilter === filter.id
                      ? "bg-technician-primary text-white"
                      : "bg-white text-muted-foreground border border-border"
                  }`}
                  style={{borderRadius: '20px'}}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            {topTechnicians.map((technician) => (
              <div key={technician.id} className="card-soft">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-3">
                    {getPositionIcon(technician.position)}
                    <div className="w-12 h-12 bg-technician-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{technician.avatar}</span>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-foreground">{technician.name}</h4>
                      {technician.isCurrentUser && (
                        <span className="text-xs px-2 py-1 bg-technician-primary text-white font-medium" style={{borderRadius: '12px'}}>
                          Tú
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>{technician.position}.º lugar</span>
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{technician.rating}</span>
                      </div>
                      <span>{technician.completedServices} servicios</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Requested Categories */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Categorías más solicitadas</h2>
          <div className="space-y-3">
            {categoriesData.map((category, index) => (
              <div key={index} className="card-soft">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-foreground">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.requests} solicitudes</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm font-medium flex items-center space-x-1 ${
                      category.isPositive ? "text-green-600" : "text-red-600"
                    }`}>
                      {category.isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span>{category.isPositive ? "+" : ""}{category.change}%</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity by Parishes */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Tareas por Parroquias</h2>
          <div className="space-y-4">
            {parishesData.map((parish, index) => (
              <div key={index} className="card-soft">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-foreground">{parish.name}</h4>
                  <span className="text-sm text-muted-foreground">
                    {parish.completed}/{parish.total} servicios ({parish.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-technician-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${parish.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Resumen de rendimiento</h2>
          <div className="grid grid-cols-2 gap-4">
            {performanceStats.map((stat, index) => (
              <div key={index} className="card-soft text-center">
                <stat.icon className="w-8 h-8 text-technician-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Motivational State */}
        <div className="mb-6">
          <div className="card-glass bg-gradient-to-r from-technician-primary/10 to-technician-secondary/10 p-6">
            <div className="flex items-start space-x-4">
              <WorkspacePremium className="w-12 h-12 text-technician-primary" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Técnico en Ascenso</h3>
                <p className="text-muted-foreground mb-4">
                  Estás en el top 3 este mes. ¡Sigue así para alcanzar el primer lugar!
                </p>
                <div className="flex flex-wrap gap-2">
                  {achievements.filter(a => a.earned).map((achievement, index) => (
                    <span key={index} className="text-xs px-3 py-1 bg-technician-primary text-white font-medium" style={{borderRadius: '20px'}}>
                      {achievement.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Logros y Recompensas</h2>
          <div className="grid grid-cols-1 gap-3">
            {achievements.map((achievement, index) => (
              <div key={index} className={`card-soft ${achievement.earned ? "bg-green-50" : "bg-gray-50"}`}>
                <div className="flex items-center space-x-3">
                  <achievement.icon className={`w-6 h-6 ${
                    achievement.earned ? "text-technician-primary" : "text-gray-400"
                  }`} />
                  <div className="flex-1">
                    <h4 className={`font-semibold ${
                      achievement.earned ? "text-foreground" : "text-gray-500"
                    }`}>
                      {achievement.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">{achievement.description}</p>
                  </div>
                  {achievement.earned && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

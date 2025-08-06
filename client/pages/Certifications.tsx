import { GraduationCap, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNavigation from "../components/BottomNavigation";

export default function Certifications() {
  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-50">
        <div className="flex items-center">
          <Link to="/" className="mr-4">
            <ArrowLeft className="w-6 h-6 text-muted-foreground" />
          </Link>
          <h1 className="text-lg font-semibold text-foreground">Certificaciones</h1>
        </div>
      </header>

      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 pb-20">
        <div className="text-center">
          <GraduationCap className="w-16 h-16 text-technician-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Certificaciones</h2>
          <p className="text-muted-foreground mb-6 max-w-md">
            Esta sección mostrará todas tus certificaciones y cursos disponibles.
          </p>
          <p className="text-sm text-muted-foreground">
            Continúa conversando para que pueda completar esta página con más detalles.
          </p>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}

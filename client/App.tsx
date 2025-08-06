import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Certifications from "./pages/Certifications";
import Services from "./pages/Services";
import Profile from "./pages/Profile";
import PantallaServicios from "./pages/PantallaServicios";
import PantallaSolicitudes from "./pages/PantallaSolicitudes";
import PantallaDesempenoTecnico from "./pages/PantallaDesempenoTecnico";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/services" element={<Services />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mis-servicios" element={<PantallaServicios />} />
          <Route path="/solicitudes" element={<PantallaSolicitudes />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);

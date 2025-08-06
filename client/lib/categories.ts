import { 
  Zap, 
  Wrench, 
  Hammer, 
  Settings,
  Search
} from "lucide-react";

// Category definitions with icons and colors
export const CATEGORIES = {
  electricidad: {
    name: "Electricidad",
    icon: Zap,
    color: "#FFD600"
  },
  plomeria: {
    name: "Plomería", 
    icon: Wrench,
    color: "#00B8D4"
  },
  carpinteria: {
    name: "Carpintería",
    icon: Hammer,
    color: "#8D6E63"
  },
  electrodomesticos: {
    name: "Electrodomésticos",
    icon: Settings,
    color: "#BA68C8"
  },
  otros: {
    name: "Otros",
    icon: Settings,
    color: "#BDBDBD"
  }
} as const;

// Subcategory definitions with icons and colors
export const SUBCATEGORIES = {
  instalacion: {
    name: "Instalación",
    icon: Wrench,
    color: "#2196F3"
  },
  reparacion: {
    name: "Reparación",
    icon: Settings,
    color: "#F44336"
  },
  mantenimiento: {
    name: "Mantenimiento",
    icon: Settings,
    color: "#4CAF50"
  },
  otro: {
    name: "Otro",
    icon: Search,
    color: "#9E9E9E"
  }
} as const;

// Status badge styling
export const STATUS_STYLES = {
  publicado: "bg-blue-100 text-blue-600",
  nuevo: "bg-orange-500 text-white",
  "en progreso": "bg-orange-600 text-white", 
  finalizado: "bg-green-100 text-green-600",
  urgente: "bg-red-100 text-red-600",
  normal: "bg-yellow-100 text-yellow-600"
} as const;

// Helper function to get category info
export function getCategoryInfo(categoryKey: string) {
  return CATEGORIES[categoryKey as keyof typeof CATEGORIES] || CATEGORIES.otros;
}

// Helper function to get subcategory info
export function getSubcategoryInfo(subcategoryKey: string) {
  return SUBCATEGORIES[subcategoryKey as keyof typeof SUBCATEGORIES] || SUBCATEGORIES.otro;
}

// Helper function to get status style
export function getStatusStyle(status: string) {
  const normalizedStatus = status.toLowerCase();
  return STATUS_STYLES[normalizedStatus as keyof typeof STATUS_STYLES] || "bg-gray-100 text-gray-600";
}

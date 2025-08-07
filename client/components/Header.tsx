import { Bell, MapPin, User } from "lucide-react";

interface HeaderProps {
  userName?: string;
  location?: string;
  notificationCount?: number;
  showProfilePhoto?: boolean;
  onNotificationClick?: () => void;
}

export default function Header({
  userName = "Usuario",
  location = "Centro, Guayaquil",
  notificationCount = 0,
  showProfilePhoto = true,
  onNotificationClick
}: HeaderProps) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-border px-4 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Profile Photo */}
        <div className="flex items-center">
          {showProfilePhoto && (
            <div className="w-10 h-10 bg-technician-primary rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-technician-primary" />
          <span className="text-sm font-medium text-foreground">{location}</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Bell className="w-6 h-6 text-muted-foreground" />
          {notificationCount > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-technician-primary rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-bold">{notificationCount}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

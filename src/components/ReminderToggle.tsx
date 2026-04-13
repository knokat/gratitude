import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ReminderToggle() {
  const [isEnabled, setIsEnabled] = useState(() => {
    return localStorage.getItem('reminders_enabled') === 'true';
  });

  const toggleReminders = async () => {
    if (!isEnabled) {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          setIsEnabled(true);
          localStorage.setItem('reminders_enabled', 'true');
          toast.success('Erinnerungen aktiviert! Wir erinnern dich jeden Abend.');
        } else {
          toast.error('Berechtigung fehlt. Bitte erlaube Benachrichtigungen in deinen Browser-Einstellungen.');
        }
      } else {
        toast.error('Dein Browser unterstützt keine Benachrichtigungen.');
      }
    } else {
      setIsEnabled(false);
      localStorage.setItem('reminders_enabled', 'false');
      toast.info('Erinnerungen deaktiviert.');
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleReminders}
      className="rounded-full gap-2 text-muted-foreground hover:text-[var(--palette-2)] hover:bg-[var(--palette-2)]/10"
    >
      {isEnabled ? (
        <>
          <Bell className="w-4 h-4 text-[var(--palette-2)]" />
          <span className="text-xs font-medium">Erinnerung an</span>
        </>
      ) : (
        <>
          <BellOff className="w-4 h-4" />
          <span className="text-xs">Erinnerung aus</span>
        </>
      )}
    </Button>
  );
}

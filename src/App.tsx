import { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { WeekSelector } from './components/WeekSelector';
import { EntryForm } from './components/EntryForm';
import { EntryList } from './components/EntryList';
import { ReminderToggle } from './components/ReminderToggle';
import { useGratitude } from './hooks/useGratitude';
import { Toaster } from 'sonner';
import { Sparkles } from 'lucide-react';
import { getDayColor } from './constants';

export default function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { addEntry, deleteEntry, getEntriesForDate } = useGratitude();

  const dateKey = format(selectedDate, 'yyyy-MM-dd');
  const dailyEntries = getEntriesForDate(dateKey);
  const currentColor = getDayColor(selectedDate);

  const handleAddEntry = (text: string) => {
    addEntry(text, dateKey);
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Toaster position="top-center" expand={false} richColors />
      
      <WeekSelector 
        selectedDate={selectedDate} 
        onDateSelect={setSelectedDate} 
      />

      <main className="max-w-md mx-auto px-4 pt-8 pb-24 space-y-8">
        <header className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl font-bold tracking-tight text-foreground">
              {format(selectedDate, 'EEEE', { locale: de })}
            </h1>
            <ReminderToggle />
          </div>
          <p className="flex items-center gap-2 font-medium" style={{ color: currentColor }}>
            <Sparkles className="w-4 h-4" />
            {format(selectedDate, 'd. MMMM yyyy', { locale: de })}
          </p>
        </header>

        <section className="space-y-6">
          <EntryForm onAdd={handleAddEntry} color={currentColor} />
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground/60 px-1">
              Deine Dankbarkeit
            </h3>
            <EntryList 
              entries={dailyEntries} 
              onDelete={deleteEntry} 
            />
          </div>
        </section>
      </main>

      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[var(--palette-2)]/10 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] -right-[10%] w-[30%] h-[30%] bg-[var(--palette-3)]/15 rounded-full blur-[80px]" />
        <div className="absolute -bottom-[10%] left-[20%] w-[50%] h-[50%] bg-[var(--palette-4)]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[20%] h-[20%] bg-[var(--palette-5)]/10 rounded-full blur-[60px]" />
      </div>
    </div>
  );
}


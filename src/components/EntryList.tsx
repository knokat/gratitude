import { GratitudeEntry } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

import { PALETTE_COLORS } from '../constants';

interface EntryListProps {
  entries: GratitudeEntry[];
  onDelete: (id: string) => void;
}

export function EntryList({ entries, onDelete }: EntryListProps) {
  if (entries.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground/50">
        <Heart className="w-12 h-12 mb-4 opacity-20" />
        <p className="italic">Noch keine Einträge für diesen Tag.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      <AnimatePresence mode="popLayout">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          >
            <Card 
              className="group overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 rounded-3xl relative"
              style={{ backgroundColor: `${PALETTE_COLORS[index % PALETTE_COLORS.length]}25` }}
            >
              <div 
                className="absolute left-0 top-0 bottom-0 w-1.5" 
                style={{ backgroundColor: PALETTE_COLORS[index % PALETTE_COLORS.length] }}
              />
              <CardContent className="p-5 pl-7 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-lg leading-relaxed text-foreground/90">
                    {entry.text}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(entry.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10 rounded-full"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

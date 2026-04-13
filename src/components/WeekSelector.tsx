import { useState, useEffect } from 'react';
import { format, startOfWeek, addDays, subWeeks, addWeeks, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

import { PALETTE_COLORS } from '../constants';

interface WeekSelectorProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export function WeekSelector({ selectedDate, onDateSelect }: WeekSelectorProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => 
    startOfWeek(selectedDate, { weekStartsOn: 1 })
  );
  const [direction, setDirection] = useState(0);

  const weekDays = Array.from({ length: 7 }).map((_, i) => addDays(currentWeekStart, i));

  const handlePrevWeek = () => {
    setDirection(-1);
    setCurrentWeekStart((prev) => subWeeks(prev, 1));
  };

  const handleNextWeek = () => {
    setDirection(1);
    setCurrentWeekStart((prev) => addWeeks(prev, 1));
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full overflow-hidden bg-background/80 backdrop-blur-md py-4 border-b border-border/50 sticky top-0 z-10">
      <div className="max-w-md mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handlePrevWeek}
            className="p-1 hover:bg-primary/10 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-medium">
            {format(currentWeekStart, 'MMMM yyyy', { locale: de })}
          </h2>
          <button 
            onClick={handleNextWeek}
            className="p-1 hover:bg-primary/10 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="relative h-20">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentWeekStart.toISOString()}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? 300 : -300,
                  opacity: 0
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1
                },
                exit: (direction: number) => ({
                  zIndex: 0,
                  x: direction < 0 ? 300 : -300,
                  opacity: 0
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  handleNextWeek();
                } else if (swipe > swipeConfidenceThreshold) {
                  handlePrevWeek();
                }
              }}
              className="absolute inset-0 flex justify-between items-center"
            >
              {weekDays.map((day, index) => {
                const isSelected = isSameDay(day, selectedDate);
                const isToday = isSameDay(day, new Date());
                const dayColor = PALETTE_COLORS[index % PALETTE_COLORS.length];
                
                return (
                  <button
                    key={day.toISOString()}
                    onClick={() => onDateSelect(day)}
                    className={cn(
                      "flex flex-col items-center justify-center w-12 h-16 rounded-2xl transition-all duration-300",
                      isSelected 
                        ? "shadow-lg scale-110" 
                        : "hover:bg-primary/5",
                      !isSelected && isToday && "border border-primary/30"
                    )}
                    style={{
                      backgroundColor: isSelected ? dayColor : 'transparent',
                      color: isSelected ? 'white' : 'inherit'
                    }}
                  >
                    <span className={cn(
                      "text-[10px] uppercase tracking-wider font-semibold mb-1",
                      isSelected ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {format(day, 'EEE', { locale: de })}
                    </span>
                    <span className="text-lg font-bold">
                      {format(day, 'd')}
                    </span>
                  </button>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

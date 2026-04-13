import { useState, useEffect } from 'react';
import { GratitudeEntry } from '../types';

export function useGratitude() {
  const [entries, setEntries] = useState<GratitudeEntry[]>(() => {
    const saved = localStorage.getItem('gratitude_entries');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('gratitude_entries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (text: string, date: string) => {
    const newEntry: GratitudeEntry = {
      id: crypto.randomUUID(),
      text,
      date,
      createdAt: Date.now(),
    };
    setEntries((prev) => [newEntry, ...prev]);
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  const getEntriesForDate = (date: string) => {
    return entries.filter((e) => e.date === date);
  };

  return { entries, addEntry, deleteEntry, getEntriesForDate };
}

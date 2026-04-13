import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface EntryFormProps {
  onAdd: (text: string) => void;
  color?: string;
}

export function EntryForm({ onAdd, color }: EntryFormProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/50 shadow-sm">
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Wofür bist du heute dankbar?"
        className="bg-transparent border-none focus-visible:ring-0 text-lg placeholder:text-muted-foreground/50"
      />
      <Button 
        type="submit" 
        size="icon" 
        disabled={!text.trim()}
        className="rounded-full w-10 h-10 shrink-0 hover:opacity-90 transition-opacity shadow-md border-none"
        style={{ backgroundColor: color || 'var(--primary)' }}
      >
        <Plus className="w-6 h-6 text-white" />
      </Button>
    </form>
  );
}

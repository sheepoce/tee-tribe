
// components/CourseSearch.tsx
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search, MapPin } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];

export default function CourseSearch({ onSelect }: { onSelect: (course: Course) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Course[]>([]);

  useEffect(() => {
    const search = async () => {
      if (!query) return setResults([]);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10);
      
      if (!error && data) setResults(data);
    };
    
    const timeout = setTimeout(search, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="bg-dark-surface p-2 rounded-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-soft-grey" />
        <Input
          className="pl-10 bg-card-surface text-white"
          placeholder="Search courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      
      {results.length > 0 && (
        <Card className="mt-2 max-h-60 overflow-y-auto bg-card-surface border-soft-grey/30">
          <ul className="py-2">
            {results.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => onSelect(item)}
                  className="w-full px-4 py-2 text-left hover:bg-dark-surface flex items-center gap-2 text-white"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{item.name}</span>
                  {item.region && <span className="text-soft-grey text-xs ml-auto">{item.region}</span>}
                </button>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}

import { useQuery } from '@tanstack/react-query';
import { supabase } from '../integrations/supabase/client';
import type { Tables } from '../integrations/supabase/types';

type Course = Tables<'courses'>;

export function useCourses() {
  return useQuery<Course[], Error>({
    queryKey: ['courses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('name', { ascending: true });
      if (error) throw error;
      return data;
    },
  });
} 
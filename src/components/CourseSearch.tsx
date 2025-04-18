// components/CourseSearch.tsx
import { useState, useEffect } from 'react';
import { FlatList, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../lib/supabase'; // adjust path

export default function CourseSearch({ onSelect }: { onSelect: (course: any) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    const search = async () => {
      if (!query) return setResults([]);
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(10);
      if (!error) setResults(data);
    };
    const timeout = setTimeout(search, 300); // debounce
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <View className="bg-black p-2 rounded">
      <TextInput
        className="text-white bg-[#1c1c1e] p-2 rounded"
        placeholder="Search courses..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item)}>
            <Text className="text-white py-1">{item.name} - {item.region}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

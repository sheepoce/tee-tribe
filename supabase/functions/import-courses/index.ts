
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const apiKey = Deno.env.get("GOLF_COURSE_API_KEY");
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "Golf Course API key not configured" }),
        { 
          headers: { 
            ...corsHeaders, 
            "Content-Type": "application/json" 
          }, 
          status: 500 
        }
      );
    }

    const res = await fetch("https://api.golfcourseapi.com/courses?country=NZ", {
      headers: { Authorization: `Key ${apiKey}` },
    });

    const { courses } = await res.json();
    let inserted = 0;

    for (const course of courses) {
      const { data: existing } = await supabase
        .from("courses")
        .select("id")
        .eq("source_id", course.id)
        .maybeSingle();

      if (existing) continue;

      const region = /auckland/i.test(course.address || course.name)
        ? "Auckland"
        : /wellington/i.test(course.address || "") ? "Wellington"
        : /queenstown|otago/i.test(course.address || "") ? "Otago"
        : "Other";

      const { error } = await supabase.from("courses").insert({
        id: course.id,
        name: course.name,
        address: course.address || "",
        region,
        lat: course.latitude,
        lng: course.longitude,
        holes: course.holes || 18,
        country: "NZ",
        source_id: course.id,
      });

      if (!error) inserted++;
    }

    return new Response(
      JSON.stringify({ status: "complete", coursesAdded: inserted }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        }, 
        status: 200 
      }
    );
  } catch (error) {
    console.error('Course import error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { 
          ...corsHeaders, 
          "Content-Type": "application/json" 
        }, 
        status: 500 
      }
    );
  }
});

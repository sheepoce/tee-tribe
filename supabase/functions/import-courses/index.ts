import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json"
};

// Region parsing utility
function parseRegion(address: string = "", name: string = ""): string {
  const target = `${address} ${name}`.toLowerCase();
  if (target.includes("auckland")) return "Auckland";
  if (target.includes("wellington")) return "Wellington";
  if (target.includes("otago") || target.includes("queenstown")) return "Otago";
  return "Other";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
  const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const GOLF_API_KEY = Deno.env.get("GOLF_COURSE_API_KEY");

  if (!SUPABASE_URL || !SERVICE_KEY || !GOLF_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing required environment variables" }), {
      headers: corsHeaders,
      status: 500,
    });
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

  try {
    const response = await fetch("https://api.golfcourseapi.com/courses?country=NZ", {
      headers: { Authorization: `Key ${GOLF_API_KEY}` },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch courses from GolfCourseAPI" }), {
        headers: corsHeaders,
        status: 502,
      });
    }

    const { courses = [] } = await response.json();
    let inserted = 0;

    for (const course of courses) {
      const { data: existing } = await supabase
        .from("courses")
        .select("id")
        .eq("source_id", course.id)
        .maybeSingle();

      if (existing) continue;

      const { error } = await supabase.from("courses").insert({
        id: course.id,
        name: course.name,
        address: course.address || "",
        region: parseRegion(course.address, course.name),
        lat: course.latitude,
        lng: course.longitude,
        holes: course.holes || 18,
        country: "NZ",
        source_id: course.id,
      });

      if (!error) inserted++;
    }

    return new Response(JSON.stringify({
      status: "success",
      message: `Course import complete`,
      totalImported: inserted,
      totalFetched: courses.length,
    }), {
      headers: corsHeaders,
      status: 200,
    });

  } catch (error) {
    console.error("Course import failed:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: corsHeaders,
      status: 500,
    });
  }
});

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");

const envPath = ".env.local";
let envContent = fs.readFileSync(envPath, "utf-8");
const lines = envContent.split("\n");
let url = "", key = "";
for (const line of lines) {
  if (line.startsWith("VITE_SUPABASE_URL=")) url = line.split("=")[1].trim();
  if (line.startsWith("VITE_SUPABASE_ANON_KEY=")) key = line.split("=")[1].trim();
}
const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(3);
  
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }
  console.log("Recent registrations:");
  console.log(JSON.stringify(data, null, 2));
}

main();

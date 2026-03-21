import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";

const envPath = ".env.local";
let envContent = "";
try {
  envContent = fs.readFileSync(envPath, "utf-8");
} catch(e) {
  console.log("no .env.local");
  process.exit();
}

const lines = envContent.split("\n");
let url = "";
let key = "";
for (const line of lines) {
  if (line.startsWith("VITE_SUPABASE_URL=")) url = line.split("=")[1].trim();
  if (line.startsWith("VITE_SUPABASE_ANON_KEY=")) key = line.split("=")[1].trim();
}

const supabaseUrl = url;
const supabaseKey = key;
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from("registrations").select("*").limit(1);
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }
  console.log("Data:", data);
}

main();

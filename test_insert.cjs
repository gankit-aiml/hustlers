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
  const payload = {
    event_id: 'test',
    event_name: 'test',
    event_type: 'individual',
    leader_name: 'test',
    leader_roll: 'test',
    leader_dept: 'test',
    leader_phone: '12345',
    user_email: 'test@example.com'
  };
  const { data, error } = await supabase.from("registrations").insert(payload).select();
  console.log("Error:", error);
  if (!error && data) {
    console.log("Inserted data:", data);
    await supabase.from("registrations").delete().eq("id", data[0].id);
  }
}
main();

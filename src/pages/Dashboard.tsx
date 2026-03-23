import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Users, Database, Filter, Download } from "lucide-react";

// Synchronize this with Navbar.tsx!
const ADMIN_EMAILS = [
  "gankitsysdev@gmail.com",
  "sam8920341517@gmail.com",
  "sumitrathore45528@gmail.com",
];

interface Registration {
  id: string;
  event_name: string;
  event_type: string;
  user_email: string | null;
  team_name: string | null;
  leader_name: string;
  leader_roll: string;
  leader_dept: string;
  leader_year: string | null;
  leader_phone: string;
  members: any[];
  created_at: string;
}

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<string>("All");

  useEffect(() => {
    if (authLoading) return;

    // Quick security boot
    if (!user || !user.email || !ADMIN_EMAILS.includes(user.email)) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      const { data: records, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && records) {
        setData(records);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, authLoading, navigate]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  const uniqueEvents = Array.from(new Set(data.map(d => d.event_name)));
  const filteredData = selectedEvent === "All" ? data : data.filter(d => d.event_name === selectedEvent);

  const downloadCSV = () => {
    const headers = ["Event", "Type", "Team/Participant", "Roll No", "Phone", "Department", "Year", "Email", "Registered At"];
    const rows = filteredData.map(row => [
      row.event_name,
      row.event_type,
      row.team_name ? `${row.team_name} (L: ${row.leader_name})` : row.leader_name,
      row.leader_roll,
      row.leader_phone,
      row.leader_dept,
      row.leader_year ?? "",
      row.user_email ?? "",
      new Date(row.created_at).toLocaleString(),
    ]);

    const csvContent = [headers, ...rows]
      .map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${selectedEvent.replace(/ /g, "_")}-${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl text-foreground">COMMAND CENTER</h1>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground mr-1" />
            <Select value={selectedEvent} onValueChange={setSelectedEvent}>
              <SelectTrigger className="w-[200px] bg-card border-border">
                <SelectValue placeholder="Filter by Event" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Events</SelectItem>
                {uniqueEvents.map(e => (
                  <SelectItem key={e} value={e}>{e}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs uppercase bg-muted/50 text-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Participant Details</th>
                  <th className="px-6 py-4">Contact, Dept & Year</th>
                  {selectedEvent === "Arm Wrestling" && (
                    <th className="px-6 py-4 text-center text-secondary">Weight</th>
                  )}
                  <th className="px-6 py-4">Email ID</th>
                  <th className="px-6 py-4">Registered At</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((row) => (
                  <tr key={row.id} className="border-b border-border/50 hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap align-top">
                      {row.event_name}
                      <br />
                      <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full mt-1 inline-block uppercase tracking-wider">
                        {row.event_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top">
                      {row.event_type === "team" && row.team_name && row.event_name !== "Arm Wrestling" ? (
                        <div>
                          <span className="font-bold text-secondary">Team: {row.team_name}</span>
                          <div className="text-xs mt-1">L: {row.leader_name} ({row.leader_roll})</div>
                        </div>
                      ) : (
                        <div>
                          <span className="font-bold text-foreground">{row.leader_name}</span>
                          <div className="text-xs mt-1 text-muted-foreground">Roll: {row.leader_roll}</div>
                        </div>
                      )}

                      {/* Expanded Members View if specific event is selected */}
                      {selectedEvent !== "All" && row.members && row.members.length > 0 && (
                        <div className="mt-4 pl-3 border-l-2 border-primary/30 space-y-3">
                          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Team Members</p>
                          {row.members.map((m, idx) => (
                            <div key={idx} className="text-xs space-y-0.5 bg-background/50 p-2 rounded-md border border-border/50">
                              <div className="font-medium text-foreground">{m.name} <span className="text-muted-foreground font-normal">({m.rollNo})</span></div>
                              <div className="text-muted-foreground">📞 {m.phone} • {m.department}{m.year ? ` • ${m.year}` : ""}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs space-y-1 align-top">
                      <div>📞 {row.leader_phone}</div>
                      <div className="text-muted-foreground">🏢 {row.leader_dept}</div>
                      {row.leader_year && (
                        <div className="text-muted-foreground">📅 {row.leader_year}</div>
                      )}
                    </td>
                    {selectedEvent === "Arm Wrestling" && (
                      <td className="px-6 py-4 text-center align-top font-bold text-primary font-heading">
                        {row.team_name ? row.team_name.replace('Weight: ', '') : 'N/A'}
                      </td>
                    )}
                    <td className="px-6 py-4 text-xs align-top">
                      {row.user_email ? (
                        <a href={`mailto:${row.user_email}`} className="text-secondary hover:underline break-all mt-1 inline-block">
                          {row.user_email}
                        </a>
                      ) : (
                        <span className="text-muted-foreground italic">Missing</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs align-top">
                      <span className="mt-1 block">{new Date(row.created_at).toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
                {filteredData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No registrations found in the database.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Users, Database, Filter } from "lucide-react";

// Synchronize this with Navbar.tsx!
const ADMIN_EMAILS = [
  "gankitsysdev@gmail.com",
  "sam8920341517@gmail.com",
];

interface Registration {
  id: string;
  event_name: string;
  event_type: string;
  team_name: string | null;
  leader_name: string;
  leader_roll: string;
  leader_dept: string;
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

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Database className="w-8 h-8 text-primary" />
            <h1 className="font-display text-4xl text-foreground">COMMAND CENTER</h1>
          </div>

          <div className="flex items-center gap-2">
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
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-muted-foreground">
              <thead className="text-xs uppercase bg-muted/50 text-foreground border-b border-border">
                <tr>
                  <th className="px-6 py-4">Event</th>
                  <th className="px-6 py-4">Participant Details</th>
                  <th className="px-6 py-4">Contact & Dept</th>
                  <th className="px-6 py-4 text-center">Roster Size</th>
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
                      {row.event_type === "team" && row.team_name ? (
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
                              <div className="text-muted-foreground">📞 {m.phone} • {m.department}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-xs space-y-1 align-top">
                      <div>📞 {row.leader_phone}</div>
                      <div className="text-muted-foreground">🏢 {row.leader_dept}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center justify-center gap-1 bg-accent/20 text-accent-foreground px-2 py-1 rounded-md text-xs font-bold">
                        <Users className="w-3 h-3" />
                        {1 + (row.members ? row.members.length : 0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-xs">
                      {new Date(row.created_at).toLocaleString()}
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

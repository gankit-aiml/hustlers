import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Trophy, Loader2 } from "lucide-react";
import type { EventData } from "@/data/events";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface PlayerDetails {
  name: string;
  rollNo: string;
  department: string;
  year: string;
  phone: string;
}

const emptyPlayer = (): PlayerDetails => ({ name: "", rollNo: "", department: "", year: "", phone: "" });

const PlayerFormGroup = ({
  title,
  player,
  onChange,
  onRemove,
  isMember = false
}: {
  title: string;
  player: PlayerDetails;
  onChange: (p: PlayerDetails) => void;
  onRemove?: () => void;
  isMember?: boolean;
}) => (
  <div className="space-y-3 p-4 border border-border/50 rounded-xl bg-muted/20 relative group">
    <div className="flex justify-between items-center mb-1">
      <h4 className="font-heading text-sm font-semibold text-primary/90 flex items-center gap-2">
        {title}
      </h4>
      {isMember && onRemove && (
        <Button size="icon" variant="ghost" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={onRemove}>
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      )}
    </div>
    <Input placeholder="Full Name" value={player.name} onChange={(e) => onChange({ ...player, name: e.target.value })} className="bg-background/50" />
    <div className="grid grid-cols-2 gap-3">
      <Input placeholder="Roll Number" value={player.rollNo} onChange={(e) => onChange({ ...player, rollNo: e.target.value })} className="bg-background/50" />
      <Input placeholder="Phone Number" type="tel" value={player.phone} onChange={(e) => onChange({ ...player, phone: e.target.value })} className="bg-background/50" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      <Select value={player.department || undefined} onValueChange={(val) => onChange({ ...player, department: val })}>
        <SelectTrigger className="bg-background/50"><SelectValue placeholder="Department" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="B.Tech AI">B.Tech AI</SelectItem>
          <SelectItem value="B.Tech DS">B.Tech DS</SelectItem>
          <SelectItem value="BCA">BCA</SelectItem>
          <SelectItem value="BBA">BBA</SelectItem>
          <SelectItem value="BFSI">BFSI</SelectItem>
          <SelectItem value="B.Sc Data Analytics">B.Sc Data Analytics</SelectItem>
          <SelectItem value="MBA">MBA</SelectItem>
        </SelectContent>
      </Select>
      <Select value={player.year || undefined} onValueChange={(val) => onChange({ ...player, year: val })}>
        <SelectTrigger className="bg-background/50"><SelectValue placeholder="Year" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="1st Year">1st Year</SelectItem>
          <SelectItem value="2nd Year">2nd Year</SelectItem>
          <SelectItem value="3rd Year">3rd Year</SelectItem>
          <SelectItem value="4th Year">4th Year</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

export default function RegistrationModal({
  open,
  onClose,
  event,
}: {
  open: boolean;
  onClose: () => void;
  event: EventData;
}) {
  const [teamName, setTeamName] = useState("");
  const [leader, setLeader] = useState<PlayerDetails>(emptyPlayer());
  const [player2, setPlayer2] = useState<PlayerDetails>(emptyPlayer());
  const [members, setMembers] = useState<PlayerDetails[]>([emptyPlayer()]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  // Reset forms on open
  useEffect(() => {
    if (open) {
      setTeamName("");
      setLeader(emptyPlayer());
      setPlayer2(emptyPlayer());
      setMembers([emptyPlayer()]);
      setSubmitted(false);
    }
  }, [open, event]);

  const addMember = () => setMembers([...members, emptyPlayer()]);
  const removeMember = (i: number) => setMembers(members.filter((_, idx) => idx !== i));
  const updateMember = (i: number, val: PlayerDetails) => {
    const copy = [...members];
    copy[i] = val;
    setMembers(copy);
  };

  const isFormIncomplete = (p: PlayerDetails) => !p.name.trim() || !p.rollNo.trim() || !p.department || !p.year || !p.phone.trim();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("You must be logged in to register.");
      return;
    }
    if (event.type === "team" && !teamName.trim()) {
      toast.error("Please enter a Team Name");
      return;
    }
    if (isFormIncomplete(leader)) {
      toast.error(`Please fill all fields for ${event.type === "individual" ? "Player" : "the Team Leader"}`);
      return;
    }
    if (event.type === "duo" && isFormIncomplete(player2)) {
      toast.error("Please fill all fields for Player 2");
      return;
    }
    if (event.type === "team" && members.some(isFormIncomplete)) {
      toast.error("Please fill all fields for every Team Member");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        event_id: event.id,
        event_name: event.name,
        event_type: event.type,
        team_name: event.type === "team" ? teamName : null,
        leader_name: leader.name,
        leader_roll: leader.rollNo,
        leader_dept: leader.department,
        leader_year: leader.year,
        leader_phone: leader.phone,
        members: event.type === "individual" ? [] : event.type === "duo" ? [player2] : members,
      };

      const { error } = await supabase.from("registrations").insert(payload);
      if (error) throw error;

      toast.success("Registration successfully synced to the arena!");
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      toast.error("Database connection failed. Is your Supabase properly configured?");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-background border-border">
        <div className="p-6 pb-2">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl tracking-wide flex items-center gap-3">
              <span className="text-3xl">{event.emoji}</span>
              REGISTER FOR {event.name.toUpperCase()}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground/80 mt-1">
              {event.type === "team" && "Complete your team details below."}
              {event.type === "duo" && "Register your duo team details below."}
              {event.type === "individual" && "Fill in your personal details to enter."}
            </DialogDescription>
          </DialogHeader>
        </div>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-12 px-6">
            <Trophy className="w-20 h-20 text-primary drop-shadow-[0_0_15px_rgba(255,100,0,0.5)]" strokeWidth={1} />
            <p className="font-display tracking-wider text-2xl text-foreground mt-2">REGISTRATION CONFIRMED</p>
            <p className="text-sm text-muted-foreground text-center max-w-[80%]">
              You are officially entering the battlefield for {event.name}. Good luck, champion!
            </p>
            <Button onClick={onClose} variant="outline" className="mt-4 font-heading hover:bg-primary/10 hover:text-primary transition-all">
              Return to Arena
            </Button>
          </div>
        ) : (
          <div className="px-6 pb-6 mt-4">
            <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">

              {/* === TEAM ONLY: TEAM NAME === */}
              {event.type === "team" && (
                <div className="space-y-2">
                  <label className="text-sm font-semibold font-heading text-secondary">TEAM ID</label>
                  <Input
                    placeholder="Enter your epic Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="h-12 text-lg font-medium tracking-wide uppercase"
                  />
                </div>
              )}

              {/* === COMMON: LEADER / PLAYER 1 === */}
              <div className="space-y-4">
                <PlayerFormGroup
                  title={event.type === "individual" ? "PLAYER DETAILS" : event.type === "duo" ? "PLAYER 1" : "TEAM LEADER"}
                  player={leader}
                  onChange={setLeader}
                />
              </div>

              {/* === DUO ONLY: PLAYER 2 === */}
              {event.type === "duo" && (
                <div className="space-y-4 pt-2 border-t border-border/40">
                  <PlayerFormGroup
                    title="PLAYER 2"
                    player={player2}
                    onChange={setPlayer2}
                  />
                </div>
              )}

              {/* === TEAM ONLY: MEMBERS LIST === */}
              {event.type === "team" && (
                <div className="space-y-4 pt-4 border-t border-border/40">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold font-heading text-muted-foreground">SQUAD MEMBERS</label>
                  </div>
                  <div className="space-y-4">
                    {members.map((m, i) => (
                      <PlayerFormGroup
                        key={i}
                        title={`MEMBER ${i + 1}`}
                        player={m}
                        onChange={(val) => updateMember(i, val)}
                        onRemove={() => removeMember(i)}
                        isMember={members.length > 1}
                      />
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full font-heading mt-2 border-dashed border-2 hover:border-primary/50 text-muted-foreground hover:text-primary"
                    onClick={addMember}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Next Member
                  </Button>
                </div>
              )}
            </div>

            <div className="pt-6 mt-2 border-t border-border">
              <Button
                className="w-full h-12 gradient-cta text-primary-foreground font-display tracking-widest text-lg drop-shadow-md hover:drop-shadow-lg transition-all"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (event.type === "team" ? "SUBMIT TEAM REGISTRATION" : "CONFIRM REGISTRATION")}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

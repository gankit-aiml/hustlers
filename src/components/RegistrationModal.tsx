import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, CheckCircle } from "lucide-react";
import type { EventData } from "@/data/events";
import { toast } from "sonner";

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
  const [members, setMembers] = useState<string[]>([""]);
  const [submitted, setSubmitted] = useState(false);

  const isTeam = event.type === "team";

  const addMember = () => setMembers([...members, ""]);
  const removeMember = (i: number) => setMembers(members.filter((_, idx) => idx !== i));
  const updateMember = (i: number, val: string) => {
    const copy = [...members];
    copy[i] = val;
    setMembers(copy);
  };

  const handleSubmit = () => {
    if (isTeam && !teamName.trim()) {
      toast.error("Please enter a team name");
      return;
    }
    if (isTeam && members.some((m) => !m.trim())) {
      toast.error("Please fill all team member names");
      return;
    }

    // Without Supabase, just show success
    toast.success("Registration submitted! (Enable Lovable Cloud to save data)");
    setSubmitted(true);
  };

  const handleClose = () => {
    setTeamName("");
    setMembers([""]);
    setSubmitted(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">
            {event.emoji} Register for {event.name}
          </DialogTitle>
          <DialogDescription>
            {isTeam ? "Fill in your team details below." : "Confirm your individual registration."}
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 py-8">
            <CheckCircle className="w-16 h-16 text-sport-green" />
            <p className="font-heading text-lg text-foreground">Registration Confirmed!</p>
            <p className="text-sm text-muted-foreground text-center">
              You've registered for {event.name}. Good luck, champion!
            </p>
            <Button onClick={handleClose} variant="outline" className="font-heading">
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {isTeam && (
              <>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1">Team Name</label>
                  <Input
                    placeholder="Enter team name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">Team Members</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {members.map((m, i) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          placeholder={`Member ${i + 1}`}
                          value={m}
                          onChange={(e) => updateMember(i, e.target.value)}
                        />
                        {members.length > 1 && (
                          <Button size="icon" variant="ghost" onClick={() => removeMember(i)}>
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 font-heading"
                    onClick={addMember}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Member
                  </Button>
                </div>
              </>
            )}

            {!isTeam && (
              <p className="text-sm text-muted-foreground">
                Click confirm to register yourself for {event.name}.
              </p>
            )}

            <Button
              className="w-full gradient-cta text-primary-foreground font-heading"
              onClick={handleSubmit}
            >
              {isTeam ? "Submit Team Registration" : "Confirm Registration"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

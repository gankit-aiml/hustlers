import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="container py-16">
      <h2 className="font-display text-4xl md:text-5xl text-center gradient-hero-text mb-10">Contact Us</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Venue</h3>
              <p className="text-muted-foreground text-sm">
                Bhai Parmanand DSEU Campus, Shakarpur, Delhi – 110092
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Phone</h3>
              <p className="text-muted-foreground text-sm">+91-8506051876</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-heading text-lg font-semibold text-foreground">Email</h3>
              <p className="text-muted-foreground text-sm">sumitrathore45528@gmail.com</p>
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-muted">
            <p className="font-heading text-sm font-semibold text-foreground mb-1">Overall Logistic Support</p>
            <p className="text-xs text-muted-foreground">Mrs. Meenu Sharma • Sh. Sharwan Kumar • Sh. Faimuddin</p>
          </div>
        </div>
        <div className="rounded-xl overflow-hidden border border-border shadow-sport h-80">
          <iframe
            title="BPDSEU Campus Location"
            src="https://maps.google.com/maps?q=28.630164,77.2852984&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}

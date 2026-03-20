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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.574977086!2d77.2784!3d28.6380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfca72f2f07b7%3A0x5e45a3dc0d3f6a35!2sBhai%20Parmanand%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
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

import { Instagram, Mail, Phone } from "lucide-react";
import { DEVELOPER_INFO, APP_CONFIG } from "@/lib/constants";
import { NtflyLogo } from "@/components/ui/NtflyLogo";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Beta Note */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <NtflyLogo size="sm" />
            <p className="text-xs text-muted-foreground">
              {APP_CONFIG.betaNote}
            </p>
          </div>

          {/* Developer Info */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground">
              تطوير بواسطة{" "}
              <span className="text-primary font-medium">
                {DEVELOPER_INFO.name}
              </span>
            </p>
            <div className="flex items-center gap-4">
              <a
                href={`https://instagram.com/${DEVELOPER_INFO.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-4 h-4" />
                <span>@{DEVELOPER_INFO.instagram}</span>
              </a>
              <a
                href={`mailto:${DEVELOPER_INFO.email}`}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`tel:${DEVELOPER_INFO.phone}`}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Ntfly. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}

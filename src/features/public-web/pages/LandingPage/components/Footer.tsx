import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  Facebook,
  Instagram,
  Linkedin,
  LayoutGrid,
  Play,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Button, Logo } from "@/shared/ui/Common";
import { useRTL } from "@/shared/hooks/useRTL";

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useRTL();

  return (
    <footer
      id="contact"
      className="bg-brand-brown relative pt-24 pb-12 text-white overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 lg:gap-16 items-start mb-24">
          {/* Column: Logo & Socials - Full width and centered on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center lg:items-start space-y-10 col-span-2 lg:col-span-1 ${isRTL ? "lg:order-4" : ""}`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-white/5 rounded-full blur-2xl group-hover:bg-[#D38842]/10 transition-all duration-500" />
              <Logo variant="stacked" className="origin-center lg:origin-start relative z-10 scale-110 sm:scale-125" />
            </div>

            <div className="flex gap-5">
              {[
                { Icon: Facebook, name: "Facebook" },
                { Icon: Instagram, name: "Instagram" },
                { Icon: Linkedin, name: "LinkedIn" },
              ].map(({ Icon, name }, i) => (
                <motion.a
                  whileHover={{ y: -5, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  key={i}
                  href="#"
                  aria-label={name}
                  className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 hover:border-[#D38842]/50 hover:bg-[#D38842]/10 transition-all duration-300 group"
                >
                  <Icon className="w-6 h-6 group-hover:text-[#D38842] transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`flex flex-col items-start text-start col-span-1 ${isRTL ? "lg:order-3" : ""}`}
          >
            <h4 className="text-lg font-bold mb-10 text-white flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#D38842] rounded-full" />
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-5 text-base">
              {[
                { label: t("footer.about"), href: "#" },
                { label: t("footer.howItWorks"), href: "#" },
                { label: t("footer.features"), href: "#" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-white/60 hover:text-[#D38842] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D38842] scale-0 group-hover:scale-100 transition-transform duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column: Help Center */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className={`flex flex-col items-start text-start col-span-1 ${isRTL ? "lg:order-2" : ""}`}
          >
            <h4 className="text-lg font-bold mb-10 text-white flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#D38842] rounded-full" />
              {t("footer.support")}
            </h4>
            <ul className="space-y-5 text-base">
              {[
                { label: t("footer.contact"), href: "#" },
                { label: t("footer.terms"), href: "#" },
                { label: t("footer.privacy"), href: "#" },
                { label: t("footer.faq"), href: "#" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a 
                    href={link.href} 
                    className="text-white/60 hover:text-[#D38842] transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D38842] scale-0 group-hover:scale-100 transition-transform duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column: Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className={`flex flex-col items-start text-start col-span-2 sm:col-span-1 ${isRTL ? "lg:order-1" : ""}`}
          >
            <h4 className="text-lg font-bold mb-10 text-white flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#D38842] rounded-full" />
              {t("footer.contact")}
            </h4>
            <ul className="space-y-7 text-base">
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#D38842]/20 transition-all duration-300">
                  <Mail className="w-5 h-5 text-[#D38842]" />
                </div>
                <span dir="ltr" className="text-white/70 group-hover:text-white transition-colors cursor-pointer">partners@babbadoo.com</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#D38842]/20 transition-all duration-300">
                  <Phone className="w-5 h-5 text-[#D38842]" />
                </div>
                <span dir="ltr" className="text-white/70 group-hover:text-white transition-colors cursor-pointer">+20 123 456 7890</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-[#D38842]/20 transition-all duration-300">
                  <MapPin className="w-5 h-5 text-[#D38842]" />
                </div>
                <span className="text-white/70 group-hover:text-white transition-colors cursor-pointer">Cairo, Egypt</span>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-sm text-white/40" dir="ltr">© 2026 Babadoo</p>
          <div className="flex gap-8 text-xs font-medium text-white/30 tracking-widest uppercase">
            <span className="hover:text-[#D38842] cursor-pointer transition-colors tracking-tighter sm:tracking-widest">Premium Logistics</span>
            <span className="hover:text-[#D38842] cursor-pointer transition-colors tracking-tighter sm:tracking-widest">Fast Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

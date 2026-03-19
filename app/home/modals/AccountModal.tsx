"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Package, Settings, LogOut } from "lucide-react";
import { gothamOffice, italiana } from "@/app/utils/constant";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountModal = ({ isOpen, onClose }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#691C33] shadow-2xl border-l border-white/10 overflow-hidden"
          >
            {/* Elegant Pattern & Gradient */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `url('/pattern.png')`,
                backgroundSize: "200px",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4a1424] via-transparent to-black/20" />

            <div className="relative z-10 h-full flex flex-col">
              <div className="flex items-center justify-between p-8">
                <h2 className={`${italiana.className} text-4xl text-white`}>
                  Profile
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-white/50 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 px-8 py-4 space-y-10">
                <div className="text-center pb-8 border-b border-white/10">
                  <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-4 flex items-center justify-center border border-white/20">
                    <User className="w-10 h-10 text-white/80" />
                  </div>
                  <p className="text-white font-medium text-lg">
                    Guest Collector
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-widest mt-1">
                    Status: Authenticating
                  </p>
                </div>

                <div className="space-y-2">
                  <AccountLink
                    icon={<Package className="w-4 h-4" />}
                    label="Orders History"
                  />
                  <AccountLink
                    icon={<Settings className="w-4 h-4" />}
                    label="Account Settings"
                  />
                </div>

                <div className="space-y-4 pt-8">
                  <button className="w-full bg-white text-[#691C33] py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white/90 transition-all">
                    Sign In
                  </button>
                  <button className="w-full border border-white/20 text-white py-4 text-[11px] uppercase tracking-[0.3em] font-bold hover:bg-white/10 transition-all">
                    Create Account
                  </button>
                </div>
              </div>

              <div className="p-8 mt-auto">
                <button className="flex items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors">
                  <LogOut className="w-3 h-3" /> Sign out
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const AccountLink = ({ icon, label }: { icon: any; label: string }) => (
  <button className="w-full flex items-center gap-4 py-4 text-white/70 hover:text-white border-b border-white/5 group transition-colors">
    <span className="opacity-50 group-hover:opacity-100 transition-opacity">
      {icon}
    </span>
    <span className="text-sm uppercase tracking-widest">{label}</span>
  </button>
);

export default AccountModal;

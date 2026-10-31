import React, { useState } from 'react';
import { ShieldCheck, X, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { BUSINESS_CONFIG } from '../config/business';

export const BusinessVerificationModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Discreet Verified Badge */}
      <aside aria-label="Business Verification Status" className="fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-neutral-900/95 hover:bg-neutral-900 text-neutral-200 border border-[#D6A52B]/40 hover:border-[#D6A52B] shadow-lg rounded-full py-2 px-3.5 text-xs font-medium flex items-center gap-2 backdrop-blur-md transition-all cursor-pointer hover:scale-105 active:scale-95"
          title="Click to view verified business details & deployment settings"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <ShieldCheck className="w-3.5 h-3.5 text-[#D6A52B]" />
          <span className="hidden sm:inline">Verified Business Info</span>
        </button>
      </aside>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-neutral-900 text-white rounded-3xl border border-neutral-700 max-w-xl w-full p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 cursor-pointer"
              aria-label="Close verification modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#D6A52B]/20 text-[#D6A52B] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-luxury text-xl font-bold text-white">
                  Business Details & Verification
                </h3>
                <p className="text-xs text-neutral-400">
                  Client verification audit & central configuration
                </p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {BUSINESS_CONFIG.verificationStatus.map((item) => (
                <div
                  key={item.field}
                  className="bg-neutral-950/80 border border-neutral-800 rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <span className="text-xs font-bold text-neutral-300 block">
                      {item.field}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {item.value}
                    </span>
                    <span className="text-[11px] text-neutral-500 block mt-0.5">
                      Source: {item.source}
                    </span>
                  </div>
                  <div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1 ${
                        item.status === 'VERIFIED'
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {item.status === 'VERIFIED' && <CheckCircle className="w-3 h-3" />}
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-xs text-neutral-300 space-y-2 mb-6">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-[#D6A52B] flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Appointment Notification Recipient:</strong>
                  <br />
                  Emails from customers requesting appointments are dispatched directly to{' '}
                  <code className="text-[#F2D27A] bg-neutral-900 px-1.5 py-0.5 rounded">
                    artworkexpressllc@gmail.com
                  </code>
                  {' '}(Hostinger PHP API & Resend integrated).
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-neutral-800">
              <a
                href={BUSINESS_CONFIG.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[#D6A52B] hover:underline inline-flex items-center gap-1"
              >
                <span>Google Business Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsOpen(false)}
                className="gold-gradient-bg text-black text-xs font-bold px-4 py-2 rounded-xl cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

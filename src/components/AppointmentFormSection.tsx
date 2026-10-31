import React, { useState, useEffect, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  Sparkles,
  Send,
  AlertCircle,
  CheckCircle2,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { BUSINESS_CONFIG, SERVICES } from '../config/business';

interface AppointmentFormSectionProps {
  selectedHairstyle: string;
  onHairstyleChange: (style: string) => void;
}

export const AppointmentFormSection: React.FC<AppointmentFormSectionProps> = ({
  selectedHairstyle,
  onHairstyleChange,
}) => {
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    hairstyle: selectedHairstyle || 'Knotless Braids',
    date: '',
    time: 'Morning (7:00 AM – 12:00 PM)',
    comments: '',
    bot_trap: '', // Honeypot field
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Sync when parent hairstyle selection changes
  useEffect(() => {
    if (selectedHairstyle) {
      setFormData((prev) => ({ ...prev, hairstyle: selectedHairstyle }));
    }
  }, [selectedHairstyle]);

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) {
      errors.name = 'Please provide your full name.';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Please provide your phone number.';
    } else if (formData.phone.trim().length < 7) {
      errors.phone = 'Please enter a valid phone number.';
    }

    if (!formData.hairstyle) {
      errors.hairstyle = 'Please select a preferred hairstyle.';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Bot trap check
    if (formData.bot_trap) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      // Call Netlify function endpoint
      // Our Vite dev server middleware also handles this same path in development!
      const response = await fetch('/api/appointment-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            'We were unable to process your appointment request at this moment. Please call us directly.'
        );
      }

      setSuccessMessage(
        result.message ||
          'Thank you! Your appointment request has been submitted successfully. Syviana Africa Hair Braiding will contact you to discuss your request and confirm availability.'
      );

      // Reset form but keep phone handy
      setFormData({
        name: '',
        email: '',
        phone: '',
        hairstyle: selectedHairstyle || 'Knotless Braids',
        date: '',
        time: 'Morning (7:00 AM – 12:00 PM)',
        comments: '',
        bot_trap: '',
      });
      setValidationErrors({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="booking"
      ref={formRef}
      className="py-20 bg-neutral-950 text-white relative border-b border-neutral-800"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#D6A52B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Context & Direct Contact Details */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D6A52B] font-bold mb-3">
              <Sparkles className="w-4 h-4 text-[#F2D27A]" />
              <span>Personalized Braiding</span>
            </div>

            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
              Request an <br />
              <span className="gold-gradient-text italic font-normal">Appointment</span>
            </h2>

            <p className="text-neutral-300 text-base leading-relaxed mb-6">
              Send us your preferred hairstyle and appointment details. We will contact you
              promptly to discuss availability and confirm your appointment.
            </p>

            <div className="bg-neutral-900/90 border border-neutral-800 rounded-2xl p-6 mb-8 shadow-inner">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-[#D6A52B] flex-shrink-0 mt-0.5" />
                <div className="text-sm text-neutral-300 leading-relaxed">
                  <strong className="text-white">Note Regarding Dates & Times:</strong>
                  <br />
                  This is an appointment request form, not an automated booking calendar. Submitting
                  this form sends your preferred time to our team. An appointment is only confirmed
                  once we speak with you via phone or email.
                </div>
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-serif-luxury text-lg font-bold text-white flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#D6A52B]" />
                Prefer to Call or Text?
              </h3>
              <p className="text-sm text-neutral-400">
                You can reach out to us directly for urgent inquiries, consultation questions, or
                same-day walk-in availability.
              </p>
              <a
                href={`tel:${BUSINESS_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-2 text-[#F2D27A] hover:text-white font-bold text-lg tracking-wide transition-colors"
              >
                <span>{BUSINESS_CONFIG.phoneDisplay}</span>
                <span className="text-sm font-normal text-neutral-400">
                  (Tap to call)
                </span>
              </a>
              <div className="pt-2 border-t border-neutral-800/80 text-xs text-neutral-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#D6A52B]" />
                <span>Open 7:00 AM – 9:00 PM (Monday – Sunday)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Appointment Request Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-neutral-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-neutral-200">
              <div className="mb-8 border-b border-neutral-100 pb-5">
                <h3 className="font-serif-luxury text-2xl font-bold text-neutral-900">
                  Your Appointment Details
                </h3>
                <p className="text-sm text-neutral-600 mt-1">
                  Fill out the information below to send your request directly to our salon manager.
                </p>
              </div>

              {/* Success Notification Banner */}
              {successMessage && (
                <div
                  className="mb-8 bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-6 text-emerald-950 animate-in fade-in duration-300"
                  role="alert"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-base text-emerald-900">
                        Request Received!
                      </h4>
                      <p className="text-sm text-emerald-800 mt-1 leading-relaxed">
                        {successMessage}
                      </p>
                      <button
                        type="button"
                        onClick={() => setSuccessMessage(null)}
                        className="mt-4 text-xs font-bold text-emerald-900 underline hover:text-emerald-700 cursor-pointer"
                      >
                        Submit another request
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Notification Banner */}
              {errorMessage && (
                <div
                  className="mb-8 bg-rose-50 border-2 border-rose-500/40 rounded-2xl p-6 text-rose-950 animate-in fade-in duration-300"
                  role="alert"
                >
                  <div className="flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-base text-rose-900">
                        Could Not Submit Request
                      </h4>
                      <p className="text-sm text-rose-800 mt-1 leading-relaxed">
                        {errorMessage}
                      </p>
                      <p className="text-xs text-rose-900 mt-2 font-semibold">
                        Please feel free to call us directly at{' '}
                        <a href={`tel:${BUSINESS_CONFIG.phoneRaw}`} className="underline font-bold">
                          {BUSINESS_CONFIG.phoneDisplay}
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* Honeypot field (hidden from genuine users) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="bot_trap">Do not fill this out</label>
                  <input
                    type="text"
                    id="bot_trap"
                    name="bot_trap"
                    value={formData.bot_trap}
                    onChange={(e) => setFormData({ ...formData, bot_trap: e.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="client_name"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2"
                    >
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="client_name"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (validationErrors.name) {
                            setValidationErrors({ ...validationErrors, name: '' });
                          }
                        }}
                        placeholder="e.g. Jessica Williams"
                        className={`w-full pl-10 pr-4 py-3 bg-neutral-50 border rounded-xl text-neutral-900 text-sm focus:bg-white focus:outline-none transition-colors ${
                          validationErrors.name
                            ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-300'
                            : 'border-neutral-300 focus:border-[#D6A52B]'
                        }`}
                        required
                      />
                    </div>
                    {validationErrors.name && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">
                        {validationErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="client_phone"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2"
                    >
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="client_phone"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (validationErrors.phone) {
                            setValidationErrors({ ...validationErrors, phone: '' });
                          }
                        }}
                        placeholder="e.g. (312) 555-0199"
                        className={`w-full pl-10 pr-4 py-3 bg-neutral-50 border rounded-xl text-neutral-900 text-sm focus:bg-white focus:outline-none transition-colors ${
                          validationErrors.phone
                            ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-300'
                            : 'border-neutral-300 focus:border-[#D6A52B]'
                        }`}
                        required
                      />
                    </div>
                    {validationErrors.phone && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">
                        {validationErrors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="client_email"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2"
                  >
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="client_email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (validationErrors.email) {
                          setValidationErrors({ ...validationErrors, email: '' });
                        }
                      }}
                      placeholder="your.email@example.com"
                      className={`w-full pl-10 pr-4 py-3 bg-neutral-50 border rounded-xl text-neutral-900 text-sm focus:bg-white focus:outline-none transition-colors ${
                        validationErrors.email
                          ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-300'
                          : 'border-neutral-300 focus:border-[#D6A52B]'
                      }`}
                      required
                    />
                  </div>
                  {validationErrors.email && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">
                      {validationErrors.email}
                    </p>
                  )}
                </div>

                {/* Preferred Hairstyle Selection */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label
                      htmlFor="client_hairstyle"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-800"
                    >
                      Preferred Hairstyle <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-xs text-[#9A6F00] font-medium">
                      Selected: {formData.hairstyle}
                    </span>
                  </div>

                  <div className="relative">
                    <select
                      id="client_hairstyle"
                      value={formData.hairstyle}
                      onChange={(e) => {
                        setFormData({ ...formData, hairstyle: e.target.value });
                        onHairstyleChange(e.target.value);
                      }}
                      className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 text-sm focus:bg-white focus:border-[#D6A52B] focus:outline-none font-medium appearance-none cursor-pointer"
                      required
                    >
                      {SERVICES.map((srv) => (
                        <option key={srv.id} value={srv.name}>
                          {srv.name} — {srv.category}
                        </option>
                      ))}
                      <option value="Consultation / Other Custom Style">
                        Other Custom Style / Consultation
                      </option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-neutral-500 text-xs">
                      ▼
                    </div>
                  </div>
                </div>

                {/* Preferred Date & Preferred Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="client_date"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2"
                    >
                      Preferred Date <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <CalendarIcon className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        id="client_date"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 text-sm focus:bg-white focus:border-[#D6A52B] focus:outline-none"
                      />
                    </div>
                    <span className="text-[11px] text-neutral-500 mt-1 block">
                      Dates are subject to salon confirmation.
                    </span>
                  </div>

                  <div>
                    <label
                      htmlFor="client_time"
                      className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2"
                    >
                      Preferred Time of Day{' '}
                      <span className="text-neutral-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <select
                        id="client_time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 text-sm focus:bg-white focus:border-[#D6A52B] focus:outline-none appearance-none cursor-pointer"
                      >
                        <option value="Morning (7:00 AM – 12:00 PM)">
                          Morning (7:00 AM – 12:00 PM)
                        </option>
                        <option value="Afternoon (12:00 PM – 5:00 PM)">
                          Afternoon (12:00 PM – 5:00 PM)
                        </option>
                        <option value="Evening (5:00 PM – 9:00 PM)">
                          Evening (5:00 PM – 9:00 PM)
                        </option>
                        <option value="Flexible / First Available Slot">
                          Flexible / First Available Slot
                        </option>
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-neutral-500 text-xs">
                        ▼
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Comments or Special Requests */}
                <div>
                  <label
                    htmlFor="client_comments"
                    className="block text-xs font-bold uppercase tracking-wider text-neutral-800 mb-2"
                  >
                    Additional Comments or Special Requests{' '}
                    <span className="text-neutral-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="client_comments"
                    rows={3}
                    value={formData.comments}
                    onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                    placeholder="Mention desired braid length (waist, mid-back), braid size, hair color preferences, or any questions..."
                    className="w-full px-4 py-3 bg-neutral-50 border border-neutral-300 rounded-xl text-neutral-900 text-sm focus:bg-white focus:border-[#D6A52B] focus:outline-none resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full gold-gradient-bg text-neutral-950 font-bold py-4 px-6 rounded-2xl text-base shadow-lg hover:shadow-xl hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Submit Appointment Request</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Privacy & Anti-Spam reassurance */}
                <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 pt-2 text-center">
                  <ShieldCheck className="w-4 h-4 text-[#D6A52B]" />
                  <span>Your information is kept private and used only for your appointment request.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

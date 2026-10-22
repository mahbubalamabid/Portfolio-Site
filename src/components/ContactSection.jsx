import { useState } from "react";
import { Mail, MapPin, Copy, Check, Send, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const email = "sawfaasbir.abid@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFieldChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validate = () => {
    const errors = {};
    if (!formState.name.trim()) {
      errors.name = "Please enter your name.";
    }
    if (!formState.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      errors.email = "Please enter a valid email address (e.g. name@example.com).";
    }
    if (!formState.subject.trim()) {
      errors.subject = "Please enter a subject.";
    }
    if (!formState.message.trim()) {
      errors.message = "Please enter your message.";
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = Object.keys(errors)[0];
      const el = document.getElementById(`contact-${firstErrorField}`);
      if (el) el.focus();
      return;
    }

    setFieldErrors({});
    setSubmitting(true);

    const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT;

    // Check whether a valid Formspree endpoint is configured
    if (
      !endpoint ||
      endpoint.trim() === "" ||
      endpoint.includes("YOUR_FORM_ID") ||
      endpoint.includes("your_form_id")
    ) {
      setSubmitting(false);
      setErrorMessage(
        "Formspree endpoint is not configured. Please set VITE_CONTACT_FORM_ENDPOINT in your .env file (see .env.example) or email Mahbub directly at sawfaasbir.abid@gmail.com."
      );
      return;
    }

    try {
      const response = await fetch(endpoint.trim(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          _replyto: formState.email.trim(),
          subject: formState.subject.trim(),
          message: formState.message.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let errorText = "Formspree submission failed. Please verify your details and try again.";
        if (data && data.errors && Array.isArray(data.errors) && data.errors.length > 0) {
          errorText = data.errors.map((item) => item.message || item.field).join(", ");
        } else if (data && data.error) {
          errorText = data.error;
        }
        throw new Error(errorText);
      }

      setSubmitting(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSubmitting(false);
      setErrorMessage(
        err instanceof Error && err.message
          ? err.message
          : "Unable to connect to Formspree. Please check your internet connection or email Mahbub directly at sawfaasbir.abid@gmail.com."
      );
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
            <Mail className="w-3.5 h-3.5" />
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let's Build Something{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
              Great Together
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400">
            Have a web project in mind or want to connect? I'm always interested in learning, building, and collaborating. Feel free to reach out.
          </p>
        </div>

        {/* Balanced Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Left Column: Four Contact Cards starting neatly at the top */}
          <div className="space-y-3 sm:space-y-3.5">
            {/* Card 1: Email */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-cyan-500/30 transition-colors">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                      DIRECT EMAIL
                    </div>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm sm:text-[15px] font-semibold text-white hover:text-cyan-300 transition-colors truncate block"
                    >
                      {email}
                    </a>
                    <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                      For inquiries, collaboration, or professional communication.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors relative shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ml-1"
                  title="Copy email"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copied && (
                    <span className="absolute -top-7 right-0 text-[10px] bg-emerald-500 text-black font-bold px-2 py-0.5 rounded shadow whitespace-nowrap">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Card 2: GitHub */}
            <a
              href="https://github.com/mahbubalamabid"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 group flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                    GITHUB PROFILE
                  </div>
                  <div className="text-sm sm:text-[15px] font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                    github.com/mahbubalamabid
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Explore my projects, code, and development progress.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-zinc-400 group-hover:text-cyan-300 transition-colors shrink-0 flex items-center gap-0.5 ml-1">
                <span>Visit</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </a>

            {/* Card 3: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mahbub-alam-abid/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 hover:border-cyan-500/30 hover:bg-zinc-900/80 transition-all duration-200 group flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                    LINKEDIN PROFILE
                  </div>
                  <div className="text-sm sm:text-[15px] font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                    linkedin.com/in/mahbub-alam-abid/
                  </div>
                  <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                    Connect with me professionally and follow my development journey.
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-zinc-400 group-hover:text-cyan-300 transition-colors shrink-0 flex items-center gap-0.5 ml-1">
                <span>Visit</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </span>
            </a>

            {/* Card 4: Location & Work Preference */}
            <div className="p-4 sm:p-5 rounded-2xl bg-zinc-900/60 border border-white/10 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 font-semibold mb-0.5">
                  LOCATION & WORK PREFERENCE
                </div>
                <div className="text-sm sm:text-[15px] font-semibold text-white">
                  Bangladesh · Open to Remote Opportunities
                </div>
                <p className="text-xs text-zinc-400 mt-0.5 leading-relaxed">
                  Open to connecting with teams and exploring remote-friendly opportunities.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div>
            <div className="rounded-3xl bg-zinc-900/70 border border-white/10 p-4 min-[360px]:p-6 sm:p-8 backdrop-blur-sm shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Mahbub has received your message via Formspree and will reply to your email as soon as possible.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-sm font-semibold text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-4.5">
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5 leading-relaxed"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <span className="font-semibold block mb-0.5">Notice</span>
                        <span>{errorMessage}</span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
                      >
                        YOUR NAME
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        value={formState.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        placeholder="e.g. John Doe"
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-white placeholder-zinc-600 focus:outline-none transition-colors text-sm ${
                          fieldErrors.name
                            ? "border-red-500/50 focus:border-red-400"
                            : "border-white/10 focus:border-cyan-400"
                        }`}
                      />
                      {fieldErrors.name && (
                        <p id="contact-name-error" className="text-[11px] text-red-400 mt-1">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
                      >
                        YOUR EMAIL
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formState.email}
                        onChange={(e) => handleFieldChange("email", e.target.value)}
                        placeholder="john@example.com"
                        aria-invalid={!!fieldErrors.email}
                        aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
                        className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-white placeholder-zinc-600 focus:outline-none transition-colors text-sm ${
                          fieldErrors.email
                            ? "border-red-500/50 focus:border-red-400"
                            : "border-white/10 focus:border-cyan-400"
                        }`}
                      />
                      {fieldErrors.email && (
                        <p id="contact-email-error" className="text-[11px] text-red-400 mt-1">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
                    >
                      SUBJECT
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formState.subject}
                      onChange={(e) => handleFieldChange("subject", e.target.value)}
                      placeholder="Project inquiry, collaboration, or opportunity"
                      aria-invalid={!!fieldErrors.subject}
                      aria-describedby={fieldErrors.subject ? "contact-subject-error" : undefined}
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-white placeholder-zinc-600 focus:outline-none transition-colors text-sm ${
                        fieldErrors.subject
                          ? "border-red-500/50 focus:border-red-400"
                          : "border-white/10 focus:border-cyan-400"
                      }`}
                    />
                    {fieldErrors.subject && (
                      <p id="contact-subject-error" className="text-[11px] text-red-400 mt-1">
                        {fieldErrors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1.5"
                    >
                      YOUR MESSAGE
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formState.message}
                      onChange={(e) => handleFieldChange("message", e.target.value)}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
                      className={`w-full px-4 py-2.5 rounded-xl bg-black/60 border text-white placeholder-zinc-600 focus:outline-none transition-colors text-sm resize-none ${
                        fieldErrors.message
                          ? "border-red-500/50 focus:border-red-400"
                          : "border-white/10 focus:border-cyan-400"
                      }`}
                    />
                    {fieldErrors.message && (
                      <p id="contact-message-error" className="text-[11px] text-red-400 mt-1">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500 text-black font-bold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-1"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message to Mahbub</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

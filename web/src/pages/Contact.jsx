import { useRef, useState } from "react";
import { Button, Spinner } from "@/components";
import { BASE_URL } from "@/utils/constants";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const nameRef = useRef(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Le nom est requis.";
    if (!form.email.trim()) e.email = "L'email est requis.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Adresse e‑mail invalide.";
    if (!form.message.trim()) e.message = "Le message est requis.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    const eObj = validate();
    if (Object.keys(eObj).length) {
      setErrors(eObj);
      return;
    }

    try {
      setStatus("sending");
      await fetch(BASE_URL + "/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      nameRef.current?.focus();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center py-12 px-4 sm:px-6 lg:px-8 text-slate-900 dark:text-slate-100">
      <div className="w-full max-w-xl bg-white dark:bg-slate-900 dark:border-slate-800 border border-transparent rounded-lg shadow-sm dark:shadow-none p-8">
        <h1 className="text-2xl font-semibold mb-2">Contact</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">Une question ? Envoie-nous un message et nous te répondrons rapidement.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 gap-4">
            <label className="flex flex-col">
              <span className="text-sm mb-2">Nom</span>
              <input
                ref={nameRef}
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600"
                placeholder="Ton nom"
              />
              {errors.name && (
                <span id="name-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</span>
              )}
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-2">Email</span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                type="email"
                className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600"
                placeholder="adresse@exemple.com"
              />
              {errors.email && (
                <span id="email-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</span>
              )}
            </label>

            <label className="flex flex-col">
              <span className="text-sm mb-2">Message</span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 resize-y"
                placeholder="Tape ton message ici..."
              />
              {errors.message && (
                <span id="message-error" className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.message}</span>
              )}
            </label>

            <div className="flex items-center gap-4 pt-2">
              <Button variant="success" disabled={status === "sending"} onClick={handleSubmit} type="submit">
                {status === "sending" ? (
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" color="white" />
                    <span>Envoi…</span>
                  </div>
                ) : (
                  "Envoyer"
                )}
              </Button>

              <div className="min-h-5">
                {status === "success" && (
                  <p className="text-sm text-green-700 dark:text-green-400">Merci — message envoyé.</p>
                )}
                {status === "error" && (
                  <p className="text-sm text-red-600 dark:text-red-400">Une erreur est survenue. Réessaye plus tard.</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;
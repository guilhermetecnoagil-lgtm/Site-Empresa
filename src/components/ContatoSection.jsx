import React, { useMemo, useRef, useState, useCallback } from "react";
import "../styles/ContatoSection.css";
import Curriculum from "./curriculum";

const DEFAULT_EMAIL = "ti@tecnoagil.com";
const DEFAULT_SUBJECT = "Contato pelo site";

// 🔹 Utilidades (fora do componente para não recriar a cada render)
const isValidEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(v || "").trim());

const crlf = (s) => String(s || "").replace(/\r?\n/g, "%0D%0A");

const formatarTelefone = (valor) => {
  const numeros = (valor || "").replace(/\D/g, "").slice(0, 11);
  return numeros.length <= 10
    ? numeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3")
    : numeros.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
};

const ContatoSection = () => {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const hiddenMailtoRef = useRef(null);

  // 🔹 useMemo para configs injetadas
  const CONTACT_ENDPOINT = useMemo(
    () => (typeof window !== "undefined" ? window._env_?.CONTACT_ENDPOINT || null : null),
    []
  );
  const CONTACT_EMAIL = useMemo(
    () => (typeof window !== "undefined" ? window._env_?.CONTACT_EMAIL || DEFAULT_EMAIL : DEFAULT_EMAIL),
    []
  );

  // 🔹 Handlers memoizados
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setOkMsg("");
    setErrors((prev) => ({ ...prev, [name]: "", submit: "" }));

    setForm((prev) => ({
      ...prev,
      [name]: name === "telefone" ? formatarTelefone(value) : value,
    }));
  }, []);

  const validar = useCallback(() => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Informe seu primeiro nome.";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";
    if (!form.mensagem.trim()) e.mensagem = "Escreva sua mensagem.";
    if (form.mensagem.length > 180) e.mensagem = "Máximo de 180 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }, [form]);

  // 🔹 Helpers de links
  const buildMailto = useCallback(() => {
    const corpo = [
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      `Telefone: ${form.telefone || "Não informado"}`,
      "",
      `Mensagem:`,
      `${form.mensagem}`,
    ].join("\r\n");

    return `mailto:${encodeURIComponent(CONTACT_EMAIL)}?subject=${encodeURIComponent(
      DEFAULT_SUBJECT
    )}&body=${crlf(corpo)}`;
  }, [form, CONTACT_EMAIL]);

  const buildWebmailLink = useCallback(
    (provider) => {
      const body = [
        `Nome: ${form.nome}`,
        `Email: ${form.email}`,
        `Telefone: ${form.telefone || "Não informado"}`,
        "",
        `Mensagem:`,
        `${form.mensagem}`,
      ].join("\n");

      if (provider === "gmail") {
        return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
          CONTACT_EMAIL
        )}&su=${encodeURIComponent(DEFAULT_SUBJECT)}&body=${encodeURIComponent(body)}`;
      }
      return `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
        CONTACT_EMAIL
      )}&subject=${encodeURIComponent(DEFAULT_SUBJECT)}&body=${encodeURIComponent(body)}`;
    },
    [form, CONTACT_EMAIL]
  );

  // 🔹 API request isolada
  const enviarAPI = useCallback(async () => {
    const payload = {
      ...form,
      origem: "site/contato",
      timestamp: Date.now(),
    };
    const res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Falha API (${res.status})`);
  }, [form, CONTACT_ENDPOINT]);

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setOkMsg("");
      setErrors((prev) => ({ ...prev, submit: "" }));
      if (!validar()) return;

      setEnviando(true);
      try {
        if (CONTACT_ENDPOINT) {
          await enviarAPI();
          setOkMsg("Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.");
          setForm({ nome: "", email: "", telefone: "", mensagem: "" });
          return;
        }

        // fallback mailto
        const href = buildMailto();
        if (hiddenMailtoRef.current) {
          hiddenMailtoRef.current.href = href;
          hiddenMailtoRef.current.click();
        } else {
          window.location.href = href;
        }
        setOkMsg("Abrimos seu cliente de e-mail com a mensagem preenchida.");
      } catch (err) {
        console.error(err);
        // fallback mailto se API falhar
        try {
          const href = buildMailto();
          if (hiddenMailtoRef.current) {
            hiddenMailtoRef.current.href = href;
            hiddenMailtoRef.current.click();
          } else {
            window.location.href = href;
          }
          setOkMsg("Não foi possível enviar pela API. Abrimos seu e-mail para você concluir o envio.");
        } catch {
          setErrors((prev) => ({
            ...prev,
            submit: "Não foi possível enviar a mensagem agora. Tente novamente mais tarde.",
          }));
        }
      } finally {
        setEnviando(false);
      }
    },
    [validar, CONTACT_ENDPOINT, enviarAPI, buildMailto]
  );

  return (
    <section className="contato-section">
      <a ref={hiddenMailtoRef} href="/" style={{ display: "none" }} aria-hidden />

      <div className="contato-content">
        <div className="contato-mapa">
          <iframe
            title="Localização Tecnoagil"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.471458646599!2d-40.848725725898404!3d-14.854892900522023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7463baf0abe935b%3A0x428db85491f6b03c!2sTecnoagil!5e0!3m2!1spt-BR!2sbr!4v1753207320889!5m2!1spt-BR!2sbr"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <form className="contato-form" onSubmit={onSubmit} noValidate>
          {/* Nome */}
          <label>
            Primeiro Nome *
            <input
              type="text"
              name="nome"
              placeholder="Ex: John"
              required
              value={form.nome}
              onChange={handleChange}
              aria-invalid={!!errors.nome}
              aria-describedby={errors.nome ? "err-nome" : undefined}
            />
            {errors.nome && <small id="err-nome" className="erro-campo">{errors.nome}</small>}
          </label>

          {/* Email */}
          <label>
            Endereço de E-mail *
            <input
              type="email"
              name="email"
              placeholder="Ex: john@tecnoagil.com"
              required
              value={form.email}
              onChange={handleChange}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "err-email" : undefined}
            />
            {errors.email && <small id="err-email" className="erro-campo">{errors.email}</small>}
          </label>

          {/* Telefone */}
          <label>
            Telefone
            <input
              type="tel"
              name="telefone"
              placeholder="Ex: (77) 99999-9999"
              value={form.telefone}
              onChange={handleChange}
              inputMode="tel"
              autoComplete="tel"
            />
          </label>

          {/* Mensagem */}
          <label>
            Mensagem *
            <textarea
              name="mensagem"
              placeholder="Escreva sua mensagem"
              rows="4"
              maxLength={180}
              required
              value={form.mensagem}
              onChange={handleChange}
              aria-invalid={!!errors.mensagem}
              aria-describedby={errors.mensagem ? "err-msg" : undefined}
            />
            <div className="contador-chars">{form.mensagem.length} / 180</div>
            {errors.mensagem && <small id="err-msg" className="erro-campo">{errors.mensagem}</small>}
          </label>

          {/* Feedbacks */}
          {errors.submit && <div className="erro-global" role="alert">{errors.submit}</div>}
          {okMsg && <div className="ok-global" role="status" aria-live="polite">{okMsg}</div>}

          {/* Botão */}
          <button type="submit" className="botao-enviar" disabled={enviando}>
            {enviando ? "Enviando..." : "Enviar"}
          </button>

          {/* Webmail */}
          <div className="envio-alternativo">
            Prefere webmail? &nbsp;
            <a href={buildWebmailLink("gmail")} target="_blank" rel="noreferrer">Abrir no Gmail</a>
            &nbsp;|&nbsp;
            <a href={buildWebmailLink("outlook")} target="_blank" rel="noreferrer">Abrir no Outlook Web</a>
          </div>
        </form>
      </div>
      <Curriculum />
    </section>
  );
};

export default ContatoSection;

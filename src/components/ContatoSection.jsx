import React, { useMemo, useRef, useState } from "react";
import "../styles/ContatoSection.css";

/**
 * ContatoSection — versão final
 * - Tenta enviar via API (window._env_.CONTACT_ENDPOINT). Se não existir ou falhar,
 *   faz fallback para mailto.
 * - Mostra mensagens de sucesso/erro e evita envio duplo (loading).
 * - Máscara de telefone BR e validações simples.
 * - Atalhos para Gmail/Outlook Web (opcional).
 *
 * Para habilitar a API:
 * <script>
 *   window._env_ = {
 *     CONTACT_ENDPOINT: "https://seu-dominio.com/api/contact",
 *     CONTACT_EMAIL: "ti@tecnoagil.com"
 *   }
 * </script>
 */

const DEFAULT_EMAIL = "ti@tecnoagil.com";
const DEFAULT_SUBJECT = "Contato pelo site";

// Validação simples de email
const isValidEmail = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(String(v || "").trim());

// Normaliza CRLF para mailto
const crlf = (s) => String(s || "").replace(/\r?\n/g, "%0D%0A");

// Máscara telefone BR (até 11 dígitos)
const formatarTelefone = (valor) => {
  const somenteNumeros = (valor || "").replace(/\D/g, "").slice(0, 11);
  if (somenteNumeros.length <= 10) {
    return somenteNumeros.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  }
  return somenteNumeros.replace(/^(\d{2})(\d{5})(\d{0,4})$/, "($1) $2-$3");
};

const ContatoSection = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [errors, setErrors] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [okMsg, setOkMsg] = useState("");
  const hiddenMailtoRef = useRef(null);

  // Configs opcionais injetadas no index.html
  const CONTACT_ENDPOINT = useMemo(
    () => (typeof window !== "undefined" ? window._env_?.CONTACT_ENDPOINT || null : null),
    []
  );
  const CONTACT_EMAIL = useMemo(
    () => (typeof window !== "undefined" ? window._env_?.CONTACT_EMAIL || DEFAULT_EMAIL : DEFAULT_EMAIL),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOkMsg("");
    setErrors((prev) => ({ ...prev, [name]: "", submit: "" }));

    if (name === "telefone") {
      setForm((prev) => ({ ...prev, [name]: formatarTelefone(value) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validar = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Informe seu primeiro nome.";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";
    if (!form.mensagem.trim()) e.mensagem = "Escreva sua mensagem.";
    if (form.mensagem.length > 180) e.mensagem = "Máximo de 180 caracteres.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Gera mailto com form + CRLF
  const buildMailto = () => {
    const assunto = `${DEFAULT_SUBJECT}`;
    const corpo = [
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      `Telefone: ${form.telefone || "Não informado"}`,
      "",
      `Mensagem:`,
      `${form.mensagem}`,
    ].join("\r\n");

    return `mailto:${encodeURIComponent(
      CONTACT_EMAIL
    )}?subject=${encodeURIComponent(assunto)}&body=${crlf(corpo)}`;
  };

  // Links para compor via webmail (caso usuário prefira web)
  const buildGmailLink = () => {
    const body = [
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      `Telefone: ${form.telefone || "Não informado"}`,
      "",
      `Mensagem:`,
      `${form.mensagem}`,
    ].join("\n");
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      CONTACT_EMAIL
    )}&su=${encodeURIComponent(DEFAULT_SUBJECT)}&body=${encodeURIComponent(body)}`;
  };

  const buildOutlookWebLink = () => {
    const body = [
      `Nome: ${form.nome}`,
      `Email: ${form.email}`,
      `Telefone: ${form.telefone || "Não informado"}`,
      "",
      `Mensagem:`,
      `${form.mensagem}`,
    ].join("\n");
    return `https://outlook.office.com/mail/deeplink/compose?to=${encodeURIComponent(
      CONTACT_EMAIL
    )}&subject=${encodeURIComponent(DEFAULT_SUBJECT)}&body=${encodeURIComponent(body)}`;
  };

  // Envio pela API (se houver)
  const enviarAPI = async () => {
    const payload = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim(),
      mensagem: form.mensagem.trim(),
      origem: "site/contato",
      timestamp: Date.now(),
    };

    const res = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => "");
      throw new Error(`Falha API (${res.status}) ${txt}`);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setOkMsg("");
    setErrors((prev) => ({ ...prev, submit: "" }));
    if (!validar()) return;

    setEnviando(true);
    try {
      // 1) tenta API se existir
      if (CONTACT_ENDPOINT) {
        await enviarAPI();
        setOkMsg("Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.");
        setForm({ nome: "", email: "", telefone: "", mensagem: "" });
        return;
      }

      // 2) fallback: mailto
      const href = buildMailto();
      if (hiddenMailtoRef.current) {
        hiddenMailtoRef.current.href = href;
        hiddenMailtoRef.current.click();
      } else {
        window.location.href = href;
      }
      setOkMsg("Abrimos seu cliente de e-mail com a mensagem preenchida. É só revisar e enviar.");
    } catch (err) {
      console.error(err);
      // Se a API falhar, tentar mailto
      try {
        const href = buildMailto();
        if (hiddenMailtoRef.current) {
          hiddenMailtoRef.current.href = href;
          hiddenMailtoRef.current.click();
        } else {
          window.location.href = href;
        }
        setOkMsg("Não foi possível enviar pela API. Abrimos seu e-mail para você concluir o envio.");
      } catch (err2) {
        console.error(err2);
        setErrors((prev) => ({
          ...prev,
          submit: "Não foi possível enviar a mensagem agora. Tente novamente mais tarde.",
        }));
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="contato-section">
      {/* âncora oculta para disparar mailto programaticamente */}
      <a ref={hiddenMailtoRef} href="/" style={{ display: "none" }} aria-hidden />

      <div className="contato-content">
        <div className="contato-mapa">
          <iframe
            title="Localização Tecnoagil"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3856.471458646599!2d-40.848725725898404!3d-14.854892900522023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7463baf0abe935b%3A0x428db85491f6b03c!2sTecnoagil!5e0!3m2!1spt-BR!2sbr!4v1753207320889!5m2!1spt-BR!2sbr"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <form className="contato-form" onSubmit={onSubmit} noValidate>
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
            {errors.nome && (
              <small id="err-nome" className="erro-campo">
                {errors.nome}
              </small>
            )}
          </label>

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
            {errors.email && (
              <small id="err-email" className="erro-campo">
                {errors.email}
              </small>
            )}
          </label>

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
            {errors.mensagem && (
              <small id="err-msg" className="erro-campo">
                {errors.mensagem}
              </small>
            )}
          </label>

          {errors.submit && (
            <div className="erro-global" role="alert">
              {errors.submit}
            </div>
          )}
          {okMsg && (
            <div className="ok-global" role="status" aria-live="polite">
              {okMsg}
            </div>
          )}

          <button
            type="submit"
            className="botao-enviar"
            disabled={enviando}
            style={{ marginTop: 20 }}
          >
            {enviando ? "Enviando..." : "Enviar"}
          </button>

          {/* Opções alternativas de envio via webmail (não substituem o botão principal) */}
          <div className="envio-alternativo" style={{ marginTop: 12, fontSize: ".92rem", opacity: 0.85 }}>
            Prefere webmail? &nbsp;
            <a href={buildGmailLink()} target="_blank" rel="noreferrer">Abrir no Gmail</a>
            &nbsp;|&nbsp;
            <a href={buildOutlookWebLink()} target="_blank" rel="noreferrer">Abrir no Outlook Web</a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContatoSection;

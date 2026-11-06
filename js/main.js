/**
 * ============================================================
 *  MAIN.JS
 *  Lê SITE_CONFIG (definido em config.js) e preenche o HTML:
 *  hero, contador, linha do tempo, galeria, cartões, carta,
 *  seção final e surpresa. Também trata fotos ausentes.
 * ============================================================
 */

(function () {
  "use strict";

  /* ---------------- Helpers ---------------- */

  // Evita que o site quebre se um campo do config estiver vazio/ausente
  function safeText(value, fallback) {
    if (typeof value !== "string") return fallback || "";
    const trimmed = value.trim();
    if (trimmed === "" || trimmed.toUpperCase().startsWith("INSIRA")) {
      return fallback !== undefined ? fallback : "";
    }
    return trimmed;
  }

  function isPlaceholderDate(value) {
    if (!value || typeof value !== "string") return true;
    return value.toUpperCase().includes("INSIRA") || isNaN(new Date(value).getTime());
  }

  function formatDateLong(value) {
    if (isPlaceholderDate(value)) return "";
    const date = new Date(value);
    return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  }

  // Cria uma <img> funcional, ou um espaço reservado elegante se a imagem
  // estiver vazia / não configurada. A troca para placeholder em caso de
  // ERRO de carregamento (arquivo inexistente) também é tratada aqui.
  function buildImage(path, altText, extraClass, placeholderLabel) {
    const label = placeholderLabel || "fotografia";
    if (!path || path.trim() === "") {
      const div = document.createElement("div");
      div.className = "img-placeholder" + (extraClass ? " " + extraClass : "");
      div.textContent = "espaço para " + label;
      return div;
    }
    const img = document.createElement("img");
    img.src = path;
    img.alt = altText || "";
    if (extraClass) img.className = extraClass;
    img.loading = "lazy";
    img.addEventListener("error", function onError() {
      img.removeEventListener("error", onError);
      const div = document.createElement("div");
      div.className = "img-placeholder" + (extraClass ? " " + extraClass : "");
      div.textContent = "espaço para " + label;
      img.replaceWith(div);
    });
    return img;
  }

  function replaceWithImage(targetEl, path, altText, placeholderLabel) {
    const built = buildImage(path, altText, targetEl.className, placeholderLabel);
    built.id = targetEl.id;
    targetEl.replaceWith(built);
    return built;
  }

  /* ---------------- Config com fallback seguro ---------------- */
  const cfg = (typeof SITE_CONFIG !== "undefined") ? SITE_CONFIG : {};
  const casal = cfg.casal || {};
  const datas = cfg.datas || {};
  const hero = cfg.hero || {};
  const contadorCfg = cfg.contador || {};
  const timelineCfg = Array.isArray(cfg.timeline) ? cfg.timeline : [];
  const galeriaCfg = Array.isArray(cfg.galeria) ? cfg.galeria : [];
  const cartoesCfg = Array.isArray(cfg.cartoes) ? cfg.cartoes : [];
  const cartaCfg = cfg.carta || {};
  const finalCfg = cfg.proximoCapitulo || {};
  const surpresaCfg = cfg.surpresa || {};

  /* ---------------- Título da página e marca ---------------- */
  document.title = safeText(casal.titulo, "Nosso primeiro capítulo");
  const navBrand = document.getElementById("navBrand");
  if (navBrand) {
    const n = safeText(casal.namorado, "").charAt(0);
    const d = safeText(casal.namorada, "").charAt(0);
    navBrand.textContent = (n && d) ? (n + "&" + d) : "N&C";
  }

  /* ---------------- HERO ---------------- */
  const heroTitleEl = document.getElementById("heroTitle");
  const heroSubtitleEl = document.getElementById("heroSubtitle");
  const heroDateEl = document.getElementById("heroDate");
  const heroButtonEl = document.getElementById("heroButton");
  const heroImageEl = document.getElementById("heroImage");

  if (heroTitleEl) heroTitleEl.textContent = safeText(hero.titulo, "Nosso primeiro capítulo");
  if (heroSubtitleEl) heroSubtitleEl.textContent = safeText(hero.subtitulo, "Uma história que está apenas começando.");
  if (heroDateEl) heroDateEl.textContent = formatDateLong(datas.inicioRelacionamento) || safeText(casal.titulo, "");
  if (heroButtonEl) heroButtonEl.textContent = safeText(hero.textoBotao, "Conheça nossa história");
  if (heroImageEl) replaceWithImage(heroImageEl, safeText(hero.imagem, ""), "Fotografia principal do casal", "a fotografia principal");

  /* ---------------- CONTADOR (frase — números ficam em interactions.js) ---------------- */
  const counterPhraseEl = document.getElementById("counterPhrase");
  if (counterPhraseEl) counterPhraseEl.textContent = safeText(contadorCfg.frase, "Cada segundo com você vale a pena contar.");

  /* ---------------- LINHA DO TEMPO ---------------- */
  const timelineEl = document.getElementById("timeline");
  if (timelineEl) {
    const validItems = timelineCfg.filter(function (item) { return item && !isPlaceholderDate(item.data); });
    const sorted = validItems.sort(function (a, b) { return new Date(a.data) - new Date(b.data); });
    const itemsToRender = sorted.length ? sorted : timelineCfg; // mostra mesmo com placeholders, para o autor visualizar

    itemsToRender.forEach(function (item, index) {
      const article = document.createElement("article");
      article.className = "timeline-item";
      article.setAttribute("data-animate", "");
      article.setAttribute("data-animate-delay", String((index % 4) + 1));

      const dot = document.createElement("span");
      dot.className = "timeline-item__dot";
      article.appendChild(dot);

      const card = document.createElement("div");
      card.className = "timeline-item__card";

      const dateEl = document.createElement("span");
      dateEl.className = "timeline-item__date";
      dateEl.textContent = formatDateLong(item.data) || "data a definir";
      card.appendChild(dateEl);

      const titleEl = document.createElement("h4");
      titleEl.className = "timeline-item__title";
      titleEl.textContent = safeText(item.titulo, "Um momento nosso");
      card.appendChild(titleEl);

      const descEl = document.createElement("p");
      descEl.className = "timeline-item__desc";
      descEl.textContent = safeText(item.descricao, "");
      card.appendChild(descEl);

      const frame = document.createElement("div");
      frame.className = "timeline-item__frame";
      const img = buildImage(item.imagem, item.titulo, "", "esse momento");
      frame.appendChild(img);
      card.appendChild(frame);

      article.appendChild(card);
      timelineEl.appendChild(article);
    });

    if (!itemsToRender.length) {
      timelineEl.innerHTML = "<p style='text-align:center;color:var(--color-text-soft)'>Adicione momentos em <code>js/config.js</code> para preencher sua linha do tempo.</p>";
    }
  }

  /* ---------------- GALERIA ---------------- */
  const galleryEl = document.getElementById("gallery");
  window.__galleryData = []; // usado pelo lightbox em interactions.js

  if (galleryEl) {
    galeriaCfg.forEach(function (item, index) {
      if (!item) return;
      const figure = document.createElement("figure");
      figure.className = "gallery-item";
      figure.setAttribute("data-animate", "");
      figure.setAttribute("data-gallery-index", String(index));

      const img = buildImage(item.imagem, item.legenda, "", "essa fotografia");
      figure.appendChild(img);

      const caption = document.createElement("figcaption");
      caption.className = "gallery-item__caption";
      caption.textContent = safeText(item.legenda, "");
      figure.appendChild(caption);

      galleryEl.appendChild(figure);

      window.__galleryData.push({
        imagem: safeText(item.imagem, ""),
        legenda: safeText(item.legenda, "")
      });
    });

    if (!galeriaCfg.length) {
      galleryEl.innerHTML = "<p style='text-align:center;color:var(--color-text-soft)'>Adicione fotografias em <code>js/config.js</code> para preencher a galeria.</p>";
    }
  }

  /* ---------------- CARTÕES ---------------- */
  const cardsEl = document.getElementById("cards");
  if (cardsEl) {
    cartoesCfg.forEach(function (item, index) {
      if (!item) return;
      const card = document.createElement("div");
      card.className = "card";
      card.setAttribute("data-animate", "");
      card.setAttribute("data-animate-delay", String((index % 4) + 1));

      const inner = document.createElement("div");
      inner.className = "card__inner";

      const front = document.createElement("button");
      front.className = "card__face card__front";
      front.type = "button";
      front.textContent = safeText(item.titulo, "Um detalhe especial");
      front.setAttribute("aria-expanded", "false");

      const back = document.createElement("div");
      back.className = "card__face card__back";
      back.textContent = safeText(item.mensagem, "Escreva aqui sua mensagem no config.js.");

      front.addEventListener("click", function () {
        const flipped = card.classList.toggle("is-flipped");
        front.setAttribute("aria-expanded", String(flipped));
      });

      inner.appendChild(front);
      inner.appendChild(back);
      card.appendChild(inner);
      cardsEl.appendChild(card);
    });
  }

  /* ---------------- CARTA ---------------- */
  const envelopeTitleEl = document.getElementById("envelopeTitle");
  const letterSalutationEl = document.getElementById("letterSalutation");
  const letterBodyEl = document.getElementById("letterBody");
  const letterSignatureEl = document.getElementById("letterSignature");

  if (envelopeTitleEl) envelopeTitleEl.textContent = safeText(cartaCfg.titulo, "Uma carta para você");
  if (letterSalutationEl) letterSalutationEl.textContent = safeText(cartaCfg.saudacao, "");
  if (letterBodyEl) {
    const paragrafos = Array.isArray(cartaCfg.paragrafos) && cartaCfg.paragrafos.length
      ? cartaCfg.paragrafos
      : ["Escreva aqui o conteúdo da sua carta, editando js/config.js."];
    paragrafos.forEach(function (texto) {
      const p = document.createElement("p");
      p.textContent = safeText(texto, "");
      letterBodyEl.appendChild(p);
    });
  }
  if (letterSignatureEl) letterSignatureEl.textContent = safeText(cartaCfg.assinatura, "");

  /* ---------------- FINALE ---------------- */
  const finalePhraseEl = document.getElementById("finalePhrase");
  const finaleDateEl = document.getElementById("finaleDate");
  const finaleButtonEl = document.getElementById("finaleButton");
  const finaleImageEl = document.getElementById("finaleImage");

  if (finalePhraseEl) finalePhraseEl.textContent = safeText(finalCfg.frase, "Isso é só o começo da nossa história.");
  if (finaleDateEl) finaleDateEl.textContent = formatDateLong(datas.inicioRelacionamento);
  if (finaleButtonEl) finaleButtonEl.textContent = safeText(finalCfg.textoBotao, "Voltar ao início");
  if (finaleImageEl) replaceWithImage(finaleImageEl, safeText(finalCfg.imagem, ""), "Fotografia especial do casal", "a fotografia final");

  /* ---------------- SURPRESA ---------------- */
  const surpriseSection = document.getElementById("surpriseSection");
  const surpriseTrigger = document.getElementById("surpriseTrigger");
  const surpriseMessage = document.getElementById("surpriseMessage");

  if (surpresaCfg.ativa !== false && surpriseSection) {
    surpriseSection.hidden = false;
    if (surpriseTrigger) surpriseTrigger.textContent = safeText(surpresaCfg.textoBotao, "psiu, clique aqui");
    if (surpriseMessage) surpriseMessage.textContent = safeText(surpresaCfg.mensagem, "");

    if (surpriseTrigger && surpriseMessage) {
      surpriseTrigger.addEventListener("click", function () {
        const willShow = surpriseMessage.hidden;
        surpriseMessage.hidden = !willShow;
        surpriseTrigger.style.display = willShow ? "none" : "";
      });
    }
  }

  /* Expõe helpers para os demais scripts (interactions.js, music.js) */
  window.SiteHelpers = {
    safeText: safeText,
    isPlaceholderDate: isPlaceholderDate,
    formatDateLong: formatDateLong
  };
})();

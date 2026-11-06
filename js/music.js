/**
 * ============================================================
 *  MUSIC.JS
 *  Player de música: play/pause, progresso, volume,
 *  próxima/anterior faixa e lista de reprodução.
 *  Não inicia áudio automaticamente (exige interação do usuário).
 * ============================================================
 */

(function () {
  "use strict";

  const cfg = (typeof SITE_CONFIG !== "undefined") ? SITE_CONFIG : {};
  const playlist = Array.isArray(cfg.playlist) ? cfg.playlist.filter(function (t) {
    return t && t.arquivo && t.arquivo.trim() !== "";
  }) : [];

  const playerEmpty = document.getElementById("playerEmpty");
  const playerMain = document.getElementById("playerMain");
  const playerListEl = document.getElementById("playerList");
  const audio = document.getElementById("audioElement");

  if (!audio) return;

  if (!playlist.length) {
    if (playerEmpty) playerEmpty.hidden = false;
    if (playerMain) playerMain.hidden = true;
    return;
  }

  if (playerMain) playerMain.hidden = false;
  if (playerEmpty) playerEmpty.hidden = true;

  const songEl = document.getElementById("playerSong");
  const artistEl = document.getElementById("playerArtist");
  const coverImg = document.getElementById("playerCoverImage");
  const coverFallback = document.getElementById("playerCoverFallback");
  const playBtn = document.getElementById("playerPlay");
  const prevBtn = document.getElementById("playerPrev");
  const nextBtn = document.getElementById("playerNext");
  const progress = document.getElementById("playerProgress");
  const currentTimeEl = document.getElementById("playerCurrentTime");
  const durationEl = document.getElementById("playerDuration");
  const volumeInput = document.getElementById("playerVolume");

  let currentIndex = 0;
  let isSeeking = false;

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ":" + String(s).padStart(2, "0");
  }

  function renderList() {
    if (!playerListEl) return;
    playerListEl.innerHTML = "";
    playlist.forEach(function (track, index) {
      const li = document.createElement("li");
      li.setAttribute("data-index", String(index));
      if (index === currentIndex) li.classList.add("is-active");

      const titleSpan = document.createElement("span");
      titleSpan.textContent = track.titulo || "Faixa " + (index + 1);

      const artistSpan = document.createElement("span");
      artistSpan.className = "track-artist";
      artistSpan.textContent = track.artista || "";

      li.appendChild(titleSpan);
      li.appendChild(artistSpan);

      li.addEventListener("click", function () {
        loadTrack(index, true);
      });

      playerListEl.appendChild(li);
    });
  }

  function loadTrack(index, autoplay) {
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    currentIndex = index;

    const track = playlist[currentIndex];
    audio.src = track.arquivo;

    if (songEl) songEl.textContent = track.titulo || "Faixa " + (currentIndex + 1);
    if (artistEl) artistEl.textContent = track.artista || "";

    if (track.capa && track.capa.trim() !== "") {
      if (coverImg) {
        coverImg.src = track.capa;
        coverImg.hidden = false;
        coverImg.onerror = function () {
          coverImg.hidden = true;
          if (coverFallback) coverFallback.hidden = false;
        };
      }
      if (coverFallback) coverFallback.hidden = true;
    } else {
      if (coverImg) coverImg.hidden = true;
      if (coverFallback) {
        coverFallback.hidden = false;
        coverFallback.textContent = (track.titulo || "♪").charAt(0).toUpperCase();
      }
    }

    // Atualiza destaque na lista
    if (playerListEl) {
      Array.prototype.forEach.call(playerListEl.children, function (li, i) {
        li.classList.toggle("is-active", i === currentIndex);
      });
    }

    if (progress) progress.value = 0;
    if (currentTimeEl) currentTimeEl.textContent = "0:00";

    if (autoplay) {
      audio.play().catch(function () { /* interação pode ser necessária */ });
    }
  }

  function setPlayIcon(isPlaying) {
    if (!playBtn) return;
    playBtn.innerHTML = isPlaying
      ? '<i data-lucide="pause"></i>'
      : '<i data-lucide="play"></i>';
    if (window.lucide) window.lucide.createIcons();
    playBtn.setAttribute("aria-label", isPlaying ? "Pausar" : "Tocar");
  }

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (audio.paused) {
        audio.play().catch(function () {});
      } else {
        audio.pause();
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener("click", function () { loadTrack(currentIndex - 1, true); });
  if (nextBtn) nextBtn.addEventListener("click", function () { loadTrack(currentIndex + 1, true); });

  audio.addEventListener("play", function () { setPlayIcon(true); });
  audio.addEventListener("pause", function () { setPlayIcon(false); });
  audio.addEventListener("ended", function () { loadTrack(currentIndex + 1, true); });

  audio.addEventListener("loadedmetadata", function () {
    if (durationEl) durationEl.textContent = formatTime(audio.duration);
    if (progress) progress.max = String(audio.duration || 0);
  });

  audio.addEventListener("timeupdate", function () {
    if (isSeeking) return;
    if (currentTimeEl) currentTimeEl.textContent = formatTime(audio.currentTime);
    if (progress) progress.value = String(audio.currentTime);
  });

  if (progress) {
    progress.addEventListener("input", function () {
      isSeeking = true;
      if (currentTimeEl) currentTimeEl.textContent = formatTime(Number(progress.value));
    });
    progress.addEventListener("change", function () {
      audio.currentTime = Number(progress.value);
      isSeeking = false;
    });
  }

  if (volumeInput) {
    audio.volume = Number(volumeInput.value);
    volumeInput.addEventListener("input", function () {
      audio.volume = Number(volumeInput.value);
    });
  }

  renderList();
  loadTrack(0, false);
})();

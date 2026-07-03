document.addEventListener('DOMContentLoaded', () => {
  // Slide elements
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.getElementById('dots-container');
  const slideCounter = document.getElementById('slide-number');
  const prevBtn = document.getElementById('prev-slide-btn');
  const nextBtn = document.getElementById('next-slide-btn');
  
  // Side Index elements
  const openIndexBtn = document.getElementById('open-index-btn');
  const closeIndexBtn = document.getElementById('close-index-btn');
  const sideIndex = document.getElementById('side-index');
  const indexItems = document.querySelectorAll('.index-item');

  // View Mode toggling
  const toggleViewBtn = document.getElementById('toggle-view-btn');
  
  let currentSlide = 1;
  const totalSlides = slides.length;

  // Initialize Navigation Dots
  for (let i = 1; i <= totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    if (i === 1) dot.classList.add('active');
    dot.setAttribute('data-target', i);
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }
  const dots = document.querySelectorAll('.nav-dot');

  // Function to show/update slide
  function goToSlide(slideIndex) {
    if (slideIndex < 1 || slideIndex > totalSlides) return;
    
    // Close index drawer if open
    sideIndex.classList.remove('open');
    
    // Toggle light-theme class on body
    if (slideIndex === 1) {
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
    }
    
    // Deactivate previous active slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Activate target slide
    const targetSlide = document.getElementById(`slide-${slideIndex}`);
    if (targetSlide) {
      targetSlide.classList.add('active');
    }
    
    // Update dots
    dots.forEach((dot, idx) => {
      if (idx + 1 === slideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Update Side Index list active state
    indexItems.forEach(item => {
      if (parseInt(item.getAttribute('data-target')) === slideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    currentSlide = slideIndex;
    
    // Update slide number text
    slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    
    // Disable/Enable control buttons
    prevBtn.disabled = currentSlide === 1;
    nextBtn.disabled = currentSlide === totalSlides;
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Prevent keyboard navigation if index is open
    if (sideIndex.classList.contains('open')) {
      if (e.key === 'Escape') {
        sideIndex.classList.remove('open');
      }
      return;
    }

    if (document.body.classList.contains('continuous-mode')) return;

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'Enter') {
      e.preventDefault();
      if (currentSlide < totalSlides) {
        goToSlide(currentSlide + 1);
      }
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'Backspace') {
      e.preventDefault();
      if (currentSlide > 1) {
        goToSlide(currentSlide - 1);
      }
    }
  });

  // Buttons navigation
  prevBtn.addEventListener('click', () => {
    if (currentSlide > 1) goToSlide(currentSlide - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
  });

  // Open/Close Side Index Drawer
  openIndexBtn.addEventListener('click', () => {
    sideIndex.classList.add('open');
  });

  closeIndexBtn.addEventListener('click', () => {
    sideIndex.classList.remove('open');
  });

  // Click on Index Drawer items
  indexItems.forEach(item => {
    item.addEventListener('click', () => {
      const target = parseInt(item.getAttribute('data-target'));
      goToSlide(target);
    });
  });

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (!sideIndex.contains(e.target) && e.target !== openIndexBtn && !openIndexBtn.contains(e.target)) {
      sideIndex.classList.remove('open');
    }
  });

  // Toggle between slideshow and continuous view modes
  toggleViewBtn.addEventListener('click', () => {
    const isContinuous = document.body.classList.contains('continuous-mode');
    if (isContinuous) {
      document.body.classList.remove('continuous-mode');
      toggleViewBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
        Vista Continua / Imprimir
      `;
      goToSlide(currentSlide);
    } else {
      document.body.classList.add('continuous-mode');
      toggleViewBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="9" y1="3" x2="9" y2="21"/></svg>
        Modo Diapositivas
      `;
    }
  });

  // Swipe support for touch screens
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (e) => {
    if (document.body.classList.contains('continuous-mode')) return;
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    if (document.body.classList.contains('continuous-mode')) return;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) {
      // Swiped left -> next slide
      if (currentSlide < totalSlides) goToSlide(currentSlide + 1);
    } else if (touchEndX - touchStartX > threshold) {
      // Swiped right -> prev slide
      if (currentSlide > 1) goToSlide(currentSlide - 1);
    }
  }

  // --- INTERACTIVE TIMELINE (SLIDE 6) ---
  const timelineData = {
    1: {
      title: "Redacción de Protocolo y Aprobación Ética",
      duration: "Plazo: 1 mes de redacción + 1-2 meses de evaluación del CEI",
      desc: "Fase inicial centrada en la preparación del protocolo de investigación detallado para el Comité de Ética en Investigación (CEI) de la UCASAL, asegurando que todos los mecanismos de protección de datos de menores y la captación de videos de internet estén legalmente respaldados.",
      docs: [
        "Protocolo de Investigación CEI",
        "Glosario clínico estructurado",
        "Protocolo de incidentes de seguridad"
      ],
      pct: "25%",
      status: "Próximo paso crítico"
    },
    2: {
      title: "Reclutamiento de Expertos y Setup Técnico",
      duration: "Plazo: 2-4 semanas de reclutamiento + 1-2 semanas de setup",
      desc: "Instalación y configuración de Label Studio self-hosted en infraestructura institucional. Automatización de búsqueda y descargas con Apify. Selección de los 3 neuropediatras clínicos externos y el revisor de inclusión de medicina.",
      docs: [
        "Compromiso de Confidencialidad",
        "Pipeline Apify + script ffprobe",
        "Plataforma Label Studio activa"
      ],
      pct: "45%",
      status: "Preparativos operativos"
    },
    3: {
      title: "Capacitación e Hito Piloto Exploratorio",
      duration: "Plazo: 1 semana capacitación/calibración + 1-2 semanas piloto",
      desc: "Sesión de inducción (2h) sobre la plataforma y manual de anotación. Calibración grupal sobre 15 videos y ejecución del piloto con 30-50 videos para evaluar concordancia Kappa de Cohen y ajustar queries o criterios de inclusión.",
      docs: [
        "Manual de Anotación v1 (pre-piloto)",
        "Video tutorial Label Studio",
        "Reporte de hallazgos del piloto"
      ],
      pct: "65%",
      status: "Calibración grupal"
    },
    4: {
      title: "Anotación Masiva y Monitoreo de Calidad",
      duration: "Plazo: Variable (según tamaño objetivo del post-piloto)",
      desc: "Cálculo formal de tamaño muestral vía Epitools con datos del piloto. Anotación clínica masiva de videos asignados aleatoriamente por pares rotatorios de neuropediatras. Auditorías de Kappa de Cohen por lote y corte por saturación AUC (<2% mejora).",
      docs: [
        "Manual de Anotación v2 (con videos)",
        "Auditorías Kappa (lotes)",
        "Registro vivo de sesgos"
      ],
      pct: "85%",
      status: "Etiquetado en curso"
    },
    5: {
      title: "Cierre, Consolidación y Publicación en Zenodo",
      duration: "Plazo: 1 mes de cierre + 1 semana publicación",
      desc: "Verificación manual del 100% del blur de rostros y zona genital, remoción de metadatos EXIF de los videos. Exportación final a JSON/CSV y publicación del código abierto en Apache 2.0 y el dataset en Zenodo con DOI (Nivel 3 público / Nivel 2 DUA).",
      docs: [
        "README + Datasheet for Datasets v1.0",
        "Acuerdo de Uso de Datos (DUA) final",
        "DOI del dataset en Zenodo"
      ],
      pct: "100%",
      status: "Disponibilización FAIR"
    }
  };

  const timelineTabs = document.getElementById('timeline-tabs');
  const timelineTitle = document.getElementById('timeline-title');
  const timelineDuration = document.getElementById('timeline-duration');
  const timelineDesc = document.getElementById('timeline-desc');
  const timelineDocs = document.getElementById('timeline-docs');
  const timelinePct = document.getElementById('timeline-pct');
  const timelineStatus = document.getElementById('timeline-status');

  if (timelineTabs) {
    timelineTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.timeline-tab');
      if (!tab) return;

      // Update active tab styling
      timelineTabs.querySelectorAll('.timeline-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const step = tab.getAttribute('data-step');
      const data = timelineData[step];

      if (data) {
        // Fade content out and in for smooth transition
        const contentBox = document.getElementById('timeline-content-box');
        contentBox.style.opacity = '0.3';
        contentBox.style.transform = 'translateY(5px)';
        
        setTimeout(() => {
          timelineTitle.textContent = data.title;
          
          timelineDuration.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${data.duration}
          `;
          
          timelineDesc.textContent = data.desc;
          
          // Populate deliverables list
          timelineDocs.innerHTML = '';
          data.docs.forEach(doc => {
            const li = document.createElement('li');
            li.textContent = doc;
            timelineDocs.appendChild(li);
          });
          
          timelinePct.textContent = data.pct;
          timelineStatus.textContent = data.status;
          
          // Update progress circle glow dynamically depending on progress
          const progressCircle = contentBox.querySelector('.timeline-progress-circle');
          if (step == 5) {
            progressCircle.style.borderColor = 'var(--accent-emerald)';
            progressCircle.style.boxShadow = '0 0 30px var(--accent-emerald-glow)';
          } else {
            progressCircle.style.borderColor = 'var(--accent-cyan)';
            progressCircle.style.boxShadow = '0 0 30px var(--accent-cyan-glow)';
          }

          contentBox.style.opacity = '1';
          contentBox.style.transform = 'translateY(0)';
        }, 150);
      }
    });
  }

});

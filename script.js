const currentYear = document.getElementById('current-year');

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const revealElements = document.querySelectorAll(
  '.page-intro, .hero-copy, .portrait, .content-section, .info-card, .project-card, .factor-row, .roadmap-step, .reflection-prompt, .action-card'
);

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -32px 0px'
  });

  revealElements.forEach((element, index) => {
    element.dataset.reveal = '';
    if (element.matches('.info-card, .project-card, .factor-row, .roadmap-step, .reflection-prompt, .action-card')) {
      element.style.transitionDelay = `${(index % 4) * 70}ms`;
    }
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add('is-visible'));
}

document.querySelectorAll('[data-evidence-image]').forEach((figure) => {
  const image = figure.querySelector('img');
  const caption = figure.querySelector('figcaption');
  const hint = figure.querySelector('.evidence-image-hint');

  function showEvidenceImage() {
    image.hidden = false;
    if (caption) caption.hidden = false;
    if (hint) hint.hidden = true;
  }

  function showEvidenceHint() {
    image.hidden = true;
    if (caption) caption.hidden = true;
    if (hint) hint.hidden = false;
  }

  image.addEventListener('load', showEvidenceImage);
  image.addEventListener('error', showEvidenceHint);

  if (image.complete) {
    image.naturalWidth > 0 ? showEvidenceImage() : showEvidenceHint();
  }
});

// make a simple image viewer for images with the data-image-viewer attribute

const imageViewer = document.querySelector('.image-viewer');

if (imageViewer instanceof HTMLDialogElement) {
  const closeButton = imageViewer.querySelector('.image-viewer-close');
  const viewerImage = imageViewer.querySelector('img');

  document.querySelectorAll('[data-image-viewer]').forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const sourceImage = link.querySelector('img');
      if (!(sourceImage instanceof HTMLImageElement)) return;

      viewerImage.src = sourceImage.currentSrc || sourceImage.src;
      viewerImage.alt = sourceImage.alt;
      imageViewer.setAttribute('aria-label', `Full-size ${sourceImage.alt}`);
      imageViewer.showModal();
    });
  });

  closeButton.addEventListener('click', () => imageViewer.close());
  imageViewer.addEventListener('click', (event) => {
    if (event.target === imageViewer) imageViewer.close();
  });
}
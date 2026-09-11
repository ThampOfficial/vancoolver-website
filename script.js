document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-toggle button');
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      document.documentElement.classList.toggle('lang-en', lang === 'en');
      document.documentElement.setAttribute('lang', lang);
      langButtons.forEach(b => b.classList.toggle('active', b === btn));
    });
  });
});

/* Builds a mailto: link from a form's fields and opens it.
   fields = [[labelTh, labelEn, elementId], ...] */
function sendAsEmail(formEl, confirmEl, subjectTh, subjectEn, fields) {
  formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const isEn = document.documentElement.classList.contains('lang-en');
    const val = id => (document.getElementById(id) && document.getElementById(id).value) || '-';
    const subject = isEn ? subjectEn : subjectTh;
    const bodyLines = fields.map(([labelTh, labelEn, id]) => `${isEn ? labelEn : labelTh}: ${val(id)}`);
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:hello@vancoolver.ca?subject=${encodeURIComponent(subject)}&body=${body}`;
    if (confirmEl) confirmEl.classList.add('show');
  });
}

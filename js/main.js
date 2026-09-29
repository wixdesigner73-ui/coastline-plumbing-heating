// Set to a form-handling endpoint (e.g. Formspree/Netlify/your server) to enable online submissions.
const FORM_ENDPOINT = '';

const burger = document.querySelector('.burger');
const nav = document.querySelector('nav.main');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

// Photo slots: hide the <img> if the file is missing so the styled placeholder shows.
document.querySelectorAll('.ph img').forEach(img => {
  img.addEventListener('error', () => img.remove());
});

const form = document.querySelector('form.contact');
if (form) {
  const msg = form.querySelector('.form-msg');
  const show = (t) => { msg.textContent = t; msg.classList.add('show'); };
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!FORM_ENDPOINT) {
      show('Online submissions are not enabled yet. Please call (718) 569-2204.');
      return;
    }
    try {
      const r = await fetch(FORM_ENDPOINT, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!r.ok) throw new Error();
      form.reset();
      show('Thank you. Your request has been sent.');
    } catch {
      show('Something went wrong. Please call (718) 569-2204.');
    }
  });
}

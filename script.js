const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#nav');

document.querySelectorAll('.phone-pill').forEach(phoneLink => {
  phoneLink.href = 'tel:07708846424';
  phoneLink.innerHTML = '<span>☎</span>07708 846 424';
});

document.querySelectorAll('a[href^="mailto:hello@thephysiofocus.co.uk"]').forEach(emailLink => {
  emailLink.href = emailLink.href.replace('hello@thephysiofocus.co.uk', 'hello.thephysiofocus@gmail.com');
  emailLink.innerHTML = emailLink.innerHTML.replaceAll('hello@thephysiofocus.co.uk', 'hello.thephysiofocus@gmail.com');
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

const contactForm = document.querySelector('#contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const firstName = formData.get('firstName').trim();
    const lastName = formData.get('lastName').trim();
    const email = formData.get('email').trim();
    const phone = (formData.get('phone') || '').trim() || 'Not provided';
    const enquiryType = formData.get('enquiryType') || 'Website enquiry';
    const message = formData.get('message').trim();
    const subject = `Website enquiry: ${enquiryType} — ${firstName} ${lastName}`;
    const body = [
      `Name: ${firstName} ${lastName}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Enquiry type: ${enquiryType}`,
      '',
      'Message:',
      message
    ].join('\n');

    const mailtoUrl = `mailto:hello.thephysiofocus@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    document.querySelector('#form-status').textContent = 'Your email app is opening with your enquiry ready to send.';
    window.location.href = mailtoUrl;
  });
}

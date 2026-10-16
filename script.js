const menuToggle = document.querySelector('.menu-toggle');
const primaryNav = document.querySelector('.primary-nav');

if (menuToggle && primaryNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    primaryNav.classList.toggle('is-open', !isOpen);
  });

  primaryNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      primaryNav.classList.remove('is-open');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation');
      primaryNav.classList.remove('is-open');
      menuToggle.focus();
    }
  });
}

const yearElement = document.querySelector('#year');
if (yearElement) yearElement.textContent = new Date().getFullYear();

const reviewCarousel = document.querySelector('.review-carousel');
if (reviewCarousel) {
  const reviews = [
    {
      quote: 'Cleanest cuts in the city!',
      barber: 'Barber Tate',
      client: 'Gaetano',
      url: 'https://booksy.com/en-us/428036_barber-tate_barber-shop_14795_tucson',
    },
    {
      quote: 'Always knows what I’m looking for.',
      barber: 'Barber Tate',
      client: 'Christian',
      url: 'https://booksy.com/en-us/428036_barber-tate_barber-shop_14795_tucson',
    },
    {
      quote: 'Great haircut',
      barber: 'Ruben Barber',
      client: 'Emmanuel',
      url: 'https://booksy.com/en-us/431039_ruben-barber_barber-shop_14795_tucson',
    },
    {
      quote: 'Excellent work. ALWAYS!!!',
      barber: 'Ruben Barber',
      client: 'David',
      url: 'https://booksy.com/en-us/431039_ruben-barber_barber-shop_14795_tucson',
    },
    {
      quote: 'Randy always does a great haircut!',
      barber: 'Savage the Barber',
      client: 'Mike',
      url: 'https://booksy.com/en-us/425293_savage-the-barber_barber-shop_14795_tucson',
    },
    {
      quote: 'Best cut in Tucson!',
      barber: 'Savage the Barber',
      client: 'Zac',
      url: 'https://booksy.com/en-us/425293_savage-the-barber_barber-shop_14795_tucson',
    },
    {
      quote: '10/10 cut',
      barber: 'Manny D Barber',
      client: 'Max',
      url: 'https://booksy.com/en-us/1313228_manny-d-barber_barber-shop_14795_tucson',
    },
    {
      quote: 'Very great cut, got exactly what I wanted, definitely will be going with Manny again. 🔥',
      barber: 'Manny D Barber',
      client: 'Price',
      url: 'https://booksy.com/en-us/1313228_manny-d-barber_barber-shop_14795_tucson',
    },
    {
      quote: 'Brandee is awesome! She does the best on my hair! I absolutely recommend!',
      barber: 'Barber-bee',
      client: 'Sean',
      url: 'https://booksy.com/en-us/709382_barber-bee_barber-shop_14795_tucson',
    },
    {
      quote: 'Always amazing',
      barber: 'Barber-bee',
      client: 'Travis',
      url: 'https://booksy.com/en-us/709382_barber-bee_barber-shop_14795_tucson',
    },
    {
      quote: 'He did phenomenal will be back!! 5 stars!!',
      barber: 'Wahldo',
      client: 'Amy',
      url: 'https://booksy.com/en-us/498070_wahldo_barber-shop_14795_tucson',
    },
    {
      quote: 'Great haircut every time, been a regular for about a year 🤙',
      barber: 'Wahldo',
      client: 'Austin',
      url: 'https://booksy.com/en-us/498070_wahldo_barber-shop_14795_tucson',
    },
    {
      quote: 'Tiana is Great. Friendly, personable, and does a fantastic job every time.',
      barber: 'Barber Tiana',
      client: 'Brett',
      url: 'https://booksy.com/en-us/1294394_barber-tiana_barber-shop_14795_tucson',
    },
    {
      quote: 'Very kind, did the haircut I asked for to perfection, 10/10 stylist!! 😁',
      barber: 'Barber Tiana',
      client: 'Gabriel',
      url: 'https://booksy.com/en-us/1294394_barber-tiana_barber-shop_14795_tucson',
    },
    {
      quote: 'Always a good cut!',
      barber: 'Chuy The Barber',
      client: 'Keith',
      url: 'https://booksy.com/en-us/621551_chuy-the-barber_barber-shop_14795_tucson',
    },
    {
      quote: 'Best Barber in the city!!!',
      barber: 'Chuy The Barber',
      client: 'Mike',
      url: 'https://booksy.com/en-us/621551_chuy-the-barber_barber-shop_14795_tucson',
    },
  ];
  const quoteElement = reviewCarousel.querySelector('#review-quote');
  const attributionElement = reviewCarousel.querySelector('#review-attribution');
  const countElement = reviewCarousel.querySelector('#review-count');
  const previousButton = reviewCarousel.querySelector('[data-review-previous]');
  const nextButton = reviewCarousel.querySelector('[data-review-next]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeReview = 0;
  let rotationTimer;

  const showReview = (index) => {
    activeReview = (index + reviews.length) % reviews.length;
    const review = reviews[activeReview];
    quoteElement.textContent = `“${review.quote}”`;
    attributionElement.textContent = `BOOKSY CLIENT ${review.client.toUpperCase()} · ${review.barber.toUpperCase()}`;
    attributionElement.href = review.url;
    attributionElement.setAttribute(
      'aria-label',
      `Read ${review.barber}’s full reviews on Booksy`,
    );
    countElement.textContent = `${activeReview + 1} / ${reviews.length}`;
  };

  const stopRotation = () => window.clearInterval(rotationTimer);
  const startRotation = () => {
    stopRotation();
    if (
      !reducedMotion.matches &&
      !document.hidden &&
      !reviewCarousel.matches(':hover') &&
      !reviewCarousel.contains(document.activeElement)
    ) {
      rotationTimer = window.setInterval(
        () => showReview(activeReview + 1),
        6500,
      );
    }
  };

  previousButton.addEventListener('click', () => {
    showReview(activeReview - 1);
    startRotation();
  });
  nextButton.addEventListener('click', () => {
    showReview(activeReview + 1);
    startRotation();
  });
  reviewCarousel.addEventListener('mouseenter', stopRotation);
  reviewCarousel.addEventListener('mouseleave', startRotation);
  reviewCarousel.addEventListener('focusin', stopRotation);
  reviewCarousel.addEventListener('focusout', (event) => {
    if (!reviewCarousel.contains(event.relatedTarget)) startRotation();
  });
  document.addEventListener('visibilitychange', startRotation);
  reducedMotion.addEventListener('change', startRotation);

  startRotation();
}

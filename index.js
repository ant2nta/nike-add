const duration = 4000; /* ms */

function randomColor () {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);

  return "rgb(" + x + "," + y + "," + z + ")";
}

(async function createAd () {
  const ad = document.getElementById('ad');

  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  const swipe = document.createElement('div');
  swipe.classList.add('swiper', 'ad');

  /* parsing json data  */ 
  const response = await fetch('https://solovey.com.ua/test/data.json');
  const data = await response.json();

  data.sneakers.forEach(sneaker => {
    const slide = document.createElement('a');
    slide.classList.add('swiper-slide', 'slide');
    slide.href = sneaker.link;

    /* if needed to open in a new tab */
    // slide.target = '_blank';

    const logo = document.createElement('img');
    logo.src = './nike.svg';
    logo.className = 'slide__logo';

    const title = document.createElement('div');
    title.className = 'slide__title';

    if (!sneaker.model.includes('<br>')) {
      title.append(sneaker.model);
    } else {
      title.append(sneaker.model.slice(0, sneaker.model.indexOf('<')));
      title.append(document.createElement('br'));
      title.append(sneaker.model.slice(sneaker.model.indexOf('>') + 1));
    }

    const price = document.createElement('div');
    price.className = 'slide__price';
    price.textContent = data.currency + sneaker.price;

    const image = document.createElement('div');
    image.style.backgroundImage = `url('${sneaker.image_url}')`;
    image.className = 'slide__image';
    image.append(price);

    const button = document.createElement('div');
    button.className = 'slide__button';
    button.textContent = 'ORDER NOW!';
    button.style.backgroundColor = randomColor();
    button.style.color = randomColor();

    slide.append(logo);
    slide.append(title);
    slide.append(image);
    slide.append(button);

    wrapper.append(slide);
  });

  swipe.append(wrapper);
  ad.append(swipe);

  /* creating auto slider*/
  var swiper = new Swiper('.ad', {
    autoplay: {
      delay: duration,
    },
  });
})();
import React, { useState, useEffect } from 'react';
import GiftForm from './components/GiftForm';
import GiftModal from './components/GiftModal';
import GiftList from './components/GiftList';
import QuestionnaireModal from './components/QuestionnaireModal';
import './styles/App.css';

const mockGifts = [
  {
    id: 1,
    name: 'Red Square Keyrox TKL Aquarius',
    category: 'Клавиатуры',
    price: 5000,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/b6104d1b51c173cc6f6869ea1b0fabc2/98b0b98608ef5d4dab7ca21036d70153d3764bcab38447df447d167206e268eb.jpg.webp',
    link: 'https://www.dns-shop.ru/product/7c067a55fa9ced20/klaviatura-provodnaa-red-square-keyrox-tkl-aquarius-rsq-20036/',
  },
  {
    id: 2,
    name: 'ARDOR GAMING Blade PRO',
    category: 'Клавиатуры',
    price: 1200,
    image: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/021b2603ab5b80c28f3e1ab128c112ba/a247b79e77dcddb28bf9ae5bd0b4b7a10b02fc126256c4d704a99eafc85ddc5f.jpg.webp',
    link: 'https://www.dns-shop.ru/product/ef5f8c4b275ced20/klaviatura-provodnaa-ardor-gaming-blade-pro/',
  },
  {
    id: 3,
    name: 'ARDOR GAMING Guardian',
    category: 'Клавиатуры',
    price: 1500,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/b43c78994f925350b9718ad734d223b7/89997c4f89b6b68ed9392fb140c22cdbdbe26dbac1f0e36c87ffe0a1cb64c43f.jpg.webp',
    link: 'https://www.dns-shop.ru/product/8fe67decf469ed20/klaviatura-provodnaa--besprovodnaa-ardor-gaming-guardian-ag-zd-gu97gy-hs-g-sub-w/',
  },
  {
    id: 4,
    name: 'HUAWEI MateBook D 16 2024',
    category: 'Ноутбуки',
    price: 30000,
    image: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/a05a2224bd67e1277136fdf329f5d09a/a459701d4554c4cd40bc944e3cf9cc3487ae738e1102a3e03036d0f321abe3ad.jpg.webp',
    link: 'https://www.dns-shop.ru/product/12c02b819b19ed20/16-noutbuk-huawei-matebook-d-16-2024-mclf-x-seryj/',
  },
  {
    id: 5,
    name: 'PlayStation 5 Pro',
    category: 'Игровые приставки',
    price: 124999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/fc529417cd5f3c0b77a0a2bb6c64b73b/7f8d3527a7ba71b54aa6cd905a1b7a3e91aa4674e97c39e2d922e1c16abdedb1.png.webp',
    link: 'https://www.dns-shop.ru/product/5fa978af7f93d0a4/igrovaa-konsol-playstation-5-pro/',
  },
  {
    id: 7,
    name: 'Apple iPhone 15 128 ГБ',
    category: 'Телефоны',
    price: 81999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/41edbfdd1b4ef4a38f3ac15b85e02902/2258685cc32bbd96de406852bd9b2d94916029658cd6fa120a9f97a4bc0af297.jpg.webp',
    link: 'https://www.dns-shop.ru/product/acde03a252aeed20/61-smartfon-apple-iphone-15-128-gb-cernyj/',
  },
  {
    id: 8,
    name: 'Xiaomi Redmi Note 10S 128 ГБ',
    category: 'Телефоны',
    price: 11999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/28561a6174ff590d296440caae3a0f24/b9fdb98ae3cb6694228a1b8f232715355dc6d0205be6950704c9004cab01aa91.jpg.webp',
    link: 'https://www.dns-shop.ru/product/ac11257495e22ff0/643-smartfon-xiaomi-redmi-note-10s-128-gb-seryj/',
  },
  {
    id: 9,
    name: 'Samsung Galaxy Z Fold6 1024 ГБ',
    category: 'Телефоны',
    price: 229999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/56f28490be75b75857531512203251ca/c91c720c091e5cd85643ba41453c830209bec4f47750f851de14275524aa996a.jpg.webp',
    link: 'https://www.dns-shop.ru/product/89bf2af73540d9cb/76-smartfon-samsung-galaxy-z-fold6-1024-gb-seryj/',
  },
  {
    id: 10,
    name: 'Hitachi R-WX 630 KU XW',
    category: 'Холодильники',
    price: 467999,
    image: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/5248f5bf931bcfc3a49c414bc7e2fe83/81308b445cae7be1d60f90352785685bbbf28dacc53678541f064e9db4dd1ede.jpg.webp',
    link: 'https://www.dns-shop.ru/product/2b68d41cb6fc2ff4/kholodilnik-mnogodvernyj--hitachi-r-wx-630-ku-xw-belyj/',
  },
  {
    id: 11,
    name: 'Samsung RB46TS374SA/WT',
    category: 'Холодильники',
    price: 142999,
    image: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/ff9b768b831dcd14352e4f90044dec08/6a8763a9a300df5e8dc80f2c0b98595e356533b12b3eab9151a8221e16f633f9.jpg.webp',
    link: 'https://www.dns-shop.ru/product/a5d2cf263b653332/kholodilnik-s-morozilnikom--samsung-rb46ts374sawt-serebristyj/',
  },
  {
    id: 12,
    name: 'Kugoo Kirin G5',
    category: 'Самокаты',
    price: 260999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/df3d831e2417e05e00c3ad308934612e/901ce43748ef6b7ef7a4b975b3d35727cacc7dd0cb8c39d97c58b197be45425a.jpg.webp',
    link: 'https://www.dns-shop.ru/product/ef3f3e309a5eed20/elektrosamokat-kugoo-kirin-g5-cernyj/',
  },
  {
    id: 13,
    name: 'Ninebot Kickscooter MAX G2',
    category: 'Самокаты',
    price: 79999,
    image: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/e8a2cd0468437f1d4602185bccd7b6d2/3e78ec2e65b3da824977b92fa153706887a52d4bf40b8feea5c211adc212dc38.jpg.webp',
    link: 'https://www.dns-shop.ru/product/efda3b7c0343ed20/elektrosamokat-ninebot-kickscooter-max-g2-cernyj/',
  },
  {
    id: 15,
    name: 'Xiaomi Mi Electric Scooter 4 Pro',
    category: 'Самокаты',
    price: 62999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/e9f989a09baa7240732ce60e63e25a01/6c82c9bf3f9d4db28f67b1da7505b4c5533770562c28da3b4c3bb029402b4c3a.jpg.webp',
    link: 'https://www.dns-shop.ru/product/2021f2c7e301ed20/elektrosamokat-xiaomi-mi-electric-scooter-4-pro-cernyj/',
  },
  {
    id: 16,
    name: 'PlayStation 4 Slim',
    category: 'Игровые приставки',
    price: 42999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/0f7f89283ca010523fe2e463014c78bd/1ed878c6e20a07d7b49f52304c19e89aaee67c6ed235d150ba3c68a0213abcb6.jpg.webp',
    link: 'https://www.dns-shop.ru/product/aebf47341751d582/igrovaa-konsol-playstation-4-slim/',
  },
  {
    id: 17,
    name: 'Apple Watch SE 2023 40mm',
    category: 'Часы',
    price: 28599,
    image: 'https://c.dns-shop.ru/thumb/st4/fit/500/500/d50df1fa03dd18b3953cce3e8335c787/7d7597a6bed145fc05796677e2e1bb29269c8867515c085e1f82218a95b457db.jpg.webp',
    link: 'https://www.dns-shop.ru/product/5b0fcad9851ded20/smart-casy-apple-watch-se-2023-40mm/',
  },
  {
    id: 18,
    name: 'HUAWEI WATCH GT 5 Pro',
    category: 'Часы',
    price: 24999,
    image: 'https://c.dns-shop.ru/thumb/st1/fit/500/500/ea42477f9f9fff3be4e9167b92d5325b/e2244f2795aa2b06752ca08cc7bf01ff5d9211c43570a46c58df9d9d6c302e7e.jpg.webp',
    link: 'https://www.dns-shop.ru/product/7c7deb765f59d582/smart-casy-huawei-watch-gt-5-pro/',
  },
];

const availableCategories = ['Клавиатуры', 'Телефоны', 'Часы', 'Ноутбуки', 'Игровые приставки', 'Холодильники', 'Самокаты'];

function App() {
  const [filteredGifts, setFilteredGifts] = useState([]);
  const [selectedGift, setSelectedGift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isQuestionnaireOpen, setIsQuestionnaireOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    createSnowflakes();
  }, []);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const getRandomSelection = (array) => {
    const shuffled = shuffleArray(array);
    const randomCount = Math.floor(Math.random() * array.length) + 1;
    return shuffled.slice(0, randomCount);
  };

  const handleSearch = (criteria) => {
    setIsLoading(true);
    setTimeout(() => {
      const { category, minPrice, maxPrice, sortBy } = criteria;
      let result = mockGifts.filter((gift) => {
        const matchesCategory =
          category === '' || gift.category.toLowerCase().includes(category.toLowerCase());
        const matchesPrice =
          (!minPrice || gift.price >= minPrice) &&
          (!maxPrice || gift.price <= maxPrice);
        return matchesCategory && matchesPrice;
      });

      if (sortBy === 'price-asc') {
        result = result.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-desc') {
        result = result.sort((a, b) => b.price - a.price);
      }

      result = getRandomSelection(result);

      setFilteredGifts(result);
      setIsLoading(false);
    }, 1000);
  };

  const openModal = (gift) => {
    setSelectedGift(gift);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedGift(null);
    setIsModalOpen(false);
  };

  const openQuestionnaire = () => {
    setIsQuestionnaireOpen(true);
  };

  const closeQuestionnaire = () => {
    setIsQuestionnaireOpen(false);
  };

  const handleQuestionnaireSubmit = (preferences) => {
    setIsQuestionnaireOpen(false);
    setIsLoading(true);

    setTimeout(() => {
      const { age, interests, budget } = preferences;

      let result = mockGifts.filter((gift) => {
        const matchesBudget = gift.price <= budget;
        const matchesInterest = interests.some((interest) =>
          gift.name.toLowerCase().includes(interest.toLowerCase())
        );
        return matchesBudget && matchesInterest;
      });

      setFilteredGifts(getRandomSelection(result));
      setIsLoading(false);
    }, 2000); // Simulate AI processing
  };

  const createSnowflakes = (count = 20) => {
    const container = document.querySelector('.snowflakes');

    if (!container) {
      console.error('Snowflake container not found');
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      snowflake.style.left = `${Math.random() * 100}%`;
      snowflake.style.animationDuration = `${(Math.random() * 3 + 5).toFixed(2)}s`;
      snowflake.style.animationTimingFunction = 'linear';
      snowflake.style.opacity = (Math.random() * 0.5 + 0.5).toFixed(2);
      snowflake.style.fontSize = `${(Math.random() * 10 + 10).toFixed(2)}px`;

      snowflake.innerText = '*';

      fragment.appendChild(snowflake);
    }

    container.appendChild(fragment);
  };

  return (
    <div className="app-container">
      <div className="garland"></div>
      <div className="snowflakes"></div>
      <h1>Новогодний сервис подбора подарков</h1>
      <GiftForm onSearch={handleSearch} availableCategories={availableCategories} />
      <button className="self-gift-btn" onClick={openQuestionnaire}>
        Выбрать подарок для себя
      </button>
      {isLoading ? (
        <div className="loading">Загрузка...</div>
      ) : (
        <GiftList items={filteredGifts} onGiftClick={openModal} />
      )}
      <GiftModal isOpen={isModalOpen} onClose={closeModal} gift={selectedGift} />
      <QuestionnaireModal
        isOpen={isQuestionnaireOpen}
        onClose={closeQuestionnaire}
        onSubmit={handleQuestionnaireSubmit}
      />
    </div>
  );
}

export default App;

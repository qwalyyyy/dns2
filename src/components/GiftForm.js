import React, { useState } from 'react';

const GiftForm = ({ onSearch, availableCategories }) => {
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [suggestions, setSuggestions] = useState([]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);

    // Фильтрация списка подсказок
    if (value.trim()) {
      const filteredSuggestions = availableCategories.filter((cat) =>
        cat.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions(availableCategories); // Показать все категории, если поле пустое
    }
  };

  const handleFocus = () => {
    // Показать все категории при фокусе на поле ввода
    if (!category.trim()) {
      setSuggestions(availableCategories);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCategory(suggestion);
    setSuggestions([]); // Скрыть подсказки после выбора
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      category,
      minPrice: Number(minPrice),
      maxPrice: Number(maxPrice),
      sortBy,
    });
    setSuggestions([]); // Скрыть подсказки после отправки формы
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ position: 'relative' }}>
        <label>Категория:</label>
        <input
          type="text"
          value={category}
          onChange={handleCategoryChange}
          onFocus={handleFocus} // Добавлен обработчик фокуса
          placeholder="Введите категорию"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list" style={suggestionsStyle}>
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={suggestionItemStyle}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label>Минимальная цена:</label>
        <input
          type="number"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Максимальная цена:</label>
        <input
          type="number"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <div>
        <label>Сортировать по:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="price-asc">Цена (возрастание)</option>
          <option value="price-desc">Цена (убывание)</option>
        </select>
      </div>
      <button type="submit">Найти подарки</button>
    </form>
  );
};

const suggestionsStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  border: '1px solid #ccc',
  backgroundColor: '#fff',
  zIndex: 1000,
  maxHeight: '150px',
  overflowY: 'auto',
  listStyle: 'none',
  padding: 0,
  margin: 0,
};

const suggestionItemStyle = {
  padding: '10px',
  cursor: 'pointer',
  borderBottom: '1px solid #eee',
  backgroundColor: '#fff',
};

export default GiftForm;

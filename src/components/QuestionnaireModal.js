import React, { useState, useEffect } from 'react';

const defaultSuggestions = ['Часы', 'Спорт', 'Игры', 'Техника', 'Гаджеты', 'Книги', 'Музыка', 'Фильмы', 'Путешествия'];

const QuestionnaireModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    age: '',
    budget: '',
    interests: [],
  });
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      // Shuffle suggestions on modal open
      setSuggestions(shuffleArray(defaultSuggestions));
    }
  }, [isOpen]);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleInterest = (interest) => {
    setFormData((prev) => {
      const updatedInterests = prev.interests.includes(interest)
        ? prev.interests.filter((item) => item !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: updatedInterests };
    });
  };

  const clearInterests = () => {
    setFormData((prev) => ({ ...prev, interests: [] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      age: formData.age,
      interests: formData.interests,
      budget: parseFloat(formData.budget),
    });
    setFormData({ age: '', budget: '', interests: [] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Выберите свои предпочтения</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>
              Возраст:
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Введите ваш возраст"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label>
              Бюджет:
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                placeholder="Введите ваш бюджет"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <p>Выберите интересы:</p>
            <div className="interest-buttons">
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => toggleInterest(suggestion)}
                  className={`interest-btn ${
                    formData.interests.includes(suggestion) ? 'selected' : ''
                  }`}
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <button type="button" onClick={clearInterests} className="clear-btn">
              Очистить интересы
            </button>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="submit-btn">Подобрать</button>
            <button type="button" onClick={onClose} className="close-btn">Закрыть</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionnaireModal;

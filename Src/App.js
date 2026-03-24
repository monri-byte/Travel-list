import React, { useState } from 'react';
import './App.css';

// Данные путешествий хранятся в JavaScript массиве
const INITIAL_TRAVELS = [
  {
    id: 1,
    country: 'Италия',
    title: 'Романтическая Венеция',
    description: 'Путешествие по каналам и мостам самого романтичного города Италии',
    likes: 5
  },
  {
    id: 2,
    country: 'Япония',
    title: 'Сакура в Токио',
    description: 'Наслаждение цветением сакуры и знакомство с японской культурой',
    likes: 8
  },
  {
    id: 3,
    country: 'Франция',
    title: 'Винные дороги Бордо',
    description: 'Дегустация лучших вин и посещение знаменитых шато',
    likes: 3
  },
  {
    id: 4,
    country: 'Италия',
    title: 'Кулинарный тур по Тоскане',
    description: 'Мастер-классы по приготовлению пасты и дегустация оливкового масла',
    likes: 6
  }
];

function App() {
  const [travels, setTravels] = useState(INITIAL_TRAVELS);
  const [filterCountry, setFilterCountry] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTravel, setNewTravel] = useState({
    country: '',
    title: '',
    description: ''
  });

  // Получаем уникальные страны для фильтра
  const countries = ['Все', ...new Set(travels.map(travel => travel.country))];

  // Фильтрация путешествий по стране
  const filteredTravels = filterCountry && filterCountry !== 'Все'
    ? travels.filter(travel => travel.country === filterCountry)
    : travels;

  // Обработчик лайков
  const handleLike = (id) => {
    setTravels(travels.map(travel =>
      travel.id === id 
        ? { ...travel, likes: travel.likes + 1 }
        : travel
    ));
  };

  // Обработчики формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTravel({
      ...newTravel,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!newTravel.country || !newTravel.title || !newTravel.description) {
      alert('Пожалуйста, заполните все поля');
      return;
    }

    const travel = {
      id: Date.now(),
      country: newTravel.country,
      title: newTravel.title,
      description: newTravel.description,
      likes: 0
    };

    setTravels([...travels, travel]);
    setNewTravel({ country: '', title: '', description: '' });
    setShowForm(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🌍 Каталог путешествий</h1>
        <p>Найдите идеальное путешествие для себя</p>
      </header>

      <main className="main-content">
        <div className="controls">
          <div className="filter-section">
            <label htmlFor="country-filter">Фильтр по стране: </label>
            <select
              id="country-filter"
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
              className="filter-select"
            >
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="add-button"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Закрыть форму' : '+ Добавить путешествие'}
          </button>
        </div>

        {showForm && (
          <div className="form-container">
            <h2>Добавить новое путешествие</h2>
            <form onSubmit={handleSubmit} className="travel-form">
              <div className="form-group">
                <label htmlFor="country">Страна *</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={newTravel.country}
                  onChange={handleInputChange}
                  placeholder="Введите страну"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="title">Название *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTravel.title}
                  onChange={handleInputChange}
                  placeholder="Введите название путешествия"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Краткое описание *</label>
                <textarea
                  id="description"
                  name="description"
                  value={newTravel.description}
                  onChange={handleInputChange}
                  placeholder="Введите описание"
                  rows="3"
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Сохранить
                </button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
                  Отмена
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="travels-grid">
          {filteredTravels.length > 0 ? (
            filteredTravels.map(travel => (
              <div key={travel.id} className="travel-card">
                <div className="card-header">
                  <span className="country-badge">{travel.country}</span>
                </div>
                <div className="card-body">
                  <h3 className="travel-title">{travel.title}</h3>
                  <p className="travel-description">{travel.description}</p>
                </div>
                <div className="card-footer">
                  <button 
                    className="like-button"
                    onClick={() => handleLike(travel.id)}
                  >
                    ❤️ {travel.likes}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>Путешествия не найдены</p>
            </div>
          )}
        </div>

        <div className="statistics">
          <p>📊 Всего путешествий: {travels.length}</p>
          <p>❤️ Всего лайков: {travels.reduce((sum, travel) => sum + travel.likes, 0)}</p>
        </div>
      </main>
    </div>
  );
}

export default App;
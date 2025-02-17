import React, { useState, useEffect } from 'react';
import './Form.css';

function Form() {
  const [urlimg, setUrl] = useState('');
  const [conpanie, setConpanie] = useState('');
  const [lavozim, setLavozim] = useState('');
  const [timeAgo, setTimeAgo] = useState('');
  const [employmentType, setEmploymentType] = useState('');
  const [location, setLocation] = useState('');
  const [newChecked, setNewChecked] = useState(false);
  const [featuredChecked, setFeaturedChecked] = useState(false);
  const [skills, setSkills] = useState({
    fullstack: false,
    python: false,
    midweight: false,
    react: false
  });
  const [card, setCard] = useState([]);
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    const savedCards = JSON.parse(localStorage.getItem('cards')) || [];
    setCard(savedCards);
  }, []);

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(card));
  }, [card]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  function handleSave(event) {
    event.preventDefault();
    const cardd = {
      urlimg,
      conpanie,
      lavozim,
      skills,
      timeAgo,
      employmentType,
      location,
      newChecked,
      featuredChecked,
      id: Date.now()
    };

    setCard(prevCards => [...prevCards, cardd]);
    setUrl('');
    setConpanie('');
    setLavozim('');
    setSkills({ fullstack: false, python: false, midweight: false, react: false });
    setTimeAgo('');
    setEmploymentType('');
    setLocation('');
    setNewChecked(false);
    setFeaturedChecked(false);
  }

  function handleDelete(id) {
    setCard(card.filter(cardItem => cardItem.id !== id));
  }

  function handleEdit(id) {
    const cardToEdit = card.find(cardItem => cardItem.id === id);
    if (cardToEdit) {
      setUrl(cardToEdit.urlimg);
      setConpanie(cardToEdit.conpanie);
      setLavozim(cardToEdit.lavozim);
      setSkills(cardToEdit.skills);
      setTimeAgo(cardToEdit.timeAgo);
      setEmploymentType(cardToEdit.employmentType);
      setLocation(cardToEdit.location);
      setNewChecked(cardToEdit.newChecked);
      setFeaturedChecked(cardToEdit.featuredChecked);
      handleDelete(id);
    }
  }

  function toggleTheme() {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', darkMode ? 'light' : 'dark');
  }

  return (
    <div className={`container ${darkMode ? 'dark' : 'light'}`}>
      <header>
        <button className='darkMod' onClick={toggleTheme}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>
      <div className='content'>
        <div className='form'>
          <form>
            <h2>Vakansiya ma'lumotlarini kiriting</h2>
            <label>Logotip URL</label><br />
            <input value={urlimg} onChange={(e) => setUrl(e.target.value)} className='input' type='url' placeholder='Logotip URL manzilini kiriting' /><br />
            <label>Konpaniya nomi</label><br />
            <input value={conpanie} onChange={(e) => setConpanie(e.target.value)} className='input' type='text' placeholder='Manage' />
            <div className='chakked'>
              <label>NEW</label>
              <input type='checkbox' checked={newChecked} onChange={() => setNewChecked(!newChecked)} />
              <label>FEATURED</label>
              <input type='checkbox' checked={featuredChecked} onChange={() => setFeaturedChecked(!featuredChecked)} />
            </div>
            <label>Lavozimi</label>
            <input value={lavozim} onChange={(e) => setLavozim(e.target.value)} className='input' type='text' placeholder='Fullstack Developer' />
            <div className='selects'>
              <select onChange={(e) => setTimeAgo(e.target.value)}>
                <option value='1d ago'>1d ago</option>
                <option value='2d ago'>2d ago</option>
                <option value='1h ago'>1h ago</option>
                <option value='2h ago'>2h ago</option>
              </select>
              <select onChange={(e) => setEmploymentType(e.target.value)}>
                <option value='Full Time'>Full Time</option>
                <option value='Part Time'>Part Time</option>
              </select>
              <select onChange={(e) => setLocation(e.target.value)}>
                <option value='Worldwide'>Worldwide</option>
                <option value='Boshqa'>Boshqa</option>
              </select>
            </div>
            <button className='seve' onClick={handleSave}>Saqlash</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;

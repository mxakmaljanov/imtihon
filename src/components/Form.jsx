import { useState } from 'react';
import './Form.css';

 function Form() {
  const [form, setForm] = useState({
    logoUrl: '',
    companyName: '',
    position: '',
    isNew: false,
    isFeatured: false,
    time: '',
    jobType: '',
    location: '',
    skills: [],
  });

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleCheckboxChange = (field) => {
    setForm({ ...form, [field]: !form[field] });
  };

  const handleSkillChange = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = () => {
    console.log('Form data:', form);
    localStorage.setItem('jobFormData', JSON.stringify(form)); 
  };

  return (
    <div className="job-form-container">
      <h2 className="job-form-title">Vakansiya ma'lumotlarini kiriting</h2>

      <label className="input-label">Logotip URL</label>
      <input
        type="text"
        placeholder="Logotip URL manzilini kiriting"
        value={form.logoUrl}
        onChange={(e) => handleChange('logoUrl', e.target.value)}
        className="input-field"
      />

      <label className="input-label">Kompaniya nomi</label>
      <input
        type="text"
        placeholder='Kompaniya nomini kiriting'
        className="input-field"
      />

      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.isNew}
            onChange={() => handleCheckboxChange('isNew')}
          />
          Yangi
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={form.isFeatured}
            onChange={() => handleCheckboxChange('isFeatured')}
          />
          Featured
        </label>
      </div>

      <label className="input-label">Lavozim</label>
      <input
        type="text"
        placeholder='Lavozimingizni kiriting...!'
        className="input-field"
      />

      <div className="select-group">
        <select onChange={(e) => handleChange('time', e.target.value)} className="select-field">
          <option value="">Tanlang</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>

        <select onChange={(e) => handleChange('jobType', e.target.value)} className="select-field">
          <option value="">Tanlang</option>
          <option value="remote">Remote</option>
          <option value="on-site">On-site</option>
        </select>

        <select onChange={(e) => handleChange('location', e.target.value)} className="select-field">
          <option value="">Tanlang</option>
          <option value="tashkent">Toshkent</option>
          <option value="namangan">Namangan</option>
        </select>
      </div>

      <label className="input-label">Ko'nikmalar</label>
      <div className="skills-group">
        {['Fullstack', 'Python', 'Midweight', 'React'].map((skill) => (
          <label key={skill} className="checkbox-label">
            <input
              type="checkbox"
              checked={form.skills.includes(skill)}
              onChange={() => handleSkillChange(skill)}
            />
            {skill}
          </label>
        ))}
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Saqlash
      </button>
    </div>
  );
}

export function JobCard({ job }) {
  return (
    <div className="card">
      <div className="card-header">
        <img src={job.logoUrl} alt="logo" className="card-logo" />
        <div className="card-info">
          <h3 className="company-name">{job.companyName} {job.isNew && <span className="badge">New</span>} {job.isFeatured && <span className="badge">Featured</span>}</h3>
          <p className="position">{job.position}</p>
        </div>
      </div>

      <div className="skills">
        {job.skills.map((skill, index) => (
          <div key={index} className="skill">
            {skill}
          </div>
        ))}
      </div>

      <div className="card-actions">
        <button className="edit-button">Tahrirlash</button>
        <button className="delete-button">O'chirish</button>
      </div>
    </div>
  );
}
export default Form;
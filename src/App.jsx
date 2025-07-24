import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import PharmacyCard from './pharmacyCard';
import './App.css';
import { districtsByCity } from './districts';


const cities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
  "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
  "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan",
  "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır", "Isparta", "İstanbul",
  "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri", "Kırıkkale", "Kırklareli", "Kırşehir",
  "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Mardin", "Mersin", "Muğla", "Muş",
  "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya", "Samsun", "Siirt", "Sinop", "Sivas",
  "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

function App() {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [confirmedCity,setConfirmedCity] = useState('');
  const [confirmedDistrict, setConfirmedDistrict] = useState('');
  const [availableDistricts, setAvailableDistricts] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('tr-TR');
    setCurrentDate(formattedDate);
  }, []);

   useEffect(() => {
    if (selectedCity) {
      setAvailableDistricts(districtsByCity[selectedCity] || []);
      setSelectedDistrict('');
    } else {
      setAvailableDistricts([]);
      setSelectedDistrict('');
    }
  }, [selectedCity]);

  const handleConfirm = () => {
    setConfirmedCity(selectedCity);
    setConfirmedDistrict(selectedDistrict);
  };

  return (
    <div>
      <Navbar />
      
      <div className='title'>
        <h1>Nöbetçi eczane uygulamasına hoşgeldiniz.</h1>
        <p> {currentDate}</p>
      </div>
      <div className='container'>
        <div className='selection-container'>
          <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
            <option value="">-- İl seçiniz --</option>
            {cities.map((city, i) => (
              <option key={i} value={city}>{city}</option>
            ))}
          </select>
          
          {availableDistricts.length > 0 && (
            <select 
              value={selectedDistrict} 
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">-- Tüm ilçeler --</option>
              {availableDistricts.map((district, i) => (
                <option key={i} value={district}>{district}</option>
              ))}
            </select>
          )}
          
          <button onClick={handleConfirm}>Seçimi Onayla</button>
        </div>
        
        {confirmedCity && (
          <PharmacyCard 
            city={confirmedCity} 
            district={confirmedDistrict} 
          />
        )}
      </div>
    </div>
  );
}

export default App;

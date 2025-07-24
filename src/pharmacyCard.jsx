import { useEffect, useState } from 'react';
import './pharmacyCard.css';

function PharmacyCard({ city, district }) {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) return;

    setLoading(true);
    setError(null);

    let url = `https://api.collectapi.com/health/dutyPharmacy?il=${encodeURIComponent(city)}`;
    
    if (district) {
      url += `&ilce=${encodeURIComponent(district)}`;
    }

    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'authorization': 'apikey 1ARHNYWDugpF603Jx6jpzj:5lcKVSLJqwG0hxXml5NJPq',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Veri alınamadı');
        return res.json();
      })
      .then((data) => {
        setPharmacies(data.result || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [city, district]);

  if (!city) return null;

  if (loading) return <p>Yükleniyor...</p>;

  if (error) return <p>Hata: {error}</p>;

  if (pharmacies.length === 0) return <p>{district ? `${city} - ${district}` : city} için nöbetçi eczane bulunamadı.</p>;

  return (
    <div className="pharmacy-list">
      <h3>{district ? `${city} - ${district}` : city} için nöbetçi eczaneler:</h3>
      <div className="pharmacy-grid">
        {pharmacies.map((pharmacy, index) => (
          <div key={index} className="pharmacy-card">
            <h4>{pharmacy.name}</h4>
            <p><strong>Adres:</strong> {pharmacy.address}</p>
            <p><strong>Telefon:</strong> {pharmacy.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PharmacyCard;


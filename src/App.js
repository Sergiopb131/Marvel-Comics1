import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

function Comics() {

  const [comics, setComics] = useState([])

  useEffect(() => {
    const fetchComics = async () => {
      const publicKey = '35d6fbcb2413aab1756a879bb6f3bf8f';
      const privateKey = '267516c272f405cb810a1bfc666dc0bb6c306764';
      const timestamp = Date.now();
      const hash = md5(`${timestamp}${privateKey}${publicKey}`);

      try {
        const response = await axios.get(
          `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&ts=${timestamp}&hash=${hash}`
        );
        setComics(response.data.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComics();
  }, []);

  return (
    <div className="Comics" style={{ background: 'lightblue', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Lista de Cómics de Marvel</h1>
      <div className="comic-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', justifyContent: 'center' }}>
        {comics.map((comic) => (
          <div className="comic-card" key={comic.id} style={{ textAlign: 'center' }}>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'cover' }}
            />
            <p style={{ fontWeight: 'bold' }}>{comic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comics;

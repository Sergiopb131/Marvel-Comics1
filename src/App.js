import React, { useEffect, useState } from 'react';
import axios from 'axios';
import md5 from 'md5';

function Comics() {
  const [comics, setComics] = useState([]);

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
    <div className="Comics" style={comicsContainerStyle}>
      <h1 style={headerStyle}>Lista de Comics de Marvel</h1>
      <div className="comics-grid" style={comicsGridStyle}>
        {comics.map((comic) => (
          <div className="comic-card" key={comic.id} style={comicCardStyle}>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} style={comicImageStyle} />
            <p style={comicTitleStyle}>{comic.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const comicsContainerStyle = {
    background: 'linear-gradient(135deg, #003366, #66ccff)',
    backgroundSize: 'cover',
    padding: '20px',
  };

const headerStyle = {
  textAlign: 'center',
  color: 'white',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.6)',
};

const comicsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '20px',
  justifyContent: 'center',
};

const comicCardStyle = {
  textAlign: 'center',
  background: 'white',
  padding: '10px',
  borderRadius: '5px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

const comicImageStyle = {
  maxWidth: '100%',
  maxHeight: '200px',
  objectFit: 'cover',
};

const comicTitleStyle = {
  fontWeight: 'bold',
};

export default Comics;

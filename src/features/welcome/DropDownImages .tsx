import { useEffect, useState } from 'react';
import './DropImagesLine.css';

import materialuiIcon from '../../assets/images/material-ui-1.svg';
import TypescriptIcon from '../../assets/images/Typescript_logo_2020.svg';
import ReactIcon from '../../assets/images/React-icon.svg';
import reduxIcon from '../../assets/images/redux.svg';
import testingIcon from '../../assets/images/testing-library-seeklogo.svg';
import jestIcon from '../../assets/images/jest-seeklogo.svg';
import { useNavigate } from 'react-router-dom';

const images = [
  { src: materialuiIcon, caption: 'Material UI' },
  { src: TypescriptIcon, caption: 'TypeScript' },
  { src: ReactIcon, caption: 'React' },
  { src: reduxIcon, caption: 'Redux' },
  { src: testingIcon, caption: 'React Testing' },
  { src: jestIcon, caption: 'Jest' },
];

export default function DropImagesLine() {
  const [show, setShow] = useState(false);
    const navigate = useNavigate();
  
  const onPortfolio = () => {
    navigate('/portfolio'); 
  } 

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="images-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {images.map((img, i) => (
          <div
            key={i}
            className={`image-box ${show ? 'drop-in' : ''}`}
            style={{ transitionDelay: `${i * 150}ms` }}
          >
            <img src={img.src} alt={img.caption} className="image-icon" />
            <p className="caption">{img.caption}</p>
          </div>
        ))}
      </div>

      <button onClick={onPortfolio}
        style={{
          opacity: show ? 1 : 0,
          transition: 'opacity 2.0s ease-out',
          backgroundColor: '#227c9d',
          color: 'white',
          padding: '12px 28px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#227c9d')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#227c9d')}
      >
        Portfolio
      </button>

    </div>

  );
}

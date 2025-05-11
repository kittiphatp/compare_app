import React, { useState } from 'react';
import './App.css';

function App() {
  const imageFallback = 'https://img.freepik.com/free-vector/romantic-love-message-hearts-background_1017-29964.jpg';

  const [image1, setImage1] = useState('https://d2cva83hdk3bwc.cloudfront.net/5021074884-TH-21225007306-r-lly-the-bag-mark-ii-in-knit-and-vegan-leather-with-fm-logo-denim-1.jpg');
  const [image2, setImage2] = useState('https://d2cva83hdk3bwc.cloudfront.net/4875911845-TH-20452800817-r-lly-the-bag-mark-ii-in-knit-and-vegan-leather-with-fm-logo-black-1.jpg');
  const [imagePool, setImagePool] = useState([
    'https://d2cva83hdk3bwc.cloudfront.net/RALLY-HABBRMTBWVSLBIA6D1-rally-movement-r-lly-the-bag-whisper-valentine-s-limited-in-microfiber-leather-with-rm-logo-blush-pink-1.jpg',
    'https://d2cva83hdk3bwc.cloudfront.net/r-lly-tote-bag-with-fm-logo-black-1.jpg',
    'https://d2cva83hdk3bwc.cloudfront.net/rally-movement-r-lly-the-bag-whisper-in-microfiber-leather-with-rm-logo-scarlet-1.jpg',
    'https://d2cva83hdk3bwc.cloudfront.net/rally-sbbrmrtbmwjbn7tf-rally-movement-rally-the-bag-mini-whisper-just-brown-1.jpg',
    'https://d2cva83hdk3bwc.cloudfront.net/rally-sbbrmrtbmwslqkdz-rally-movement-rally-the-bag-mini-whisper-silver-lining-1.jpg',
    'https://d2cva83hdk3bwc.cloudfront.net/RALLY-SBBRMRTBMWIDWCFY-rally-movement-rally-the-bag-mini-whisper-i-do-1.jpg',
    // Add more image URLs here
  ]);

  const handlePost = () => {
    let image = image1 === imageFallback ? image2 : image1;
    image = image.split('https://d2cva83hdk3bwc.cloudfront.net/')[1];
    // console.log(image);
    fetch(`https://compare-server-lemon.vercel.app/send-message/${image}`, {
    // fetch('http://localhost:3000/send-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*',
        // 'Access-Control-Allow-Origin': '*',
      },
      // mode: 'no-cors',
      body: JSON.stringify({"selected": "abcde"}),
      redirect: "follow"
    })
      .then((response) => {
        if (response.ok) {
          console.log('Message sent successfully!')
        } else {
          console.error('Error sending message:', response.statusText)
        }
      })
      .catch((error) => {
        console.error('Error sending message:', error)
      })
  }
  
  const getRandomImage = () => {
    if (imagePool.length > 0) {
      const randomIndex = Math.floor(Math.random() * imagePool.length);
      const newImage = imagePool[randomIndex];
      // Remove the selected image from the pool to avoid immediate duplicates (optional)
      setImagePool((prevPool) =>
        prevPool.filter((_, index) => index !== randomIndex)
      );
      return newImage;
    }
    handlePost();
    return imageFallback; // Fallback image
  };

  const handleImageSelect = (selectedImage) => {
    if(selectedImage !== imageFallback) {
      if (selectedImage === image1) {
        setImage2(getRandomImage());
      } else if (selectedImage === image2) {
        setImage1(getRandomImage());
      }
    }
      
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Choose an Image</h1>
      <div style={styles.imageContainer}>
        <img
          src={image1}
          alt={image1}
          style={styles.image}
          onClick={() => handleImageSelect(image1)}
        />
        <span style={styles.separator}>vs</span>
        <img
          src={image2}
          alt={image2}
          style={styles.image}
          onClick={() => handleImageSelect(image2)}
        />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'sans-serif',
  },
  heading: {
    marginBottom: '20px',
  },
  imageContainer: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  image: {
    width: '200px',
    height: '200px',
    border: '2px solid #ccc',
    cursor: 'pointer',
    objectFit: 'cover',
  },
  separator: {
    fontSize: '1.5em',
  },
};

export default App;

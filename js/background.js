/* Author: Hannah Bauer
Course: CGS2829.0M1
Date: 11/17/2024
Assignment: Final Project

ajax - dynamic background with linear gradient

*/


fetch('data/config.json')

  .then(response => response.json())

  .then(config => {
    const backgroundElement = document.querySelector('.gradient-background');

    let currentColors = config.background.colors;
    
    const setGradientColor = () => {
      backgroundElement.style.background = `linear-gradient(${config.background.direction}, ${currentColors.join(', ')})`;

      backgroundElement.style.backgroundSize = '220% 220%';
    };
    setGradientColor();

    document.styleSheets[0].insertRule(`

      @keyframes dynamicGradientAnimation {
        ${config.background.keyframes.map(f => `${f.position} { background-position: ${f.backgroundPosition}; }`).join(' ')}
      }

    `, 0);

    backgroundElement.style.animation = `dynamicGradientAnimation ${config.background.animationSpeed} ease infinite`;
  })
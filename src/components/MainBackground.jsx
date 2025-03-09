import React from 'react';

const MainBackground = () => {
  return (
    <div className="main-background">
      <div className="main-bg-comets">
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
        <div className="comet" />
      </div>
      <img className="main-bg" src="/assets/images/background/mainbg/ground.svg" />
    </div>
  );
};

export default MainBackground;
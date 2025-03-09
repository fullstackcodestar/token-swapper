
import React from 'react';
import ExchangeForm from '@/components/ExchangeForm';
import BackgroundWave from '@/components/BackgroundWave';
import FallingStars from '@/components/FallingStars';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="main-background"></div>
      
      {/* Falling stars animation */}
      <FallingStars />
      
      {/* Header */}
      <header className="relative z-10 py-4 px-4 flex items-center justify-center md:justify-between border-b-1 border-gray-600">
        <div className="flex items-center">
          <i className="pi pi-bolt text-base text-blue-400"></i>
          <i className="pi pi-bolt text-lg text-blue-300"></i>
          <i className="pi pi-bolt text-base text-blue-200"></i>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <ExchangeForm />
        </div>
      </main>
      
      {/* Background wave decoration */}
      <BackgroundWave />
      <img src="/bitcoin-image1.png" alt="" />
    </div>
  );
};

export default Index;

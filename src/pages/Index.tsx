
import React from 'react';
import ExchangeForm from '@/components/ExchangeForm';
import BackgroundWave from '@/components/BackgroundWave';
import FallingStars from '@/components/FallingStars';
import { Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="main-background"></div>
      
      {/* Falling stars animation */}
      <FallingStars />
      
      {/* Header */}
      <header className="relative z-10 pt-4 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Zap className="w-6 h-6 text-blue-400" />
          <Zap className="w-6 h-6 text-blue-300" />
          <Zap className="w-6 h-6 text-blue-200" />
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative z-10 px-4 py-12 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl mx-auto">
          <ExchangeForm />
        </div>
      </main>
      
      {/* Background wave decoration */}
      <BackgroundWave />
    </div>
  );
};

export default Index;

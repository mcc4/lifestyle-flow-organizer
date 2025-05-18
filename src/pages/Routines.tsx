
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RoutineBuilder from '@/components/routines/RoutineBuilder';
import { UserDataProvider } from '@/context/UserDataContext';

const Routines = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Daily Routines</h1>
            <p className="text-muted-foreground mb-6">Design your optimal day structure</p>
            <RoutineBuilder />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Routines;

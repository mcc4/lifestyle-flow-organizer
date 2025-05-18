
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MealPlanner from '@/components/meals/MealPlanner';
import { UserDataProvider } from '@/context/UserDataContext';
import { Utensils } from 'lucide-react';

const Meals = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-teal-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Utensils className="text-lifestyle-teal animate-pulse" size={24} />
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-teal to-lifestyle-blue animate-fade-in">
                Meal Planning
              </h1>
            </div>
            <p className="text-muted-foreground mb-8 max-w-2xl animate-fade-in">
              Fuel your body right - delicious, nutritious meals that power your day and delight your taste buds
            </p>
            <MealPlanner />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Meals;

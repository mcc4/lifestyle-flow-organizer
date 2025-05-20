
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MealPlanner from '@/components/meals/MealPlanner';
import { UserDataProvider } from '@/context/UserDataContext';
import { Utensils, Apple, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MealsHero = () => (
  <div className="relative overflow-hidden mb-12 rounded-2xl bg-gradient-to-br from-lifestyle-teal/20 to-lifestyle-blue/10 p-8">
    <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-lifestyle-teal/10 rounded-full filter blur-3xl"></div>
    <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-48 h-48 bg-lifestyle-blue/10 rounded-full filter blur-3xl"></div>
    
    <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lifestyle-teal/10 text-lifestyle-teal text-sm font-medium mb-4">
          <Utensils size={14} className="text-lifestyle-teal" />
          <span>Nutrition Planning</span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-teal to-lifestyle-blue">
          Plan Your Meals, <span className="block">Fuel Your Body</span>
        </h1>
        
        <p className="text-muted-foreground max-w-xl mb-6">
          Create balanced, nutritious meal plans that align with your goals. Discover new recipes and 
          make eating healthy both delicious and convenient.
        </p>
        
        <div className="flex flex-wrap gap-4">
          <Button className="bg-lifestyle-teal hover:bg-lifestyle-teal/90">
            <Apple size={16} className="mr-2" />
            Plan Meals
          </Button>
          <Button variant="outline">Browse Recipes</Button>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-lifestyle-teal/20 to-lifestyle-blue/20 rounded-full filter blur-xl"></div>
        <div className="relative z-10 w-52 h-52 md:w-64 md:h-64 flex items-center justify-center">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-xl flex items-center justify-center">
            <div className="text-center">
              <div className="relative inline-block">
                <Utensils size={32} className="mx-auto mb-2 text-lifestyle-teal" />
                <Coffee size={16} className="absolute -top-1 right-0 text-lifestyle-blue" />
              </div>
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lifestyle-teal to-lifestyle-blue">Meals</div>
              <div className="text-xs text-muted-foreground mt-1">Nutrition that nourishes</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Meals = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-teal-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <MealsHero />
            <MealPlanner />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Meals;

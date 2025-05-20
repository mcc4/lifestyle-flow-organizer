
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DailyOverview from '@/components/dashboard/DailyOverview';
import { UserDataProvider } from '@/context/UserDataContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Target, Utensils, Moon } from 'lucide-react';

const Index = () => {
  return (
    <UserDataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-white to-blue-50/80 dark:from-gray-900 dark:to-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent lifestyle-gradient animate-fade-in">
                Transform Your <span className="relative">
                  Day
                  <span className="absolute -bottom-1 left-0 w-full h-1 bg-lifestyle-blue rounded-full"></span>
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto md:mx-0 animate-fade-in">
                Track your progress, plan your meals, optimize your sleep, and build routines that help you achieve your goals.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button asChild className="bg-lifestyle-blue hover:bg-lifestyle-blue/90 text-white">
                  <Link to="/goals">Set Goals</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/routines">Build Routines</Link>
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-xl p-6 shadow-lg backdrop-blur-sm animate-fade-in transition-all hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="text-lifestyle-purple" size={24} />
                  <span>Quick Links</span>
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/goals" className="bg-gradient-to-br from-lifestyle-purple/10 to-lifestyle-blue/10 p-4 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
                    <Target className="text-lifestyle-purple mb-2" size={32} />
                    <span className="font-medium">Goal Tracking</span>
                    <span className="text-sm text-muted-foreground">Set & achieve milestones</span>
                  </Link>
                  <Link to="/meals" className="bg-gradient-to-br from-lifestyle-teal/10 to-lifestyle-blue/10 p-4 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
                    <Utensils className="text-lifestyle-teal mb-2" size={32} />
                    <span className="font-medium">Meal Planning</span>
                    <span className="text-sm text-muted-foreground">Optimize your nutrition</span>
                  </Link>
                  <Link to="/sleep" className="bg-gradient-to-br from-lifestyle-indigo/10 to-lifestyle-blue/10 p-4 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
                    <Moon className="text-lifestyle-indigo mb-2" size={32} />
                    <span className="font-medium">Sleep Tracking</span>
                    <span className="text-sm text-muted-foreground">Improve your rest</span>
                  </Link>
                  <Link to="/routines" className="bg-gradient-to-br from-lifestyle-blue/10 to-lifestyle-purple/10 p-4 rounded-lg flex flex-col items-center text-center hover:scale-105 transition-transform">
                    <Calendar className="text-lifestyle-blue mb-2" size={32} />
                    <span className="font-medium">Daily Routines</span>
                    <span className="text-sm text-muted-foreground">Structure your day</span>
                  </Link>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-lifestyle-blue/5 to-lifestyle-purple/5 rounded-xl overflow-hidden relative border border-gray-100 dark:border-gray-700 shadow-lg">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NWgtMXYtNXptMi0yaDF2MWgtMXYtMXptLTIgMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xVjI4em0tMiAyaDFWMzFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bS0yIDJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptMiAwaDF2MmgtMXYtMnptLTIgNGgxdjFoLTF2LTF6bTAgMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-60"></div>
                <div className="p-6 relative z-10">
                  <h2 className="text-2xl font-semibold mb-4">Life Balance Score</h2>
                  <div className="flex items-center justify-center h-52">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle className="text-gray-200 dark:text-gray-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" />
                        <circle className="text-lifestyle-blue" strokeWidth="8" stroke="currentColor" fill="transparent" r="42" cx="50" cy="50" strokeDasharray="264" strokeDashoffset="66" strokeLinecap="round" />
                      </svg>
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-4xl font-bold">75%</span>
                        <span className="text-xs text-muted-foreground">Great balance!</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DailyOverview />
          </div>
        </main>
        <Footer />
      </div>
    </UserDataProvider>
  );
};

export default Index;


import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

interface UserProfile {
  name: string;
  wakeTime: string;
  sleepTime: string;
}

interface Goal {
  id: string;
  title: string;
  completed: boolean;
  category: 'fitness' | 'nutrition' | 'mindfulness' | 'productivity' | 'other';
}

interface MealPlan {
  id: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  title: string;
  time: string;
  completed: boolean;
}

interface SleepLog {
  id: string;
  date: string;
  bedTime: string;
  wakeTime: string;
  quality: number; // 1-5
  notes: string;
}

interface RoutineStep {
  id: string;
  title: string;
  time: string;
  duration: number; // minutes
  completed: boolean;
  category: 'morning' | 'work' | 'evening' | 'other';
}

interface UserData {
  profile: UserProfile;
  goals: Goal[];
  meals: MealPlan[];
  sleepLogs: SleepLog[];
  routines: RoutineStep[];
}

interface UserDataContextType {
  userData: UserData;
  updateProfile: (profile: UserProfile) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  addMeal: (meal: Omit<MealPlan, 'id'>) => void;
  updateMeal: (meal: MealPlan) => void;
  deleteMeal: (id: string) => void;
  addSleepLog: (log: Omit<SleepLog, 'id'>) => void;
  updateSleepLog: (log: SleepLog) => void;
  deleteSleepLog: (id: string) => void;
  addRoutineStep: (step: Omit<RoutineStep, 'id'>) => void;
  updateRoutineStep: (step: RoutineStep) => void;
  deleteRoutineStep: (id: string) => void;
  todayGoals: () => Goal[];
  todayMeals: () => MealPlan[];
  todayRoutines: () => RoutineStep[];
}

const initialUserData: UserData = {
  profile: {
    name: 'User',
    wakeTime: '07:00',
    sleepTime: '23:00',
  },
  goals: [
    {
      id: '1',
      title: 'Drink 8 glasses of water',
      completed: false,
      category: 'nutrition',
    },
    {
      id: '2',
      title: '30 minute workout',
      completed: false,
      category: 'fitness',
    },
    {
      id: '3',
      title: '10 minute meditation',
      completed: false,
      category: 'mindfulness',
    },
  ],
  meals: [
    {
      id: '1',
      mealType: 'breakfast',
      title: 'Oatmeal with fruit',
      time: '08:00',
      completed: false,
    },
    {
      id: '2',
      mealType: 'lunch',
      title: 'Salad with grilled chicken',
      time: '13:00',
      completed: false,
    },
    {
      id: '3',
      mealType: 'dinner',
      title: 'Salmon with vegetables',
      time: '19:00',
      completed: false,
    },
  ],
  sleepLogs: [
    {
      id: '1',
      date: new Date().toISOString().split('T')[0],
      bedTime: '23:00',
      wakeTime: '07:00',
      quality: 4,
      notes: 'Slept well',
    },
  ],
  routines: [
    {
      id: '1',
      title: 'Morning stretching',
      time: '07:15',
      duration: 15,
      completed: false,
      category: 'morning',
    },
    {
      id: '2',
      title: 'Check emails',
      time: '09:00',
      duration: 30,
      completed: false,
      category: 'work',
    },
    {
      id: '3',
      title: 'Evening walk',
      time: '18:00',
      duration: 30,
      completed: false,
      category: 'evening',
    },
  ],
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const UserDataContext = createContext<UserDataContextType | null>(null);

export function UserDataProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(() => {
    const savedData = localStorage.getItem('lifestyleFlowData');
    return savedData ? JSON.parse(savedData) : initialUserData;
  });

  useEffect(() => {
    localStorage.setItem('lifestyleFlowData', JSON.stringify(userData));
  }, [userData]);

  const updateProfile = (profile: UserProfile) => {
    setUserData(prev => ({ ...prev, profile }));
    toast.success("Profile updated");
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal = { ...goal, id: generateId() };
    setUserData(prev => ({ ...prev, goals: [...prev.goals, newGoal] }));
    toast.success("Goal added");
  };

  const updateGoal = (goal: Goal) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.map(g => (g.id === goal.id ? goal : g)),
    }));
  };

  const deleteGoal = (id: string) => {
    setUserData(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id),
    }));
    toast.success("Goal deleted");
  };

  const addMeal = (meal: Omit<MealPlan, 'id'>) => {
    const newMeal = { ...meal, id: generateId() };
    setUserData(prev => ({ ...prev, meals: [...prev.meals, newMeal] }));
    toast.success("Meal added");
  };

  const updateMeal = (meal: MealPlan) => {
    setUserData(prev => ({
      ...prev,
      meals: prev.meals.map(m => (m.id === meal.id ? meal : m)),
    }));
  };

  const deleteMeal = (id: string) => {
    setUserData(prev => ({
      ...prev,
      meals: prev.meals.filter(m => m.id !== id),
    }));
    toast.success("Meal deleted");
  };

  const addSleepLog = (log: Omit<SleepLog, 'id'>) => {
    const newLog = { ...log, id: generateId() };
    setUserData(prev => ({ ...prev, sleepLogs: [...prev.sleepLogs, newLog] }));
    toast.success("Sleep log added");
  };

  const updateSleepLog = (log: SleepLog) => {
    setUserData(prev => ({
      ...prev,
      sleepLogs: prev.sleepLogs.map(l => (l.id === log.id ? log : l)),
    }));
  };

  const deleteSleepLog = (id: string) => {
    setUserData(prev => ({
      ...prev,
      sleepLogs: prev.sleepLogs.filter(l => l.id !== id),
    }));
    toast.success("Sleep log deleted");
  };

  const addRoutineStep = (step: Omit<RoutineStep, 'id'>) => {
    const newStep = { ...step, id: generateId() };
    setUserData(prev => ({ ...prev, routines: [...prev.routines, newStep] }));
    toast.success("Routine step added");
  };

  const updateRoutineStep = (step: RoutineStep) => {
    setUserData(prev => ({
      ...prev,
      routines: prev.routines.map(r => (r.id === step.id ? step : r)),
    }));
  };

  const deleteRoutineStep = (id: string) => {
    setUserData(prev => ({
      ...prev,
      routines: prev.routines.filter(r => r.id !== id),
    }));
    toast.success("Routine step deleted");
  };

  // Helper functions to get today's data
  const todayGoals = () => userData.goals;
  const todayMeals = () => userData.meals;
  const todayRoutines = () => userData.routines;

  return (
    <UserDataContext.Provider
      value={{
        userData,
        updateProfile,
        addGoal,
        updateGoal,
        deleteGoal,
        addMeal,
        updateMeal,
        deleteMeal,
        addSleepLog,
        updateSleepLog,
        deleteSleepLog,
        addRoutineStep,
        updateRoutineStep,
        deleteRoutineStep,
        todayGoals,
        todayMeals,
        todayRoutines,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
}

export function useUserData() {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error('useUserData must be used within a UserDataProvider');
  }
  return context;
}

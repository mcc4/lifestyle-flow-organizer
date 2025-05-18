
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';
import { useUserData } from '@/context/UserDataContext';
import { formatTime, getCurrentTimeForInput } from '@/utils/timeUtils';

const mealTypes = [
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'snack', label: 'Snack' },
];

const MealPlanner = () => {
  const { userData, addMeal, updateMeal, deleteMeal } = useUserData();
  const { meals } = userData;
  const [newMeal, setNewMeal] = useState('');
  const [newMealType, setNewMealType] = useState<string>('breakfast');
  const [newMealTime, setNewMealTime] = useState(getCurrentTimeForInput());
  
  const handleAddMeal = () => {
    if (newMeal.trim()) {
      addMeal({
        title: newMeal,
        mealType: newMealType as any,
        time: newMealTime,
        completed: false,
      });
      setNewMeal('');
    }
  };
  
  const handleToggleMeal = (meal: any) => {
    updateMeal({ ...meal, completed: !meal.completed });
  };
  
  const handleDeleteMeal = (id: string) => {
    deleteMeal(id);
  };
  
  // Group meals by type
  const groupedMeals: Record<string, typeof meals> = {};
  meals.forEach(meal => {
    if (!groupedMeals[meal.mealType]) {
      groupedMeals[meal.mealType] = [];
    }
    groupedMeals[meal.mealType].push(meal);
  });
  
  // Sort meals by time
  Object.values(groupedMeals).forEach(mealGroup => {
    mealGroup.sort((a, b) => {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      return (timeA[0] * 60 + timeA[1]) - (timeB[0] * 60 + timeB[1]);
    });
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="text-xl">Add New Meal</CardTitle>
            <CardDescription>Plan your meals for optimal nutrition</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meal">Meal Description</Label>
              <Input
                id="meal"
                placeholder="What are you planning to eat?"
                value={newMeal}
                onChange={(e) => setNewMeal(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mealType">Meal Type</Label>
                <Select
                  value={newMealType}
                  onValueChange={setNewMealType}
                >
                  <SelectTrigger id="mealType">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {mealTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMealTime}
                  onChange={(e) => setNewMealTime(e.target.value)}
                />
              </div>
            </div>
            <Button 
              onClick={handleAddMeal} 
              className="w-full"
              disabled={!newMeal.trim()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Meal
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="text-xl">Nutrition Tips</CardTitle>
            <CardDescription>Recommendations for a balanced diet</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-blue mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Eat a rainbow of colorful vegetables and fruits daily.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-purple mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Stay hydrated by drinking at least 8 glasses of water daily.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-teal mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Include protein with each meal to help maintain energy levels.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-pink mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Limit processed foods and opt for whole, unprocessed alternatives.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-indigo mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Plan your meals in advance to ensure balanced nutrition.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {Object.entries(groupedMeals).length > 0 ? (
          Object.entries(groupedMeals).map(([mealType, mealsList]) => (
            <Card key={mealType} className="card-gradient card-hover">
              <CardHeader>
                <CardTitle className="capitalize">{mealType}</CardTitle>
                <CardDescription>
                  {mealsList.filter(m => m.completed).length} of {mealsList.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mealsList.map((meal) => (
                    <li 
                      key={meal.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-white/40 dark:bg-gray-800/40"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={meal.completed}
                          onChange={() => handleToggleMeal(meal)}
                          className="rounded text-lifestyle-blue focus:ring-lifestyle-blue h-4 w-4"
                        />
                        <div className={meal.completed ? "line-through text-muted-foreground" : ""}>
                          <div>{meal.title}</div>
                          <div className="text-xs text-muted-foreground">{formatTime(meal.time)}</div>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteMeal(meal.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash size={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="card-gradient card-hover">
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">You haven't added any meals yet.</p>
              <p className="text-sm mt-1">Add your first meal above to start planning!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MealPlanner;

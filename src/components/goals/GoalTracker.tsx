
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash } from 'lucide-react';
import { useUserData } from '@/context/UserDataContext';
import ProgressCircle from '@/components/ui/ProgressCircle';
import { getProgressPercentage } from '@/utils/timeUtils';

const goalCategories = [
  { value: 'fitness', label: 'Fitness' },
  { value: 'nutrition', label: 'Nutrition' },
  { value: 'mindfulness', label: 'Mindfulness' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'other', label: 'Other' },
];

const GoalTracker = () => {
  const { userData, addGoal, updateGoal, deleteGoal } = useUserData();
  const { goals } = userData;
  const [newGoal, setNewGoal] = useState('');
  const [newCategory, setNewCategory] = useState<string>('fitness');
  
  const handleAddGoal = () => {
    if (newGoal.trim()) {
      addGoal({
        title: newGoal,
        completed: false,
        category: newCategory as any,
      });
      setNewGoal('');
    }
  };
  
  const handleToggleGoal = (goal: any) => {
    updateGoal({ ...goal, completed: !goal.completed });
  };
  
  const handleDeleteGoal = (id: string) => {
    deleteGoal(id);
  };
  
  const completedGoals = goals.filter(goal => goal.completed).length;
  const progress = getProgressPercentage(completedGoals, goals.length);
  
  // Group goals by category
  const groupedGoals: Record<string, typeof goals> = {};
  goals.forEach(goal => {
    if (!groupedGoals[goal.category]) {
      groupedGoals[goal.category] = [];
    }
    groupedGoals[goal.category].push(goal);
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="text-xl">Add New Goal</CardTitle>
            <CardDescription>Create a new goal to track your progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="goal">Goal Title</Label>
              <Input
                id="goal"
                placeholder="Enter your goal"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={newCategory}
                onValueChange={setNewCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {goalCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              onClick={handleAddGoal} 
              className="w-full"
              disabled={!newGoal.trim()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Goal
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="text-xl">Progress Overview</CardTitle>
            <CardDescription>Track your goals completion</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[calc(100%-96px)]">
            <ProgressCircle percentage={progress} size={140} progressColor="rgb(114, 9, 183)">
              <div className="text-center">
                <div className="text-3xl font-bold">{progress}%</div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
            </ProgressCircle>
            <div className="mt-4 text-center">
              <p className="text-lg font-medium">{completedGoals} of {goals.length} goals</p>
              <p className="text-sm text-muted-foreground">Keep going!</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {Object.entries(groupedGoals).length > 0 ? (
          Object.entries(groupedGoals).map(([category, categoryGoals]) => (
            <Card key={category} className="card-gradient card-hover">
              <CardHeader>
                <CardTitle className="capitalize">{category} Goals</CardTitle>
                <CardDescription>
                  {categoryGoals.filter(g => g.completed).length} of {categoryGoals.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {categoryGoals.map((goal) => (
                    <li 
                      key={goal.id} 
                      className="flex items-center justify-between p-3 rounded-lg bg-white/40 dark:bg-gray-800/40"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={goal.completed}
                          onChange={() => handleToggleGoal(goal)}
                          className="rounded text-lifestyle-blue focus:ring-lifestyle-blue h-4 w-4"
                        />
                        <span className={goal.completed ? "line-through text-muted-foreground" : ""}>
                          {goal.title}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteGoal(goal.id)}
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
              <p className="text-muted-foreground">You haven't added any goals yet.</p>
              <p className="text-sm mt-1">Add your first goal above to start tracking your progress!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default GoalTracker;

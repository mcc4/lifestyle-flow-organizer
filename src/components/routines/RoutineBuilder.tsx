
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Clock, Trash } from 'lucide-react';
import { useUserData } from '@/context/UserDataContext';
import { formatTime, getCurrentTimeForInput } from '@/utils/timeUtils';

const routineCategories = [
  { value: 'morning', label: 'Morning' },
  { value: 'work', label: 'Work' },
  { value: 'evening', label: 'Evening' },
  { value: 'other', label: 'Other' },
];

const RoutineBuilder = () => {
  const { userData, addRoutineStep, updateRoutineStep, deleteRoutineStep } = useUserData();
  const { routines } = userData;
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState(getCurrentTimeForInput());
  const [newDuration, setNewDuration] = useState(15);
  const [newCategory, setNewCategory] = useState<string>('morning');
  
  const handleAddRoutine = () => {
    if (newTitle.trim()) {
      addRoutineStep({
        title: newTitle,
        time: newTime,
        duration: newDuration,
        completed: false,
        category: newCategory as any,
      });
      setNewTitle('');
    }
  };
  
  const handleToggleRoutine = (routine: any) => {
    updateRoutineStep({ ...routine, completed: !routine.completed });
  };
  
  const handleDeleteRoutine = (id: string) => {
    deleteRoutineStep(id);
  };
  
  // Group routines by category
  const groupedRoutines: Record<string, typeof routines> = {};
  routines.forEach(routine => {
    if (!groupedRoutines[routine.category]) {
      groupedRoutines[routine.category] = [];
    }
    groupedRoutines[routine.category].push(routine);
  });
  
  // Sort routines by time
  Object.values(groupedRoutines).forEach(routineGroup => {
    routineGroup.sort((a, b) => {
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
            <CardTitle className="text-xl">Add Routine</CardTitle>
            <CardDescription>Build your optimal daily routine</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title</Label>
              <Input
                id="title"
                placeholder="Enter activity name"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (min)</Label>
                <Input
                  id="duration"
                  type="number"
                  min={1}
                  value={newDuration}
                  onChange={(e) => setNewDuration(parseInt(e.target.value) || 15)}
                />
              </div>
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
                  {routineCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              onClick={handleAddRoutine} 
              className="w-full"
              disabled={!newTitle.trim()}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add to Routine
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="text-xl">Routine Tips</CardTitle>
            <CardDescription>Making the most of your day</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-blue mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Start your day with a consistent morning routine to set a positive tone.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-purple mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Batch similar tasks together to improve focus and efficiency.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-teal mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Schedule breaks between focused work periods to maintain energy.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-pink mt-1.5 mr-2 flex-shrink-0"></div>
                <span>Include both productivity and self-care activities in your daily routine.</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 rounded-full bg-lifestyle-indigo mt-1.5 mr-2 flex-shrink-0"></div>
                <span>End each day with a wind-down routine to prepare for quality sleep.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-6">
        {Object.entries(groupedRoutines).length > 0 ? (
          Object.entries(groupedRoutines).map(([category, routinesList]) => (
            <Card key={category} className="card-gradient card-hover">
              <CardHeader>
                <CardTitle className="capitalize">{category} Routine</CardTitle>
                <CardDescription>
                  {routinesList.filter(r => r.completed).length} of {routinesList.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute top-0 bottom-0 left-6 border-l-2 border-dashed border-gray-300 dark:border-gray-600"></div>
                  <ul className="space-y-6 relative">
                    {routinesList.map((routine) => (
                      <li 
                        key={routine.id} 
                        className="relative pl-10"
                      >
                        <div className="absolute left-0 w-12 h-12 rounded-full bg-lifestyle-blue/10 flex items-center justify-center z-10">
                          <Clock size={16} className="text-lifestyle-blue" />
                        </div>
                        
                        <div className="p-3 rounded-lg bg-white/40 dark:bg-gray-800/40">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={routine.completed}
                                onChange={() => handleToggleRoutine(routine)}
                                className="rounded text-lifestyle-blue focus:ring-lifestyle-blue h-4 w-4"
                              />
                              <div className={routine.completed ? "line-through text-muted-foreground" : ""}>
                                <div className="font-medium">{routine.title}</div>
                                <div className="text-xs text-muted-foreground">
                                  {formatTime(routine.time)} • {routine.duration} min
                                </div>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleDeleteRoutine(routine.id)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card className="card-gradient card-hover">
            <CardContent className="py-10 text-center">
              <p className="text-muted-foreground">You haven't added any routines yet.</p>
              <p className="text-sm mt-1">Add your first routine above to start organizing your day!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RoutineBuilder;

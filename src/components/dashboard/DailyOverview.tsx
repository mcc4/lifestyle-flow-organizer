
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, ListChecks, Bed } from 'lucide-react';
import { useUserData } from '@/context/UserDataContext';
import { formatTime, getNextEvents, getProgressPercentage } from '@/utils/timeUtils';
import ProgressCircle from '@/components/ui/ProgressCircle';
import { Link } from 'react-router-dom';

const DailyOverview = () => {
  const { userData, todayGoals, todayMeals, todayRoutines, updateGoal, updateMeal, updateRoutineStep } = useUserData();
  const goals = todayGoals();
  const meals = todayMeals();
  const routines = todayRoutines();
  
  const completedGoals = goals.filter(goal => goal.completed).length;
  const completedMeals = meals.filter(meal => meal.completed).length;
  const completedRoutines = routines.filter(routine => routine.completed).length;
  
  const goalsProgress = getProgressPercentage(completedGoals, goals.length);
  const mealsProgress = getProgressPercentage(completedMeals, meals.length);
  const routinesProgress = getProgressPercentage(completedRoutines, routines.length);
  
  const nextEvents = getNextEvents(routines.map(r => ({ time: r.time, title: r.title })));
  
  const toggleGoalCompleted = (goal: any) => {
    updateGoal({ ...goal, completed: !goal.completed });
  };
  
  const toggleMealCompleted = (meal: any) => {
    updateMeal({ ...meal, completed: !meal.completed });
  };
  
  const toggleRoutineCompleted = (routine: any) => {
    updateRoutineStep({ ...routine, completed: !routine.completed });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-gradient card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <ListChecks size={18} className="text-lifestyle-purple" />
              Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {completedGoals}/{goals.length} <span className="text-sm font-normal text-muted-foreground">completed</span>
              </div>
              <ProgressCircle percentage={goalsProgress} size={60} progressColor="rgb(114, 9, 183)">
                <span className="font-semibold text-sm">{goalsProgress}%</span>
              </ProgressCircle>
            </div>
            <Link to="/goals">
              <Button variant="outline" className="w-full mt-4">View Goals</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="card-gradient card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar size={18} className="text-lifestyle-blue" />
              Meals Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {completedMeals}/{meals.length} <span className="text-sm font-normal text-muted-foreground">completed</span>
              </div>
              <ProgressCircle percentage={mealsProgress} size={60} progressColor="rgb(67, 97, 238)">
                <span className="font-semibold text-sm">{mealsProgress}%</span>
              </ProgressCircle>
            </div>
            <Link to="/meals">
              <Button variant="outline" className="w-full mt-4">View Meals</Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="card-gradient card-hover">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock size={18} className="text-lifestyle-teal" />
              Routines Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-2xl font-bold">
                {completedRoutines}/{routines.length} <span className="text-sm font-normal text-muted-foreground">completed</span>
              </div>
              <ProgressCircle percentage={routinesProgress} size={60} progressColor="rgb(76, 201, 240)">
                <span className="font-semibold text-sm">{routinesProgress}%</span>
              </ProgressCircle>
            </div>
            <Link to="/routines">
              <Button variant="outline" className="w-full mt-4">View Routines</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock size={20} className="text-lifestyle-blue" />
              Coming Up Next
            </CardTitle>
          </CardHeader>
          <CardContent>
            {nextEvents.length > 0 ? (
              <ul className="space-y-4">
                {nextEvents.map((event, index) => (
                  <li key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{formatTime(event.time)}</p>
                    </div>
                    <Button variant="outline" size="sm">Remind</Button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-6 text-muted-foreground">
                <p>No upcoming events</p>
                <Link to="/routines" className="text-sm underline mt-2 inline-block">
                  Add some routines
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bed size={20} className="text-lifestyle-purple" />
              Sleep Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Bedtime</p>
                  <p className="text-lg font-semibold">{formatTime(userData.profile.sleepTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wake up</p>
                  <p className="text-lg font-semibold">{formatTime(userData.profile.wakeTime)}</p>
                </div>
              </div>
              <div className="pt-2">
                <Link to="/sleep">
                  <Button variant="outline" className="w-full">Sleep Details</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle>Today's Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-semibold">Goals</h3>
                <ul className="space-y-2">
                  {goals.slice(0, 3).map((goal) => (
                    <li key={goal.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={goal.completed}
                          onChange={() => toggleGoalCompleted(goal)}
                          className="rounded text-lifestyle-blue focus:ring-lifestyle-blue h-4 w-4"
                        />
                        <span className={goal.completed ? "line-through text-muted-foreground" : ""}>
                          {goal.title}
                        </span>
                      </div>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {goal.category}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Meals</h3>
                <ul className="space-y-2">
                  {meals.slice(0, 3).map((meal) => (
                    <li key={meal.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={meal.completed}
                          onChange={() => toggleMealCompleted(meal)}
                          className="rounded text-lifestyle-blue focus:ring-lifestyle-blue h-4 w-4"
                        />
                        <span className={meal.completed ? "line-through text-muted-foreground" : ""}>
                          {meal.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          {meal.mealType}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(meal.time)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-semibold">Routines</h3>
                <ul className="space-y-2">
                  {routines.slice(0, 3).map((routine) => (
                    <li key={routine.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={routine.completed}
                          onChange={() => toggleRoutineCompleted(routine)}
                          className="rounded text-lifestyle-blue focus:ring-lifestyle-blue h-4 w-4"
                        />
                        <span className={routine.completed ? "line-through text-muted-foreground" : ""}>
                          {routine.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-muted px-2 py-1 rounded-full">
                          {routine.category}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(routine.time)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DailyOverview;

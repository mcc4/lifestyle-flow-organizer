
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SliderProps } from '@radix-ui/react-slider';
import { Slider } from '@/components/ui/slider';
import { Plus, Star, Trash } from 'lucide-react';
import { useUserData } from '@/context/UserDataContext';
import { formatTime, calculateTotalSleepHours } from '@/utils/timeUtils';

const SleepQualitySlider = (props: SliderProps) => {
  return (
    <Slider
      defaultValue={[3]}
      max={5}
      step={1}
      className="w-full"
      {...props}
    />
  );
};

const SleepTracker = () => {
  const { userData, addSleepLog, deleteSleepLog, updateProfile } = useUserData();
  const { sleepLogs, profile } = userData;
  
  const [bedTime, setBedTime] = useState(profile.sleepTime);
  const [wakeTime, setWakeTime] = useState(profile.wakeTime);
  const [quality, setQuality] = useState<number>(3);
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const handleAddSleepLog = () => {
    addSleepLog({
      date,
      bedTime,
      wakeTime,
      quality,
      notes,
    });
    
    // Reset form
    setQuality(3);
    setNotes('');
    setDate(new Date().toISOString().split('T')[0]);
  };
  
  const handleDeleteLog = (id: string) => {
    deleteSleepLog(id);
  };
  
  const handleUpdatePreferences = () => {
    updateProfile({
      ...profile,
      sleepTime: bedTime,
      wakeTime: wakeTime,
    });
  };
  
  const renderQualityStars = (quality: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star 
        key={i}
        size={16} 
        className={i < quality ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="text-xl">Sleep Schedule</CardTitle>
            <CardDescription>Set your preferred sleep and wake times</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bedTime">Bedtime</Label>
                <Input
                  id="bedTime"
                  type="time"
                  value={bedTime}
                  onChange={(e) => setBedTime(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wakeTime">Wake Time</Label>
                <Input
                  id="wakeTime"
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-center mb-2">
                {calculateTotalSleepHours(bedTime, wakeTime)} hours of sleep
              </p>
            </div>
            
            <Button 
              onClick={handleUpdatePreferences} 
              className="w-full"
            >
              Update Sleep Schedule
            </Button>
          </CardContent>
        </Card>
        
        <Card className="card-gradient card-hover">
          <CardHeader>
            <CardTitle className="text-xl">Log Sleep</CardTitle>
            <CardDescription>Track your sleep quality and patterns</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="quality">Sleep Quality</Label>
                <span className="text-sm">{quality}/5</span>
              </div>
              <SleepQualitySlider
                value={[quality]}
                onValueChange={(value) => setQuality(value[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>Poor</span>
                <span>Good</span>
                <span>Excellent</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="How did you sleep? Any dreams or disturbances?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            
            <Button 
              onClick={handleAddSleepLog} 
              className="w-full"
            >
              <Plus className="mr-2 h-4 w-4" />
              Log Sleep
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="card-gradient card-hover">
        <CardHeader>
          <CardTitle>Sleep Logs</CardTitle>
          <CardDescription>Your recent sleep records</CardDescription>
        </CardHeader>
        <CardContent>
          {sleepLogs.length > 0 ? (
            <div className="space-y-4">
              {sleepLogs
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((log) => (
                <div 
                  key={log.id} 
                  className="p-4 rounded-lg bg-white/40 dark:bg-gray-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{new Date(log.date).toLocaleDateString()}</span>
                      <div className="flex">{renderQualityStars(log.quality)}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {formatTime(log.bedTime)} - {formatTime(log.wakeTime)} 
                      ({calculateTotalSleepHours(log.bedTime, log.wakeTime)} hours)
                    </div>
                    {log.notes && (
                      <div className="text-sm mt-2 bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        {log.notes}
                      </div>
                    )}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteLog(log.id)}
                    className="text-gray-500 hover:text-red-500 self-start sm:self-center"
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No sleep logs yet.</p>
              <p className="text-sm mt-1">Start logging your sleep to track your patterns!</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card className="card-gradient card-hover">
        <CardHeader>
          <CardTitle>Sleep Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-lifestyle-blue mt-1.5 mr-2 flex-shrink-0"></div>
              <span>Maintain a consistent sleep schedule, even on weekends.</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-lifestyle-purple mt-1.5 mr-2 flex-shrink-0"></div>
              <span>Create a relaxing bedtime routine to signal your body it's time to sleep.</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-lifestyle-teal mt-1.5 mr-2 flex-shrink-0"></div>
              <span>Keep your bedroom cool, dark, and quiet for optimal sleep.</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-lifestyle-pink mt-1.5 mr-2 flex-shrink-0"></div>
              <span>Limit screen time at least 1 hour before bed to reduce blue light exposure.</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 rounded-full bg-lifestyle-indigo mt-1.5 mr-2 flex-shrink-0"></div>
              <span>Avoid caffeine, alcohol, and large meals close to bedtime.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTracker;

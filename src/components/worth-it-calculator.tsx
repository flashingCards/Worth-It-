"use client"

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { add, format } from 'date-fns';
import { Settings, Wallet, ShoppingCart, Calendar as CalendarIcon, Sparkles } from 'lucide-react';

import useLocalStorage from '@/hooks/use-local-storage';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { ThemeToggle } from '@/components/theme-toggle';

const formSchema = z.object({
  salary: z.coerce.number().positive({ message: "Salary must be a positive number." }).min(1, "Salary is required."),
  productPrice: z.coerce.number().positive({ message: "Price must be a positive number." }).min(1, "Product price is required."),
  startDate: z.date().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type Result = {
  days: number;
  completionDate: Date | null;
};

export default function WorthItCalculator() {
  const [salaryType, setSalaryType] = useLocalStorage<"annual" | "monthly">("salaryType", "annual");
  const [workDaysPerWeek, setWorkDaysPerWeek] = useLocalStorage<number>("workDaysPerWeek", 5);
  const [workHoursPerDay, setWorkHoursPerDay] = useLocalStorage<number>("workHoursPerDay", 8);
  const [result, setResult] = useState<Result | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salary: '' as any,
      productPrice: '' as any,
      startDate: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    const annualSalary = salaryType === 'monthly' ? values.salary * 12 : values.salary;
    const dailySalary = annualSalary / (workDaysPerWeek * 52);

    if (dailySalary <= 0) {
      setResult(null);
      return;
    }
    
    const daysToAfford = values.productPrice / dailySalary;
    
    let completionDate: Date | null = null;
    if (values.startDate) {
      const calendarDaysToAdd = Math.ceil(daysToAfford * (7 / workDaysPerWeek));
      completionDate = add(values.startDate, { days: calendarDaysToAdd });
    }
    
    setResult({ days: daysToAfford, completionDate });
  }

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/20 rounded-full p-3 w-fit mb-2">
            <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="text-3xl font-bold">Worth It?</CardTitle>
        <CardDescription className="text-lg">Find out how long you need to work for that new gadget.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Salary</FormLabel>
                    <div className="relative w-full">
                       <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <FormControl>
                          <Input type="number" placeholder="60000" {...field} className="pl-10" />
                       </FormControl>
                    </div>
                     <Tabs value={salaryType} onValueChange={(value) => setSalaryType(value as "annual" | "monthly")} className="w-full pt-2">
                      <TabsList className="w-full">
                        <TabsTrigger value="annual" className="w-full">Annual</TabsTrigger>
                        <TabsTrigger value="monthly" className="w-full">Monthly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                     <div className="relative">
                        <ShoppingCart className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <FormControl>
                          <Input type="number" placeholder="1200" {...field} className="pl-10" />
                        </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Optional: Start Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date to estimate completion</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setDate(new Date().getDate()-1))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full text-base font-bold" size="lg">
              <Sparkles className="mr-2 h-5 w-5" />
              Calculate
            </Button>
          </form>
        </Form>
      </CardContent>
      {result && (
        <CardFooter>
          <div className="w-full text-center p-6 bg-primary/10 rounded-lg animate-in fade-in zoom-in-95 duration-500">
            <p className="text-lg">You need to work for</p>
            <p className="text-5xl font-bold text-primary my-2">{result.days.toFixed(2)}</p>
            <p className="text-lg"><span className="text-primary font-bold">days</span> to afford this product.</p>
            {result.completionDate && (
              <p className="text-sm text-muted-foreground mt-4">
                If you start now, your estimated completion date is <span className="font-semibold">{format(result.completionDate, 'PPP')}</span>.
              </p>
            )}
          </div>
        </CardFooter>
      )}
       <div className="absolute top-4 right-4 flex items-center gap-2">
          <ThemeToggle />
          <Sheet open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Settings</SheetTitle>
                <SheetDescription>
                  Adjust your work schedule to get a more accurate calculation. Your changes are saved automatically.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-8 py-8">
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <Label htmlFor="work-days">Work Days per Week</Label>
                       <span className="font-bold text-lg text-primary">{workDaysPerWeek}</span>
                    </div>
                    <Slider
                      id="work-days"
                      min={1}
                      max={7}
                      step={1}
                      value={[workDaysPerWeek]}
                      onValueChange={([value]) => setWorkDaysPerWeek(value)}
                    />
                 </div>
                 <div className="space-y-4">
                    <div className="flex justify-between items-center">
                       <Label htmlFor="work-hours">Work Hours per Day</Label>
                       <span className="font-bold text-lg text-primary">{workHoursPerDay}</span>
                    </div>
                    <Slider
                      id="work-hours"
                      min={1}
                      max={16}
                      step={1}
                      value={[workHoursPerDay]}
                      onValueChange={([value]) => setWorkHoursPerDay(value)}
                    />
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
    </Card>
  );
}

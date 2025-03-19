import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const newsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

type NewsletterFormValues = z.infer<typeof newsletterSchema>;

export default function NewsletterSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: ''
    }
  });
  
  const { mutate: subscribe, isPending } = useMutation({
    mutationFn: async (values: NewsletterFormValues) => {
      return apiRequest('POST', '/api/subscribe', values);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been successfully subscribed to our newsletter.",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  function onSubmit(values: NewsletterFormValues) {
    subscribe(values);
  }
  
  return (
    <section className="py-16 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-bold text-3xl md:text-4xl mb-4">
            Stay <span className="bg-gradient-to-r from-[#8A2BE2] via-[#1E90FF] to-[#FF1493] bg-clip-text text-transparent">Illuminated</span>
          </h2>
          <p className="text-white/70 mb-8">
            Subscribe to our newsletter for exclusive deals, design inspiration, and new product alerts.
          </p>
          
          {isSubmitted ? (
            <div className="py-8 px-6 bg-[#8A2BE2]/10 rounded-lg max-w-md mx-auto">
              <h3 className="text-xl font-medium mb-2 text-white">Thanks for subscribing!</h3>
              <p className="text-white/70">
                Keep an eye on your inbox for exclusive offers and lighting inspiration.
              </p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your email address"
                          className="bg-gray-800/20 border border-gray-800/50 rounded-lg py-3 px-4 text-white placeholder:text-white/50 focus:border-[#8A2BE2] transition-colors"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#8A2BE2] to-[#1E90FF] text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-300 whitespace-nowrap"
                  disabled={isPending}
                >
                  {isPending ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </Form>
          )}
          
          <p className="text-xs text-white/50 mt-4">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
          </p>
        </div>
      </div>
    </section>
  );
}

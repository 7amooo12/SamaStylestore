import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { FaWhatsapp, FaFacebookF, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: ContactFormValues) {
    // This would typically submit to an API endpoint
    console.log(values);
    toast({
      title: "Message sent!",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12 px-4"
    >
      <div className="grid lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
              Contact Us
            </h1>
            <p className="text-gray-400 mt-4 max-w-md">
              Have questions about our products or need assistance? We're here to help. Fill out the form and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full"
              >
                <FaMapMarkerAlt className="text-white text-lg" />
              </motion.div>
              <div>
                <h3 className="text-lg font-medium">Our Location</h3>
                <p className="text-gray-400">123 Lighting Blvd, New York, NY 10001</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-full"
              >
                <FaPhone className="text-white text-lg" />
              </motion.div>
              <div>
                <h3 className="text-lg font-medium">Phone Number</h3>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-pink-500 to-blue-500 p-3 rounded-full"
              >
                <FaEnvelope className="text-white text-lg" />
              </motion.div>
              <div>
                <h3 className="text-lg font-medium">Email</h3>
                <p className="text-gray-400">contact@samalighting.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-full"
              >
                <FaClock className="text-white text-lg" />
              </motion.div>
              <div>
                <h3 className="text-lg font-medium">Store Hours</h3>
                <p className="text-gray-400">Monday - Friday: 9AM - 7PM<br />Saturday: 10AM - 6PM<br />Sunday: Closed</p>
              </div>
            </div>
            
            <h3 className="text-xl font-medium mt-8 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                className="bg-gradient-to-br from-green-500 to-green-600 p-3 rounded-full inline-flex items-center justify-center"
              >
                <FaWhatsapp className="text-white text-2xl" />
              </motion.a>
              
              <motion.a
                href="https://facebook.com/samalighting" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                className="bg-gradient-to-br from-blue-600 to-blue-700 p-3 rounded-full inline-flex items-center justify-center"
              >
                <FaFacebookF className="text-white text-2xl" />
              </motion.a>
              
              <motion.a
                href="tel:+15551234567"
                whileHover={{ scale: 1.15, y: -5 }}
                className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full inline-flex items-center justify-center"
              >
                <FaPhone className="text-white text-2xl" />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-xl p-6 md:p-8 shadow-xl backdrop-blur-sm border border-gray-700/50">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Your email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Your phone number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="How can we help you?"
                        className="resize-none min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:from-purple-600 hover:via-blue-600 hover:to-pink-600 transition-all duration-300"
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </motion.div>
  );
}
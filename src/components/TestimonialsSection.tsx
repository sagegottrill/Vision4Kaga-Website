import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const defaultTestimonials = [
  {
    id: 1,
    name: "Alhaji Ibrahim Garba",
    title: "Traditional Leader",
    location: "Kaga Central",
    content: "Hon. Zannah Lawan Ajimi has demonstrated exceptional leadership qualities and genuine commitment to our community's development.",
    rating: 5
  },
  {
    id: 2,
    name: "Dr. Fatima Mohammed",
    title: "Education Specialist",
    location: "Mainok Ward",
    content: "His vision for education transformation aligns perfectly with our community's needs. We trust his ability to deliver.",
    rating: 5
  },
  {
    id: 3,
    name: "Engr. Musa Bello",
    title: "Youth Representative",
    location: "Benisheikh",
    content: "Finally, a leader who understands the challenges facing our youth and has concrete plans to address them.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load approved endorsements from Supabase
    const loadEndorsements = async () => {
      try {
        const { data, error } = await supabase
          .from('endorsements')
          .select('*')
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data && data.length > 0) {
          const formattedApproved = data.map((e: any) => ({
            id: e.id,
            name: e.name,
            title: e.title,
            location: e.location,
            content: e.content,
            rating: 5
          }));
          
          setTestimonials([...defaultTestimonials, ...formattedApproved]);
        }
      } catch (err) {
        console.error('Error loading endorsements:', err);
      }
    };

    loadEndorsements();
    
    // Poll for new approved endorsements every 10 seconds
    const interval = setInterval(() => {
      loadEndorsements();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('testimonials');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4">Community Endorsements</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by leaders, respected by the community, committed to transformation
          </p>
        </div>

        <div className="relative">
          <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-6 h-6 text-yellow-400 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 text-center mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div className="text-center">
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-blue-900 font-medium">
                    {testimonials[currentTestimonial].title}
                    {testimonials[currentTestimonial].location && ` • ${testimonials[currentTestimonial].location}`}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-green-600 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

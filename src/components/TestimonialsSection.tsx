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
  },
  {
    id: 4,
    name: "Mohammed Mala",
    title: "Community Member",
    location: "Kaga",
    content: "I wholeheartedly endorse Zanna Lawan Ajimi. Having worked directly with him, I can attest that he is an exceptional choice. Zanna is hardworking, honest, and incredibly humble.",
    rating: 5
  },
  {
    id: 5,
    name: "Mala lawan Ngamdu",
    title: "Community Member",
    location: "Ngamdu",
    content: "I endorse our incoming Chairman of Kaga Local Government Area based on his clear commitment to effective leadership, transparency, and tangible development. During our engagement, he demonstrated a strong understanding of the challenges facing our communities and presented practical strategies to address them. His focus on improving administrative structures, enhancing service delivery, and investing in infrastructural growth shows a leader who is ready to work, not just talk. I am particularly encouraged by his readiness to support dry season farming, empower local farmers, and strengthen economic opportunities across the LGA. His vision for a more organized, efficient, and people-centered local government aligns with the progress we all want for Kaga. For these reasons, and because I believe in his capacity to deliver meaningful, sustainable development, I proudly endorse him.",
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState(defaultTestimonials);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
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
    const interval = setInterval(loadEndorsements, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')]"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Voices of Kaga
          </h2>
          <div className="w-24 h-1 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 place-items-center min-h-[400px]">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`col-start-1 row-start-1 w-full transition-all duration-700 ease-in-out transform ${index === currentTestimonial
                  ? 'opacity-100 translate-x-0 scale-100 relative z-10'
                  : 'opacity-0 translate-x-8 scale-95 pointer-events-none absolute z-0'
                }`}
            >
              <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8 text-green-600 opacity-20">
                  <svg className="w-20 h-20 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.054 15.331 15.254 16.705 15.024C16.212 15.762 15.179 16.987 14.509 17.323C13.97 17.595 13.03 17.763 12.383 17.297C11.732 16.827 11.848 15.582 12.313 14.697C12.959 13.477 14.85 11.533 16.57 11.533C18.266 11.533 19.333 12.919 19.333 14.879C19.333 17.958 16.026 21 14.017 21ZM6.196 21L6.196 18C6.196 16.054 7.51 15.254 8.884 15.024C8.391 15.762 7.358 16.987 6.688 17.323C6.149 17.595 5.209 17.763 4.562 17.297C3.911 16.827 4.027 15.582 4.492 14.697C5.138 13.477 7.029 11.533 8.749 11.533C10.445 11.533 11.512 12.919 11.512 14.879C11.512 17.958 8.205 21 6.196 21Z" />
                  </svg>
                </div>

                <p className="text-2xl md:text-3xl font-serif text-gray-800 leading-relaxed mb-10">
                  "{testimonial.content}"
                </p>

                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mb-4 overflow-hidden border-2 border-green-600 p-1">
                    <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xl font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-green-600 font-medium tracking-wide uppercase text-sm mt-1">
                    {testimonial.title}
                  </p>
                  {testimonial.location && (
                    <p className="text-gray-500 text-sm mt-1">{testimonial.location}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-12 space-x-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentTestimonial ? 'w-12 bg-green-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useEffect, useState, useCallback } from "react";
import {
  MapPin,
  Phone,
  MessageCircle,
  Calendar,
  Users,
  Building,
  CheckCircle2,
  Wind,
  Speaker,
  Utensils,
  Car,
  Shield,
  Lightbulb,
  Droplets,
  Flame,
  ArrowRight,
  Menu,
  X,
  PartyPopper,
  Briefcase,
  GraduationCap,
  Landmark,
  ChevronLeft,
  ChevronRight,
  Maximize2,
} from "lucide-react";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  className = "",
}) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

const ParallaxImage = ({ src, alt, className = "" }: { src: string, alt: string, className?: string }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img
        style={{ y, scale: 1.15 }}
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 1000], [1, 1.1]);

  const galleryImages = [
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80", title: "Wedding Setups", className: "lg:col-span-2 lg:row-span-2 min-h-[300px] lg:min-h-[600px]" },
    { src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80", title: "Corporate Events", className: "h-[300px]" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80", title: "Exhibitions", className: "h-[300px]" },
    { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80", title: "Decorations", className: "h-[300px]" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80", title: "Hall Interiors", className: "lg:col-span-2 h-[300px]" },
  ];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
    }
  }, [lightboxIndex, galleryImages.length]);
  
  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  }, [lightboxIndex, galleryImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Events", id: "events" },
    { name: "Spaces", id: "spaces" },
    { name: "Facilities", id: "facilities" },
    { name: "Pricing", id: "pricing" },
    { name: "Gallery", id: "gallery" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-royal-950 text-slate-50 font-sans selection:bg-gold-500/30 selection:text-gold-300">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? "bg-royal-950/80 backdrop-blur-lg border-b border-white/5 py-4 shadow-lg shadow-black/20" : "bg-gradient-to-b from-royal-950/80 to-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div
            className="text-2xl font-serif font-bold tracking-wider text-white cursor-pointer relative z-50"
            onClick={() => scrollTo("home")}
          >
            AMARAVATHI<span className="text-gold-400">.</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-sm font-medium text-slate-300 hover:text-gold-400 transition-colors uppercase tracking-widest"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-royal-950 font-semibold rounded-sm transition-colors text-sm uppercase tracking-wider"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-white p-2 -mr-2 rounded-full hover:bg-white/10 transition-colors relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-royal-950/95 backdrop-blur-xl pt-24 px-6 flex flex-col space-y-6 lg:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-2xl font-serif text-left text-slate-200 hover:text-gold-400 transition-colors"
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-8 px-6 py-4 bg-gold-500 hover:bg-gold-400 text-royal-950 font-semibold rounded-sm transition-colors text-lg uppercase tracking-wider w-full"
            >
              Book Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-royal-950/60 via-royal-950/40 to-royal-950 z-10" />
          <img
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80"
            alt="Elegant convention hall"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-gold-400 uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6">
              A Premium Event Venue in the Heart of Vijayawada
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium leading-tight mb-8 text-white">
              Amaravathi <br />
              <span className="italic text-slate-300">Conventions</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
              Located on Bandar Road, just 1 km from the bus and railway
              stations. With elegant interiors, spacious halls, and premium
              facilities, it is the perfect destination for weddings,
              exhibitions, corporate conferences, and celebrations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button
                onClick={() => scrollTo("contact")}
                className="w-full sm:w-auto px-8 py-4 bg-gold-500 hover:bg-gold-400 text-royal-950 font-semibold rounded-sm transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
              >
                Book an Event <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("spaces")}
                className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 hover:border-white hover:bg-white/5 text-white font-semibold rounded-sm transition-all text-sm uppercase tracking-wider"
              >
                View Venue
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <div className="relative">
                <div className="absolute -inset-4 border border-gold-500/20 rounded-sm transform translate-x-4 translate-y-4" />
                <ParallaxImage
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80"
                  alt="Event Hall"
                  className="relative z-10 w-full h-[600px] rounded-sm grayscale-[20%]"
                />
                <div className="absolute bottom-8 -right-8 z-20 bg-royal-900 border border-white/10 p-8 rounded-sm shadow-2xl hidden md:block">
                  <div className="text-5xl font-serif text-gold-400 mb-2">
                    8+
                  </div>
                  <div className="text-sm uppercase tracking-widest text-slate-400">
                    Events Hosted
                    <br />
                    Per Month
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">
                Elegance Meets{" "}
                <span className="italic text-gold-400">Convenience</span>
              </h2>
              <div className="space-y-6 text-slate-300 font-light text-lg leading-relaxed">
                <p>
                  Amaravathi Conventions is designed to host a wide range of
                  events with comfort, elegance, and convenience. Located on the
                  main road in Vijayawada, the venue is easily accessible for
                  guests traveling from across the city.
                </p>
                <p>
                  The venue offers spacious event areas, modern amenities, and
                  customizable event packages, making it ideal for both grand
                  celebrations and professional gatherings.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                <div>
                  <div className="text-gold-400 mb-2">
                    <MapPin size={24} />
                  </div>
                  <h4 className="text-white font-medium mb-1">
                    Prime Location
                  </h4>
                  <p className="text-sm text-slate-400">Heart of Vijayawada</p>
                </div>
                <div>
                  <div className="text-gold-400 mb-2">
                    <Building size={24} />
                  </div>
                  <h4 className="text-white font-medium mb-1">
                    Spacious Halls
                  </h4>
                  <p className="text-sm text-slate-400">For large gatherings</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Events We Host */}
      <section id="events" className="py-24 bg-royal-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Events We <span className="italic text-gold-400">Host</span>
            </h2>
            <p className="text-slate-400">
              From intimate gatherings to grand celebrations, our versatile
              spaces adapt to your unique vision.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Weddings & Receptions",
                icon: <PartyPopper size={24} />,
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80",
                desc: "Elegant spaces for your special day."
              },
              { 
                title: "Exhibitions & Expos", 
                icon: <Building size={24} />,
                image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80",
                desc: "Spacious halls for showcases."
              },
              { 
                title: "Corporate Conferences", 
                icon: <Briefcase size={24} />,
                image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80",
                desc: "Professional setups for meetings."
              },
              { 
                title: "Birthday Parties", 
                icon: <PartyPopper size={24} />,
                image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80",
                desc: "Fun and vibrant celebration areas."
              },
              { 
                title: "Cultural Events", 
                icon: <Users size={24} />,
                image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80",
                desc: "Versatile stages for performances."
              },
              { 
                title: "Product Launches", 
                icon: <Lightbulb size={24} />,
                image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80",
                desc: "Impactful venues for new reveals."
              },
              { 
                title: "College Fests", 
                icon: <GraduationCap size={24} />,
                image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80",
                desc: "Large capacity for student gatherings."
              },
              { 
                title: "Government Events", 
                icon: <Landmark size={24} />,
                image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80",
                desc: "Secure and formal environments."
              },
              { 
                title: "Ceremonies", 
                icon: <CheckCircle2 size={24} />,
                image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80",
                desc: "Memorable settings for milestones."
              },
            ].map((event, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-sm border border-white/5 bg-royal-950/50 hover:border-gold-500/30 transition-all duration-500 h-[280px]">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-950 via-royal-950/80 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  <div className="relative h-full p-8 flex flex-col justify-end">
                    <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-110 group-hover:bg-gold-500 group-hover:text-royal-950 transition-all duration-500">
                      {event.icon}
                    </div>
                    <h3 className="text-xl font-serif text-white mb-2 group-hover:text-gold-400 transition-colors duration-300">
                      {event.title}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="text-slate-400 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">
                        {event.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Venue Spaces */}
      <section id="spaces" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Venue <span className="italic text-gold-400">Spaces</span>
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Thoughtfully designed areas to accommodate your guests
              comfortably, whether they are dining or celebrating.
            </p>
          </FadeIn>

          <div className="grid lg:grid-cols-2 gap-12">
            <FadeIn
              delay={0.1}
              className="bg-royal-900 border border-white/5 p-8 md:p-12 rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-3xl font-serif mb-4 text-white">Main Hall</h3>
              <p className="text-slate-400 mb-8 font-light">
                Spacious event hall suitable for weddings, conferences, and
                large gatherings.
              </p>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-300 uppercase tracking-wider text-sm">
                    Area
                  </span>
                  <span className="font-mono text-gold-400 text-lg">
                    8,000 sq ft
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-300 uppercase tracking-wider text-sm">
                    Seating Capacity
                  </span>
                  <span className="font-mono text-white text-lg">400</span>
                </div>
                <div className="flex justify-between items-center pb-4">
                  <span className="text-slate-300 uppercase tracking-wider text-sm">
                    Standing Capacity
                  </span>
                  <span className="font-mono text-white text-lg">700</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.2}
              className="bg-royal-900 border border-white/5 p-8 md:p-12 rounded-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <h3 className="text-3xl font-serif mb-4 text-white">
                Dining & Canopy
              </h3>
              <p className="text-slate-400 mb-8 font-light">
                Dedicated dining area for catering and guest dining with an
                extended canopy.
              </p>

              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-300 uppercase tracking-wider text-sm">
                    Canopy Area
                  </span>
                  <span className="font-mono text-gold-400 text-lg">
                    5,000 sq ft
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-slate-300 uppercase tracking-wider text-sm">
                    Purpose
                  </span>
                  <span className="text-white text-right">
                    Catering & Dining
                  </span>
                </div>
                <div className="flex justify-between items-center pb-4">
                  <span className="text-slate-300 uppercase tracking-wider text-sm">
                    Setup
                  </span>
                  <span className="text-white text-right">Customizable</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="py-24 bg-royal-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Premium <span className="italic text-gold-400">Facilities</span>
            </h2>
            <p className="text-slate-400">
              Everything you need for a seamless and memorable event experience.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-12 gap-x-6">
            {[
              { name: "Air Conditioning", icon: <Wind size={28} /> },
              { name: "Stage & Sound", icon: <Speaker size={28} /> },
              { name: "In-house Catering", icon: <Utensils size={28} /> },
              { name: "External Catering", icon: <Utensils size={28} /> },
              { name: "Valet Parking", icon: <Car size={28} /> },
              { name: "Ample Parking", icon: <Car size={28} /> },
              { name: "Bridal Room", icon: <Users size={28} /> },
              { name: "Green Room", icon: <Users size={28} /> },
              { name: "Generator Backup", icon: <Lightbulb size={28} /> },
              { name: "Lift Access", icon: <Building size={28} /> },
              { name: "Wheelchair Access", icon: <Users size={28} /> },
              { name: "CCTV & Security", icon: <Shield size={28} /> },
              { name: "Decoration Services", icon: <PartyPopper size={28} /> },
              { name: "Lighting Setup", icon: <Lightbulb size={28} /> },
              { name: "RO Water Plant", icon: <Droplets size={28} /> },
              { name: "Fire Safety", icon: <Flame size={28} /> },
            ].map((facility, i) => (
              <FadeIn
                key={i}
                delay={i * 0.05}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-royal-950 border border-white/10 flex items-center justify-center text-gold-500/70 group-hover:text-gold-400 group-hover:border-gold-500/30 transition-all duration-300 mb-4">
                  {facility.icon}
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                  {facility.name}
                </span>
              </FadeIn>
            ))}
          </div>

          <FadeIn
            delay={0.4}
            className="mt-20 pt-12 border-t border-white/10 text-center"
          >
            <p className="text-slate-400 text-sm uppercase tracking-widest mb-6">
              Additional Inclusions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Chairs",
                "Chair Covers",
                "Dining Tables",
                "Kitchen",
                "Utensils",
              ].map((item, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-royal-950 border border-white/5 rounded-full text-sm text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Why Choose Us & Pricing */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Why Choose Us */}
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">
                Why Choose <br />
                <span className="italic text-gold-400">Amaravathi</span>
              </h2>
              <div className="space-y-6">
                {[
                  "Located in the heart of Vijayawada",
                  "Just 1 km from bus station and railway station",
                  "Excellent interiors and ambiance",
                  "Budget friendly event venue",
                  "Spacious halls for large events",
                  "Flexible and customizable event packages",
                ].map((reason, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="mt-1 text-gold-500">
                      <CheckCircle2 size={20} />
                    </div>
                    <p className="text-slate-300 text-lg font-light">
                      {reason}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Pricing */}
            <FadeIn
              delay={0.2}
              className="bg-gradient-to-br from-gold-900/20 to-royal-900 border border-gold-500/20 p-8 md:p-12 rounded-sm"
            >
              <h3 className="text-2xl font-serif mb-2 text-white">
                Event Packages
              </h3>
              <p className="text-slate-400 mb-8 font-light">
                Customizable packages tailored to your needs.
              </p>

              <div className="mb-10">
                <div className="text-sm uppercase tracking-widest text-gold-400 mb-2">
                  Approximate Range
                </div>
                <div className="text-4xl md:text-5xl font-serif text-white">
                  ₹1.5L{" "}
                  <span className="text-2xl text-slate-400 font-sans font-light">
                    – ₹2.5L
                  </span>
                </div>
                <div className="text-slate-400 mt-2 text-sm">per event</div>
              </div>

              <div className="space-y-4 mb-10">
                <div className="text-sm uppercase tracking-widest text-slate-300 mb-4">
                  Packages May Include
                </div>
                {[
                  "Hall booking",
                  "Catering services",
                  "Decoration",
                  "Lighting setup",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                    {item}
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollTo("contact")}
                className="w-full py-4 bg-gold-500 hover:bg-gold-400 text-royal-950 font-semibold rounded-sm transition-colors uppercase tracking-wider text-sm"
              >
                Request a Quote
              </button>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-24 bg-royal-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">
              Moments at{" "}
              <span className="italic text-gold-400">Amaravathi</span>
            </h2>
            <p className="text-slate-400">
              A glimpse into the beautiful events hosted at our venue.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, index) => (
              <FadeIn key={index} delay={index * 0.1} className={img.className}>
                <div 
                  className="relative group overflow-hidden h-full w-full rounded-sm cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 lg:p-8">
                    <span className="text-white font-serif text-xl lg:text-2xl">{img.title}</span>
                  </div>
                  <div className="absolute top-4 right-4 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 size={18} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-serif mb-2">
                Upcoming <span className="italic text-gold-400">Bookings</span>
              </h2>
              <p className="text-slate-400 font-light">
                Check our availability for your next event.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="flex flex-wrap gap-4">
              {["March 8", "March 15", "March 17"].map((date, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-6 py-4 bg-royal-900 border border-white/10 rounded-sm"
                >
                  <Calendar size={20} className="text-gold-500" />
                  <span className="text-white font-medium">{date}</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wider ml-2">
                    Booked
                  </span>
                </div>
              ))}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-royal-950 z-0" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <FadeIn>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">
                Get in <span className="italic text-gold-400">Touch</span>
              </h2>
              <p className="text-slate-300 mb-12 font-light text-lg">
                Ready to host your unforgettable event? Contact us today to
                check availability, discuss packages, and schedule a venue tour.
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-royal-900 border border-white/10 flex items-center justify-center text-gold-400 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-2 uppercase tracking-widest text-sm">
                      Location
                    </h4>
                    <p className="text-slate-400 font-light leading-relaxed">
                      Above Vijaya Krishna Super Bazar
                      <br />
                      Near Ragavaiah Park, Bandar Road
                      <br />
                      Vijayawada – 520002
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:+910000000000"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-royal-900 hover:bg-royal-800 border border-white/10 text-white font-semibold rounded-sm transition-colors uppercase tracking-wider text-sm"
                >
                  <Phone size={18} /> Call Now
                </a>
                <a
                  href="https://wa.me/910000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold rounded-sm transition-colors uppercase tracking-wider text-sm"
                >
                  <MessageCircle size={18} /> WhatsApp Booking
                </a>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.2}
              className="h-[400px] lg:h-auto min-h-[400px] rounded-sm overflow-hidden border border-white/10 relative"
            >
              {/* Placeholder for Google Maps iframe */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.420822607993!2d80.6277051!3d16.5048639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35effa11111111%3A0x1111111111111111!2sBandar%20Rd%2C%20Vijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1611111111111!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(90%) contrast(80%)",
                }}
                allowFullScreen={true}
                loading="lazy"
                title="Google Maps Location"
                className="absolute inset-0"
              ></iframe>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-royal-950/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-50"
            >
              <X size={36} />
            </button>
            
            <button 
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-50"
            >
              <ChevronLeft size={28} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-50"
            >
              <ChevronRight size={28} />
            </button>

            <div className="w-full max-w-6xl px-4 md:px-16 max-h-[90vh] flex flex-col items-center justify-center relative">
              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                src={galleryImages[lightboxIndex].src} 
                alt={galleryImages[lightboxIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-sm shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-center"
              >
                <h3 className="text-2xl font-serif text-white">{galleryImages[lightboxIndex].title}</h3>
                <p className="text-gold-400 text-sm tracking-widest uppercase mt-2">
                  {lightboxIndex + 1} / {galleryImages.length}
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 bg-royal-950 border-t border-white/5 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-2xl font-serif font-bold tracking-wider text-white mb-6">
            AMARAVATHI<span className="text-gold-400">.</span>
          </div>
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Amaravathi Conventions. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

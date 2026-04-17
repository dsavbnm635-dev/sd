import React from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Instagram, Phone, MapPin } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const projects = [
    { title: "Visual Identity", category: "Branding", id: "p1" },
    { title: "Digital Surface", category: "UI/UX", id: "p2" },
    { title: "Abstract Motion", category: "Experimental", id: "p3" },
    { title: "Editorial Flow", category: "Print", id: "p4" },
    { title: "Brand Narrative", category: "Strategy", id: "p5" },
    { title: "Futuristic Design", category: "Concept", id: "p6" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
      <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10">
        <div className="space-y-4">
          <motion.h1 
            className="text-5xl sm:text-7xl md:text-9xl font-sans font-light tracking-tighter"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Sahar <span className="text-magenta">Jafari</span>
          </motion.h1>
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl font-light text-ink/60 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Independent Visual Designer based in <span className="text-black font-medium">Dubai</span>. 
            Focused on creating living digital experiences and resonant brand identities.
          </motion.p>
        </div>
        
        <div className="flex flex-col items-end gap-3 text-sm uppercase tracking-widest font-medium">
          <a href="https://www.behance.net/saharjafari" target="_blank" rel="noopener noreferrer" aria-label="Behance Profile" className="flex items-center gap-2 hover:text-[#FF00FF] transition-colors">
            Behance <ExternalLink size={14} />
          </a>
          <a href="https://www.instagram.com/saharjafari.design" target="_blank" rel="noopener noreferrer" aria-label="Instagram Profile" className="flex items-center gap-2 hover:text-magenta transition-colors">
            Instagram <Instagram size={14} />
          </a>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            whileHover={{ y: -10 }}
            whileTap={{ scale: 0.98 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[4/5] bg-soft-yellow overflow-hidden rounded-2xl relative mb-4">
              <img 
                src={`https://picsum.photos/seed/${project.id}/800/1000`}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-magenta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-2xl font-light tracking-tight">{project.title}</h3>
            <p className="text-sm uppercase tracking-widest text-gray-400 font-medium">{project.category}</p>
          </motion.div>
        ))}
      </div>

      <footer className="mt-40 pt-10 border-t border-ink/10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest font-bold text-ink/40">Contact</p>
          <a href="https://wa.me/971581945779" className="flex items-center gap-2 text-xl hover:text-magenta transition-colors">
            <Phone size={18} /> +971 58 1945779
          </a>
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest font-bold text-ink/40">Location</p>
          <p className="flex items-center gap-2 text-xl">
            <MapPin size={18} /> Dubai, UAE
          </p>
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-widest font-bold text-ink/40">Social</p>
          <div className="flex gap-6">
            <a href="https://www.instagram.com/saharjafari.design" target="_blank" title="Instagram" aria-label="Instagram"><Instagram className="hover:text-magenta transition-colors" /></a>
            <a href="https://www.behance.net/saharjafari" target="_blank" title="Behance" aria-label="Behance"><ExternalLink className="hover:text-magenta transition-colors" /></a>
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

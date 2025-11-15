"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  X,
  ArrowRight,
  Zap,
  Users,
  TrendingUp,
  Globe,
  Rocket,
  Brain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
interface Startup {
  id: number;
  name: string;
  icon: React.ElementType;
  description: string;
  website: string;
  category: string;
  impact: string;
  team: number;
  growth: string;
}

const startups: Startup[] = [
  {
    id: 1,
    name: "QuantumLeap AI",
    icon: Brain,
    description:
      "Revolutionizing drug discovery with quantum computing and AI.",
    website: "https://quantumleapai.com",
    category: "HealthTech",
    impact: "50+ potential drug candidates identified",
    team: 30,
    growth: "300% YoY",
  },
  {
    id: 2,
    name: "NanoHarvest",
    icon: Zap,
    description:
      "Enhancing crop yields through nanotechnology-based solutions.",
    website: "https://nanoharvest.com",
    category: "AgTech",
    impact: "40% increase in crop yields",
    team: 25,
    growth: "250% YoY",
  },
  {
    id: 3,
    name: "EthicAI",
    icon: Users,
    description: "Developing ethical AI frameworks for responsible innovation.",
    website: "https://ethicai.com",
    category: "AI Ethics",
    impact: "Adopted by 100+ tech companies",
    team: 20,
    growth: "400% YoY",
  },
  {
    id: 4,
    name: "OrbitalEnergy",
    icon: Globe,
    description: "Harnessing solar energy from space for sustainable power.",
    website: "https://orbitalenergy.com",
    category: "CleanTech",
    impact: "1 GW of clean energy transmitted",
    team: 40,
    growth: "350% YoY",
  },
  {
    id: 5,
    name: "NeuroLink",
    icon: Brain,
    description:
      "Advancing brain-computer interfaces for medical applications.",
    website: "https://neurolink.com",
    category: "BioTech",
    impact: "Successful trials in 500+ patients",
    team: 35,
    growth: "275% YoY",
  },
  {
    id: 6,
    name: "HoloArch",
    icon: Rocket,
    description:
      "Transforming architecture with advanced holographic technology.",
    website: "https://holoarch.com",
    category: "AR/VR",
    impact: "Used in 1000+ building designs",
    team: 28,
    growth: "320% YoY",
  },
];

const StartupCard: React.FC<{ startup: Startup; onClick: () => void }> = ({
  startup,
  onClick,
}) => {
  const Icon = startup.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer border border-blue-100"
      onClick={onClick}
    >
      <div className="p-8">
        <Icon className="w-16 h-16 mb-6 text-blue-600" />
        <Badge className="mb-4" variant="outline">
          {startup.category}
        </Badge>
        <h3 className="text-2xl font-bold mb-2 text-blue-600">
          {startup.name}
        </h3>
        <p className="text-gray-600 mb-6">{startup.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center">
            <Zap className="w-4 h-4 mr-1 text-yellow-500" />
            Impact
          </span>
          <span className="flex items-center">
            <Users className="w-4 h-4 mr-1 text-blue-500" />
            Team
          </span>
          <span className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            Growth
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Modal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  startup: Startup | null;
}> = ({ isOpen, onClose, startup }) => (
  <AnimatePresence>
    {isOpen && startup && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-8 max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <startup.icon className="w-20 h-20 text-blue-600" />
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <h2 className="text-4xl font-bold mb-2 text-blue-600">
            {startup.name}
          </h2>
          <Badge className="mb-4" variant="outline">
            {startup.category}
          </Badge>
          <p className="text-xl text-gray-600 mb-6">{startup.description}</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Impact</p>
              <p className="text-lg font-bold text-blue-600">
                {startup.impact}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Team Size</p>
              <p className="text-lg font-bold text-blue-600">{startup.team}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-1">Growth</p>
              <p className="text-lg font-bold text-blue-600">
                {startup.growth}
              </p>
            </div>
          </div>
          <a
            href={startup.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:underline text-lg"
          >
            Visit Website
            <ExternalLink className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Portfolio: React.FC = () => {
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-blue-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-blue-600 mb-4">
            Innovators <span className="text-black">of Tomorrow</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the groundbreaking startups shaping the future of
            technology and solving global challenges through innovation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {startups.map((startup) => (
            <StartupCard
              key={startup.id}
              startup={startup}
              onClick={() => setSelectedStartup(startup)}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Be Part of the Future
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Are you ready to join the ranks of these visionary startups? Apply
            now to our accelerator program and turn your groundbreaking idea
            into reality.
          </p>
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300 text-lg px-8 py-3 rounded-full"
            onClick={() => {
              navigate("/register");
            }}
          >
            Apply Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>
      </div>
      <Modal
        isOpen={!!selectedStartup}
        onClose={() => setSelectedStartup(null)}
        startup={selectedStartup}
      />
    </div>
  );
};

export default Portfolio;

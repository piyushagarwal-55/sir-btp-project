import React from "react";
import { motion } from "framer-motion";
import { Zap, Rocket, Lightbulb, Globe, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Program {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const programs: Program[] = [
  {
    id: 1,
    title: "Quantum Leap Incubator",
    description:
      "Accelerate your startup's growth with cutting-edge quantum computing resources and expert mentorship.",
    icon: <Zap className="w-12 h-12 text-blue-500" />,
    features: [
      "Access to quantum computing infrastructure",
      "Specialized quantum algorithm development",
      "Industry partnerships with tech giants",
      "Quantum-focused venture capital connections",
    ],
  },
  {
    id: 2,
    title: "Nanotech Accelerator",
    description:
      "Transform the world of materials science with our nanotechnology-focused accelerator program.",
    icon: <Rocket className="w-12 h-12 text-green-500" />,
    features: [
      "State-of-the-art nanotech lab access",
      "Collaboration with leading research institutions",
      "Rapid prototyping and testing facilities",
      "Nanotech patent strategy and support",
    ],
  },
  {
    id: 3,
    title: "AI Ethics Innovation Lab",
    description:
      "Pioneer the future of ethical AI development and implementation in this unique program.",
    icon: <Lightbulb className="w-12 h-12 text-yellow-500" />,
    features: [
      "AI ethics framework development",
      "Partnerships with policy makers and think tanks",
      "Ethical AI testing and certification",
      "AI governance and compliance support",
    ],
  },
  {
    id: 4,
    title: "Space Tech Frontier",
    description:
      "Launch your space technology startup into orbit with our comprehensive support program.",
    icon: <Globe className="w-12 h-12 text-purple-500" />,
    features: [
      "Collaboration with space agencies",
      "Microgravity experiment opportunities",
      "Space-grade hardware development support",
      "Astronaut and space expert mentorship",
    ],
  },
];

const ProgramCard: React.FC<{ program: Program }> = ({ program }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-100"
  >
    <div className="p-8">
      <div className="mb-6">{program.icon}</div>
      <h3 className="text-2xl font-bold mb-4 text-blue-600">{program.title}</h3>
      <p className="text-gray-600 mb-6">{program.description}</p>
      <ul className="space-y-2 mb-8">
        {program.features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-600">
            <ArrowRight className="w-4 h-4 mr-2 text-blue-400" />
            {feature}
          </li>
        ))}
      </ul>
      <Button className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-300 rounded-full">
        Learn More
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </motion.div>
);

const Programs: React.FC = () => {
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
            <span className="text-black">Pioneering</span> Programs
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Embark on a journey to the frontiers of innovation. Our cutting-edge
            programs are designed to propel your ideas into the technologies of
            tomorrow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 text-center"
        >
          <h2 className="text-4xl font-bold text-blue-600 mb-4">
            Ready to Shape the Future?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Join our next cohort of visionary entrepreneurs and be at the
            forefront of technological breakthroughs.
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
    </div>
  );
};

export default Programs;

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Users,
  Rocket,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {
  const naviagte = useNavigate();
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800 font-poppins pt-10">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
              LNMIIT Center for{" "}
              <span className="text-blue-600">Entrepreneurship</span>
            </h1>
            <p className="text-lg sm:text-xl mb-8 text-gray-600">
              Empowering innovators, fostering startups, and cultivating the
              entrepreneurial spirit at LNMIIT. We turn visionary ideas into
              impactful realities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg"
                onClick={() => {
                  naviagte("/programs");
                }}
              >
                Explore Programs
              </Button>
              <Button
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full text-lg"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full filter blur-3xl opacity-70"></div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
              alt="LCE Innovation Hub"
              className="rounded-2xl relative z-10 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* About LCE Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-blue-600">
              <span className="text-black">About</span> LCE
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              The LNMIIT Center for Entrepreneurship (LCE) is a dynamic hub
              designed to nurture and accelerate entrepreneurial ventures within
              the LNMIIT community. We provide a comprehensive ecosystem that
              supports students, alumni, and faculty in their journey from
              ideation to successful startup launch.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to foster innovation, provide resources, and create
              opportunities for aspiring entrepreneurs to turn their visionary
              ideas into successful businesses that make a positive impact on
              society.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {[
              { label: "Startups Incubated", value: "50+" },
              { label: "Mentors", value: "30+" },
              { label: "Funding Raised", value: "₹20L+" },
              { label: "Success Rate", value: "75%" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <h3 className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-black">
          Our <span className="text-blue-600">Entrepreneurship</span> Ecosystem
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Expert Mentorship",
              description:
                "Connect with industry leaders and successful entrepreneurs who guide you through your startup journey.",
              icon: Users,
            },
            {
              title: "Funding Support",
              description:
                "Access to a network of investors and guidance on securing funding for your venture.",
              icon: Rocket,
            },
            {
              title: "Innovation Labs",
              description:
                "State-of-the-art facilities and resources to bring your ideas to life and prototype your products.",
              icon: Lightbulb,
            },
            {
              title: "Accelerator Programs",
              description:
                "Intensive programs designed to fast-track your startup's growth and market readiness.",
              icon: TrendingUp,
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-gray-50">
        <h2 className="text-4xl font-bold mb-12 text-center text-blue-600">
          LCE Success <span className="text-black">Stories</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Safe Security",
              description:
                "Safe Security's AI-powered platform helps organizations measure and mitigate cyber risks in real-time.",
              image:
                "https://www.veracode.com/sites/default/files/2021-03/verified-safe-security-logo.png",
            },
            {
              title: "Neutrino Group",
              description:
                "Neutrino Group develops cutting-edge technologies for sustainable energy production and viable storage.",
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx8MxvEnwVpS9EZ0iqVP2wbv5kjcwRLz5jUg&s",
            },
            {
              title: "WiJungle",
              description:
                "WiJungle provides a comprehensive network security solution for enterprises and government organizations.",
              image:
                "https://media.licdn.com/dms/image/v2/D560BAQFEQ7vU6zK7nA/company-logo_200_200/company-logo_200_200/0/1703499034083/wijungle_logo?e=2147483647&v=beta&t=IUwb_-oeh-YBWWxptu_y2Me5eMqmN7xJxZz-3i1y5Go",
            },
          ].map((story, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-full h-48 object-contain"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {story.title}
                </h3>
                <p className="text-gray-600 mb-4">{story.description}</p>
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                  onClick={() => {
                    naviagte("/portfolio");
                  }}
                >
                  Read More <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Your Entrepreneurial Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join the LNMIIT Center for Entrepreneurship and turn your innovative
            ideas into successful ventures. The future of entrepreneurship
            starts here!
          </p>
          <Button
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-full text-lg font-semibold"
            onClick={() => {
              naviagte("/register");
            }}
          >
            Apply Now
          </Button>
        </div>
      </section>
    </div>
  );
}

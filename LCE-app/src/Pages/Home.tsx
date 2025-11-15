import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  ChevronRight,
  Star,
  Users,
  Zap,
  Book,
  Rocket,
  Globe,
  DollarSign,
  Briefcase,
  Target,
  Shield,
  Layers,
  Wifi,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WHYLCE from "../images/whylce.svg";
import { Link, useNavigate } from "react-router-dom";

const ServicesTimeline = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className="py-32 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4 sticky top-0 bg-white py-8 z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-blue-600 font-poppins">
            <span className="text-black">Our</span> Services{" "}
            <span className="text-black">Timeline</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-poppins">
            Follow our proven process to transform your idea into a successful
            business
          </p>
        </div>
        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-600"></div>
          {[
            {
              title: "Idea Validation",
              icon: <Zap size={32} />,
              description:
                "We help you validate your idea and assess its market potential.",
            },
            {
              title: "Mentorship",
              icon: <Users size={32} />,
              description:
                "Connect with experienced mentors who guide you through your entrepreneurial journey.",
            },
            {
              title: "Funding Support",
              icon: <DollarSign size={32} />,
              description:
                "Access to investor networks and assistance in securing funding for your startup.",
            },
            {
              title: "Skill Development",
              icon: <Book size={32} />,
              description:
                "Workshops and training sessions to enhance your entrepreneurial skills.",
            },
            {
              title: "Launch and Growth",
              icon: <Rocket size={32} />,
              description:
                "Support in launching your product and scaling your business.",
            },
          ].map((service, index) => (
            <motion.div
              key={index}
              className="relative mb-16"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={`flex flex-col md:flex-row ${
                  index % 2 === 0 ? "md:flex-row-reverse" : "flex-end"
                }`}
              >
                <div className="w-full md:w-5/12"></div>
                <div className="w-full md:w-2/12 flex justify-center mb-4 md:mb-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {index + 1}
                  </div>
                </div>
                <div className="w-full md:w-5/12">
                  <div className="p-6 rounded-lg shadow-lg border border-blue-100">
                    <div className="flex items-center mb-4">
                      <div className="mr-4 text-orange-500">{service.icon}</div>
                      <h3 className="text-2xl font-poppins font-semibold text-blue-800">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-xl font-poppins">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ text, author, image, bgColor }: any) => (
  <Card className={`p-6 ${bgColor} text-white rounded-2xl mb-4 font-poppins`}>
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <p className="text-lg">{text}</p>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <p className="font-semibold">{author}</p>
        <img
          src={image}
          alt={author}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
    </div>
  </Card>
);

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div className="absolute w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute w-[500px] h-[500px] bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000 right-0"></div>
      <div className="absolute w-[500px] h-[500px] bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000 bottom-0 left-0"></div>
    </div>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const stories = [
    {
      title: "Safe Security",
      subtitle: "Cybersecurity Risk Quantification",
      description:
        "Safe Security's AI-powered platform helps organizations measure and mitigate cyber risks in real-time.",
      icon: <Shield size={24} />,
      image:
        "https://www.veracode.com/sites/default/files/2021-03/verified-safe-security-logo.png",
      link: "https://safe.security/",
    },
    {
      title: "Neutrino Group",
      subtitle: "Innovative Energy Solutions",
      description:
        "Neutrino Group develops cutting-edge technologies for sustainable energy production and viable storage.",
      icon: <Layers size={24} />,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx8MxvEnwVpS9EZ0iqVP2wbv5kjcwRLz5jUg&s",
      link: "http://www.neutrino-group.com",
    },
    {
      title: "WiJungle",
      subtitle: "Unified Network Security Gateway",
      description:
        "WiJungle provides a comprehensive network security solution for enterprises and government organizations.",
      icon: <Wifi size={24} />,
      image:
        "https://media.licdn.com/dms/image/v2/D560BAQFEQ7vU6zK7nA/company-logo_200_200/company-logo_200_200/0/1703499034083/wijungle_logo?e=2147483647&v=beta&t=IUwb_-oeh-YBWWxptu_y2Me5eMqmN7xJxZz-3i1y5Go",
      link: "https://www.wijungle.com/",
    },
  ];

  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: [0, -10, 0],
      transition: { duration: 2, repeat: Infinity },
    });
  }, [controls]);

  return (
    <div className="min-h-screen font-medium text-lg relative overflow-hidden font-poppins">
      <AnimatedBackground />
      {/* Hero Section */}
      <section className="relative py-8 text-black overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Logo and header section - reduced padding-top */}
          <div className="flex flex-col items-center justify-center mb-4 pt-6">
            <div className="flex items-center justify-center space-x-4 md:space-x-8 mb-2">
              <img
                src="/LCE.png"
                alt="LNMIIT Centre for Entrepreneurship"
                className="h-16 md:h-20 object-contain"
              />
              <div className="h-12 w-px bg-gray-300"></div>
              <img
                src="/images.png"
                alt="The LNM Institute of Information Technology"
                className="h-26 md:h-26 object-contain"
              />
            </div>
            <h1 className="ext-2xl md:text-3xl lg:text-5xl font-bold text-gray-800 text-center mb-10 tracking-tight leading-tight">
              LNMIIT Centre for Entrepreneurship
            </h1>
          </div>
          {/* Divider line - reduced margin */}
          <div className="flex justify-center w-full my-4">
            <div className="w-11/12 max-w-6xl h-0.5 bg-gray-100"></div>
          </div>
          {/* Main content section - reduced top margin */}
          <div className="flex justify-between items-center mt-6">
            {/* Left placeholder image */}
            <div className="hidden md:block w-1/4">
              <div className="rounded-md">
                <div className="flex items-center justify-center h-64 w-full">
                  <img
                    src="/qw1.png"
                    alt="Featured Image"
                    className="h-64 w-53"
                  />
                </div>
              </div>
            </div>
            {/* Center content - reduced spacing between elements */}
            <div className="w-full md:w-1/2 text-center px-4">
              <div className="text-4xl sm:text-5xl font-bold mt-3">
                <div>Transforming</div>
                <div className="text-blue-500 mt-2">fresh perspectives</div>
                <div className="mt-2">
                  into
                  <span className="text-orange-500"> breakthroughs</span>
                </div>
              </div>
              <div className="mt-8 text-lg text-gray-700 max-w-2xl mx-auto">
                We champion driven entrepreneurs, bold startups, and
                breakthrough ideas with tailored guidance and a thriving
                innovation ecosystem.
              </div>
              <div className="mt-10">
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-md text-lg font-medium"
                  onClick={() => navigate("/register")}
                >
                  Apply Now
                </Button>
              </div>
            </div>
            {/* Right placeholder image */}
            <div className="hidden md:block w-1/4">
              <div className=" rounded-md">
                <div className="flex items-center justify-center h-64 w-full">
                  <img
                    src="/star1.png"
                    alt="Featured Image"
                    className="h-64 w-full text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-lg shadow-lg border border-blue-100 backdrop-blur-md bg-gradient-to-br from-blue-50 to-orange-50"
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                Our Mission
              </h2>
              <p className="text-gray-700 mb-8 text-xl">
                To ignite innovation and empower entrepreneurs by creating a
                dynamic ecosystem that nurtures ideas, accelerates growth, and
                transforms visionaries into successful business leaders.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Zap size={24} />,
                    text: "Spark innovative solutions",
                  },
                  {
                    icon: <Users size={24} />,
                    text: "Foster collaborative growth",
                  },
                  {
                    icon: <Star size={24} />,
                    text: "Unlock entrepreneurial potential",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 text-xl"
                  >
                    <div className="mr-4 text-blue-600">{item.icon}</div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-lg shadow-lg border border-orange-100 backdrop-blur-md bg-gradient-to-br from-orange-50 to-blue-50"
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">
                Our Vision
              </h2>
              <p className="text-gray-700 mb-8 text-xl">
                To be the catalyst for a global entrepreneurial renaissance,
                driving sustainable economic growth, fostering innovation, and
                creating positive societal impact through groundbreaking
                ventures.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: <Rocket size={24} />,
                    text: "Lead global innovation",
                  },
                  { icon: <Globe size={24} />, text: "Create lasting impact" },
                  {
                    icon: <Target size={24} />,
                    text: "Shape future industries",
                  },
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-gray-700 text-xl"
                  >
                    <div className="mr-4 text-orange-500">{item.icon}</div>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Why Choose Us Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-blue-600 bg-clip-text  font-poppins">
            <span className="text-black">Why Choose</span> LCE
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex justify-center items-center">
              <img
                src={WHYLCE}
                alt="LCE Benefits Illustration"
                className="w-full h-auto"
              />
            </div>
            <div>
              <ul className="space-y-8">
                {[
                  {
                    icon: <Users className="text-blue-600" size={32} />,
                    title: "Expert Mentorship",
                    description:
                      "Learn from industry leaders and successful entrepreneurs",
                  },
                  {
                    icon: <Briefcase className="text-orange-500" size={32} />,
                    title: "State-of-the-Art Facilities",
                    description:
                      "Access modern workspaces and cutting-edge technology",
                  },
                  {
                    icon: <Globe className="text-blue-600" size={32} />,
                    title: "Global Network",
                    description:
                      "Connect with a worldwide community of innovators",
                  },
                  {
                    icon: <Zap className="text-orange-500" size={32} />,
                    title: "Tailored Programs",
                    description:
                      "Customized support for your unique business needs",
                  },
                ].map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start"
                  >
                    <div className="mr-6 p-3 bg-white rounded-full shadow-md">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-poppins font-semibold mb-3 text-gray-800">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xl font-poppins">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Services Timeline */}
      <ServicesTimeline />
      {/* Success Stories */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-blue-600">Alumni</span>{" "}
            <span className="text-black">Startups</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black rounded-lg animate-border"></div>
                <Card className="relative overflow-hidden bg-gray-50 border-none h-full flex flex-col z-10">
                  <div className="h-64 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-contain object-center"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-blue-100 rounded-full mr-4 text-blue-600">
                        {story.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {story.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {story.subtitle}
                        </p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4 flex-grow">
                      {story.description}
                    </p>
                    <Link to={story.link} target="__blank">
                      <Button variant="outline" className="w-full mt-auto">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials Carousel */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center font-poppins">
            <div>
              <span className="text-4xl text-blue-600 ">Testimonial</span>
              <h2 className="text-3xl font-bold mt-2 mb-4 bg-gradient-to-r from-blue-700 to-blue-300 bg-clip-text text-transparent">
                <span className="text-black">The</span> Strategic Imperative{" "}
                <span className="text-black">of Hiring Tech Talent</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Leveraging Knowledge, Expertise, Advice, and Confidence in Tech
                Talent Acquisition through LCE
              </p>
            </div>
            <div className="space-y-6">
              <TestimonialCard
                text="LCE offers unparalleled ease of use, allowing businesses to swiftly onboard exceptional developers and seamlessly integrate them into their teams."
                author="Isabella Martinez"
                image="https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556785.jpg"
                bgColor="bg-blue-600"
              />
              <TestimonialCard
                text="Our platform simplifies the hiring process, saving you valuable time and effort. Say goodbye to the frustration of sifting through countless resumes."
                author="Matthew Bennett"
                image="https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556779.jpg"
                bgColor="bg-orange-500"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Upcoming Events
      <section className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
            Upcoming Events
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Startup Pitch Night",
                date: "June 15, 2024",
                time: "6:00 PM - 9:00 PM",
                gradient: "from-blue-200 to-blue-300",
                image:
                  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              },
              {
                title: "Tech Innovation Workshop",
                date: "July 2, 2024",
                time: "10:00 AM - 4:00 PM",
                gradient: "from-orange-200 to-orange-300",
                image:
                  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
              },
              {
                title: "Investor Networking Mixer",
                date: "July 20, 2024",
                time: "7:00 PM - 10:00 PM",
                gradient: "from-blue-200 to-orange-300",
                image:
                  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80",
              },
            ].map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`rounded-lg shadow-lg border border-white/20 backdrop-blur-md overflow-hidden`}
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`p-6 bg-gradient-to-br ${event.gradient}`}>
                  <h3 className="text-xl font-poppins font-semibold mb-2 text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-sm mb-2 flex items-center font-poppins text-gray-600">
                    <Calendar className="w-5 h-5 mr-2" />
                    {event.date}
                  </p>
                  <p className="text-sm flex items-center font-poppins text-gray-600">
                    <Clock className="w-5 h-5 mr-2" />
                    {event.time}
                  </p>
                  <Button className="mt-4 w-full bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 font-poppins">
                    Register Now
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
      {/* FAQ Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-br from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            {[
              {
                question: "What types of startups does LCE support?",
                answer:
                  "LCE supports a wide range of startups across various industries, including technology, healthcare, sustainability, and more. We're particularly interested in innovative ideas that have the potential to make a significant impact.",
              },
              {
                question: "How long is the typical incubation period?",
                answer:
                  "The incubation period varies depending on the startup's needs and progress. Typically, it ranges from 6 to 18 months, but we work with each startup individually to determine the best timeline for their growth.",
              },
              {
                question: "What resources does LCE provide to startups?",
                answer:
                  "LCE provides a comprehensive suite of resources including mentorship, funding opportunities, workspace, networking events, workshops, and access to our partner network of investors and industry experts.",
              },
              {
                question: "How can I apply to join LCE?",
                answer:
                  "You can apply to join LCE through our online application process. Visit our 'Apply Now' page to submit your startup idea or business plan. We review applications on a rolling basis and will contact you for next steps.",
              },
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="font-poppins text-gray-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="font-poppins text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      {/* Newsletter Signup */}
      <section className="py-20 bg-gray-900 text-white relative z-10">
        <div className="container mx-auto px-4">
          <Card className="p-8 bg-gray-900 border border-white/20 backdrop-blur-md rounded-xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img
                src="https://img.freepik.com/free-photo/3d-rendering-zoom-call-avatar_23-2149556785.jpg"
                alt="Newsletter"
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-poppins font-semibold mb-2 text-white">
                  Subscribe to our newsletter
                </h2>
                <p className="font-poppins text-gray-300 mb-4">
                  Get a summary of what we've shipped, behind the scenes and
                  some exclusive alphas!
                </p>
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-gray-700/50 text-white border-white/20"
                  />
                  <Button
                    variant="secondary"
                    className="bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-2xl font-poppins font-semibold mb-6">
                About LCE
              </h3>
              <p className="text-gray-400 text-lg font-poppins">
                LCE is dedicated to fostering innovation and entrepreneurship,
                providing a supportive ecosystem for startups and visionaries.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-poppins font-semibold mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {["About", "Services", "Events", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center text-lg font-poppins"
                    >
                      <ChevronRight className="w-5 h-5 mr-2" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-poppins font-semibold mb-6">
                Connect With Us
              </h3>
              <div className="flex space-x-6">
                {["Twitter", "LinkedIn", "Facebook", "Instagram"].map(
                  (social) => (
                    <a
                      key={social}
                      href="#"
                      className="bg-gray-800 hover:bg-gray-700 transition-colors duration-300 rounded-full p-3"
                    >
                      <span className="sr-only">{social}</span>
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400 text-lg font-poppins">
              © 2024 LCE. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

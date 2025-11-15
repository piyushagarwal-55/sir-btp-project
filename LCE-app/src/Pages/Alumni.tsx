import { useEffect, useState } from "react";
//import { Linkedin } from "lucide-react";

// Real alumni data from the provided PDF, excluding those with "nan" startups
const alumniData = [
  {
    id: 1,
    name: "Vidit Paliwal",
    role: "Co-Founder",
    subRole: "Channelize, BigStep",
    batch: "Y03",
    image: "/Vidit Paliwal.jpeg",
    linkedin: "https://www.linkedin.com/in/viditpaliwal/",
  },
  {
    id: 2,
    name: "Manu Yadav",
    role: "CEO",
    subRole: "HR Cosmo, Enuke",
    batch: "Y03",
    image: "/Manu Yadav.jpeg",
    linkedin: "https://www.linkedin.com/in/yadavmanu/",
  },
  {
    id: 3,
    name: "Gautam Agarwal",
    role: "Co-Founder & CTO",
    subRole: "GNG Group",
    batch: "Y03",
    image: "GautamAgarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/gautam-agarwal-51138b8/",
  },
  {
    id: 4,
    name: "Shekhar Jain",
    role: "CEO",
    subRole: "ITL Industries",
    batch: "Y07",
    image: "/Shekhar Jain.jpeg",
    linkedin: "https://www.linkedin.com/in/shekhar-jain/",
  },

  {
    id: 5,
    name: "Vikas Choudhary",
    role: "Founder & CEO",
    subRole: "VC AI Labs",
    batch: "Y04",
    image: "/Vikas Choudhary.jpeg",
    linkedin: "https://www.linkedin.com/in/vikas-choudhary-849ab39/",
  },
  {
    id: 6,
    name: "Sneh Gupta",
    role: "CTO",
    subRole: "Smart Decision",
    batch: "Y04",
    image: "/Sneh Gupta.jpeg",
    linkedin: "https://www.linkedin.com/in/sneh-gupta-264006146/",
  },
  {
    id: 7,
    name: "Pratik Hetamsaria",
    role: "Co-Founder",
    subRole: "PrismPort",
    batch: "Y04",
    image: "/Pratik Hetamsaria .jpeg",
    linkedin: "https://www.linkedin.com/in/pratik-hetamsaria-0277ba1b/",
  },
  {
    id: 8,
    name: "Utkarsh Jain",
    role: "CEO",
    subRole: "Veris",
    batch: "Y05",
    image: "/Utkarsh Jain.jpeg",
    linkedin: "https://www.linkedin.com/in/ujain/",
  },
  {
    id: 9,
    name: "Prateek Jain",
    role: "Vice President Program Management",
    subRole: "AIRLINQ",
    batch: "Y05",
    image: "/Prateek Jain .jpeg",
    linkedin: "https://www.linkedin.com/in/prateek1986/",
  },
  {
    id: 10,
    name: "Prateek Goel",
    role: "Founder and CEO",
    subRole: "InstaCash",
    batch: "Y05",
    image: "/Prateek Goel.jpeg",
    linkedin: "https://www.linkedin.com/in/prateekgo/",
  },
  {
    id: 11,
    name: "Abhishek Joshi",
    role: "Director",
    subRole: "Rufil",
    batch: "Y05",
    image: "/Abhishek Joshi.jpeg",
    linkedin: "https://www.linkedin.com/in/abhishekjoshi09/",
  },
  {
    id: 12,
    name: "Peeyush Raj",
    role: "CTO",
    subRole: "Veris",
    batch: "Y05",
    image: "/Peeyush Raj.jpeg",
    linkedin: "https://www.linkedin.com/in/peeyushraj/",
  },
  {
    id: 13,
    name: "Abhishek Jain",
    role: "Senior Vice President Of Engineering",
    subRole: "AIRLINQ",
    batch: "Y05",
    image: "/Abhishek Jain .jpeg",
    linkedin: "https://www.linkedin.com/in/abhishekjain2603/",
  },
  {
    id: 14,
    name: "Bhupendra Choudhary",
    role: "Co-Founder",
    subRole: "FieldCircle",
    batch: "Y05",
    image: "/Bhupendra C..jpeg",
    linkedin: "https://www.linkedin.com/in/bhupendrachoudhary2/",
  },
  {
    id: 15,
    name: "Harsh Kushwah",
    role: "Founder",
    subRole: "menPsyche",
    batch: "Y05",
    image: "/Harsh Kushwah.jpeg",
    linkedin: "https://www.linkedin.com/in/harshkushwah/",
  },
  {
    id: 16,
    name: "Amit Sharma",
    role: "Consultant",
    subRole: "Veris",
    batch: "Y06",
    image: "/Amit Sharma.jpeg",
    linkedin: "https://www.linkedin.com/in/amit-sharma-4b51a323/",
  },
  {
    id: 17,
    name: "Abhishek Rathore",
    role: "Co-founder",
    subRole: "Youstart Labs",
    batch: "Y06",
    image: "/Abhishek Rathore.jpeg",
    linkedin: "https://www.linkedin.com/in/abhishek87/",
  },
  {
    id: 18,
    name: "Prateek Saraf",
    role: "Founder & CEO",
    subRole: "Dream Animators",
    batch: "Y06",
    image: "/Prateek Saraf.jpeg",
    linkedin: "https://www.linkedin.com/in/prateek-saraf-54240557/",
  },
  {
    id: 19,
    name: "Anoop Poonia",
    role: "Co-Founder",
    subRole: "Veris",
    batch: "Y06",
    image: "/Anoop Poonia.jpeg",
    linkedin: "https://www.linkedin.com/in/anoop-poonia-41478545/",
  },
  {
    id: 20,
    name: "Varun Gurjar",
    role: "Vice President",
    subRole: "Veris",
    batch: "Y06",
    image: "/Varun Gurjar.jpeg",
    linkedin: "https://www.linkedin.com/in/varugurjar/",
  },
  {
    id: 21,
    name: "Sushil Modi",
    role: "Co-Founder & CEO",
    subRole: "ZipLip",
    batch: "Y07",
    image: "/Sushil Modi.jpeg",
    linkedin: "https://www.linkedin.com/in/sushil-modi/",
  },
  {
    id: 22,
    name: "Akash Bhargava",
    role: "Co-Founder",
    subRole: "ClickByte Media",
    batch: "Y07",
    image: "/Akash Bhargava.jpeg",
    linkedin: "https://www.linkedin.com/in/akash-bhargava/",
  },
  {
    id: 23,
    name: "Saaurabh Gupta",
    role: "Founder & Chairman",
    subRole: "Neutrino Group",
    batch: "Y04",
    image: "/Sa.jpeg",
    linkedin: "https://www.linkedin.com/in/saaurabhgupta/",
  },
  {
    id: 24,
    name: "Bhavya Agarwal",
    role: "Co-Founder",
    subRole: "Coinfeeds",
    batch: "Y08",
    image: "/Bhavya Agarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/agarwalbhavya/",
  },
  {
    id: 25,
    name: "Ashutosh Bahheti",
    role: "CEO",
    subRole: "Gensys Solutions",
    batch: "Y08",
    image: "/Ashutosh B..jpeg",
    linkedin: "https://www.linkedin.com/in/ashutoshbaheti7",
  },
  {
    id: 26,
    name: "Dixit Singhvi",
    role: "Co-Founder",
    subRole: "InstaCash",
    batch: "Y08",
    image: "/ds.jpeg",
    linkedin: "https://www.linkedin.com/in/dixit-singhvi-49958318/",
  },
  {
    id: 27,
    name: "Saket Modi",
    role: "Co-Founder & CEO",
    subRole: "Safe Security",
    batch: "Y09",
    image: "/sm.jpeg",
    linkedin: "https://www.linkedin.com/in/samodi/",
  },
  {
    id: 28,
    name: "Sandeep Aggarwal",
    role: "Co-Founder",
    subRole: "DentalKart",
    batch: "Y09",
    image: "/Sandeep Aggarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/sandeep-aggarwal-bb8a5745/",
  },
  {
    id: 29,
    name: "Himanshu Saxena",
    role: "Founder",
    subRole: "Suzami Tech",
    batch: "Y09",
    image: "/Himanshu Saxena.jpeg",
    linkedin: "https://www.linkedin.com/in/himanshu-saxena33/",
  },
  {
    id: 30,
    name: "Vivek Jain",
    role: "Managing Partner",
    subRole: "Vibrant Polymers",
    batch: "Y09",
    image: "/vj.jpeg",
    linkedin: "https://www.linkedin.com/in/vivek-jain-12160730/",
  },
  {
    id: 31,
    name: "Ravikant Khunteta",
    role: "Founder",
    subRole: "Family Business",
    batch: "Y09",
    image: "/Ravikant khunteta.jpeg",
    linkedin: "https://www.linkedin.com/in/ravikant-khunteta-34a34829/",
  },
  {
    id: 32,
    name: "Deepak Sharma",
    role: "Founder",
    subRole: "TreeShrew",
    batch: "Y09",
    image: "/Deepak Sharma.jpeg",
    linkedin: "https://www.linkedin.com/in/deepak11111989/",
  },
  {
    id: 33,
    name: "Chetan Agarwal",
    role: "Co-Founder & CEO",
    subRole: "Growth System",
    batch: "Y09",
    image: "/Chetan A..jpeg",
    linkedin: "https://www.linkedin.com/in/chetanagarwal08/",
  },
  {
    id: 34,
    name: "Shivani Shah",
    role: "Co-Founder & CTO",
    subRole: "Samp.ai",
    batch: "Y10",
    image: "/Shivani Shah.jpeg",
    linkedin: "https://www.linkedin.com/in/shivanishah21/",
  },
  {
    id: 35,
    name: "Rishabh Agrawal",
    role: "Managing Director",
    subRole: "Vansushi Private Limited",
    batch: "Y10",
    image: "/Rishabh Agrawal.jpeg",
    linkedin: "https://www.linkedin.com/in/rishabh-agrawal-57952729/",
  },
  {
    id: 36,
    name: "Chakshu Goyal",
    role: "Founder",
    subRole: "Offingo",
    batch: "Y10",
    image: "/Chakshu Goyal.png",
    linkedin: "https://www.linkedin.com/in/chakshu-goyal-36146859/",
  },
  {
    id: 37,
    name: "Samarth Sajdeh",
    role: "Founder",
    subRole: "Modern Homes",
    batch: "Y10",
    image: "/Samarth Sajdeh.jpeg",
    linkedin: "https://www.linkedin.com/in/samarthsajdeh/",
  },
  {
    id: 38,
    name: "Anupam Singh",
    role: "Co-Founder",
    subRole: "Digia",
    batch: "Y10",
    image: "/Anupam Singh.jpeg",
    linkedin: "https://www.linkedin.com/in/anupamsingh0211/",
  },
  {
    id: 39,
    name: "Kovid Sawla",
    role: "Co-Founder & CEO",
    subRole: "Adivid Technologies",
    batch: "Y11",
    image: "/Kovid Sawla.jpeg",
    linkedin: "https://www.linkedin.com/in/kovid-sawla-24222676/",
  },
  {
    id: 40,
    name: "Karmesh Gupta",
    role: "Co-Founder & CEO",
    subRole: "WiJungle",
    batch: "Y12",
    image: "/Karmesh Gupta.jpeg",
    linkedin: "https://www.linkedin.com/in/karmeshgupta/",
  },
  {
    id: 41,
    name: "Ayush Ranjan",
    role: "Co-Founder & CEO",
    subRole: "Huddle01",
    batch: "Y12",
    image: "/Ayush Ranjan.jpeg",
    linkedin: "https://www.linkedin.com/in/ranjan18/",
  },
  {
    id: 42,
    name: "Aayush Kumar",
    role: "Founder & CEO",
    subRole: "OpsLyft",
    batch: "Y12",
    image: "/ak.jpeg",
    linkedin: "https://www.linkedin.com/in/aayushkumarjarvis/",
  },
  {
    id: 43,
    name: "Hemant Jain",
    role: "Co-Founder",
    subRole: "BeyondIRR",
    batch: "Y12",
    image: "/Hemant Jain.jpeg",
    linkedin: "https://www.linkedin.com/in/hemantjain95/",
  },
  {
    id: 44,
    name: "Krishna Neel",
    role: "Founder",
    subRole: "KiiStart",
    batch: "Y12",
    image: "/Krishna Neel.jpeg",
    linkedin: "https://www.linkedin.com/in/krishnaneel/",
  },
  {
    id: 45,
    name: "Shubham Mittal",
    role: "Co-Founder",
    subRole: "ComicSense.xyz",
    batch: "Y12",
    image: "/Shubham Mittal.jpeg",
    linkedin: "https://www.linkedin.com/in/shubham-mittal-40052576/",
  },
  {
    id: 46,
    name: "Mandar Lokegaonkar",
    role: "Founder & CEO",
    subRole: "Piscis Networks",
    batch: "Y12",
    image: "/Mandar Lokegaonkar.jpeg",
    linkedin: "https://www.linkedin.com/in/mandar-lokegaonkar/",
  },
  {
    id: 47,
    name: "Saksham Jain",
    role: "Founder",
    subRole: "Macha",
    batch: "Y12",
    image: "/sj.jpeg",
    linkedin: "https://www.linkedin.com/in/saxmjain/",
  },
  {
    id: 48,
    name: "Nakul Varshney",
    role: "Engineering Manager",
    subRole: "Dentalkart",
    batch: "Y12",
    image: "/Nakul Varshney.jpeg",
    linkedin: "https://www.linkedin.com/in/nakul-varshney-a80709110/",
  },
  {
    id: 49,
    name: "Sagar Agarwal",
    role: "Founder",
    subRole: "Luxamour",
    batch: "Y12",
    image: "/Sagar Agarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/sagaragarwal2908/",
  },
  {
    id: 50,
    name: "Abhishek Gupta",
    role: "Co-Founder",
    subRole: "Teach Easy",
    batch: "Y13",
    image: "/ag.jpeg",
    linkedin: "https://www.linkedin.com/in/abhishekgupta2512/",
  },
  {
    id: 51,
    name: "Dhiyavasu Bhadauria",
    role: "Co-Founder & CEO",
    subRole: "EventGraphia",
    batch: "Y13",
    image: "/Dhiyavasu Bhadauria.jpeg",
    linkedin: "https://www.linkedin.com/in/dhiyavasu/",
  },
  {
    id: 52,
    name: "Palansh Agrawal",
    role: "Co-Founder",
    subRole: "EventGraphia",
    batch: "Y13",
    image: "/Palansh Agarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/palansh/",
  },
  {
    id: 53,
    name: "Gaurav Maheshwari",
    role: "Founder",
    subRole: "RepairMax",
    batch: "Y13",
    image: "/Gaurav Maheshwari.jpeg",
    linkedin: "https://www.linkedin.com/in/gauravmaheshwar2/",
  },
  {
    id: 54,
    name: "Rajeev Jaiswal",
    role: "CTO",
    subRole: "Stealth Mode",
    batch: "Y13",
    image: "/Rajeev Jaiswal.jpeg",
    linkedin: "https://www.linkedin.com/in/rajeevjaiswal24/",
  },
  {
    id: 55,
    name: "Ritwik Dadhich",
    role: "Co-Founder",
    subRole: "Walscape",
    batch: "Y13",
    image: "/Ritwik Dadhich.jpeg",
    linkedin: "https://www.linkedin.com/in/ritwikdadhich/",
  },
  {
    id: 56,
    name: "Ishita Parakh",
    role: "Founder",
    subRole: "Udukku",
    batch: "Y13",
    image: "/Ishita Parakh.jpeg",
    linkedin: "https://www.linkedin.com/in/ishita-parakh/",
  },
  {
    id: 57,
    name: "Shibli Baig",
    role: "Co-Founder",
    subRole: "House of Herbs",
    batch: "Y13",
    image: "/Shibli Baig.jpeg",
    linkedin: "https://www.linkedin.com/in/shiblibaig/",
  },
  {
    id: 58,
    name: "Siddharth Nahar",
    role: "Co-Founder",
    subRole: "Teach Easy",
    batch: "Y13",
    image: "/Siddharth Nahar.jpeg",
    linkedin: "https://www.linkedin.com/in/siddharthnahar9/",
  },
  {
    id: 59,
    name: "Yash Varyani",
    role: "CTO",
    subRole: "Stealth",
    batch: "Y13",
    image: "/Yash Varyani.jpeg",
    linkedin: "https://www.linkedin.com/in/yashvaryani/",
  },
  {
    id: 60,
    name: "Chhatrapati (CP) Jain",
    role: "Co-Founder",
    subRole: "Minstein",
    batch: "Y14",
    image: "/CP Jain.jpeg",
    linkedin: "https://www.linkedin.com/in/jaincp/",
  },
  {
    id: 61,
    name: "Kaustubh Saini",
    role: "Founder",
    subRole: "FavTutor",
    batch: "Y14",
    image: "/Kaustubh Saini.jpeg",
    linkedin: "https://www.linkedin.com/in/kaustubh-saini/",
  },
  {
    id: 62,
    name: "Susmit Lavania",
    role: "Tech Co-founder",
    subRole: "Huddle01",
    batch: "Y15",
    image: "/Susmit Lavania.jpeg",
    linkedin: "https://www.linkedin.com/in/susmit-lavania-4b9558107/",
  },
  {
    id: 63,
    name: "Sourabh Kaushik",
    role: "Co-Founder",
    subRole: "Tealfeed",
    batch: "Y15",
    image: "/Sourabh Kaushik.jpeg",
    linkedin: "https://www.linkedin.com/in/sourabhkaushik/",
  },
  {
    id: 64,
    name: "Uma Bhatia",
    role: "Co-Founder",
    subRole: "Exelux",
    batch: "Y15",
    image: "/Uma Bhatia.jpeg",
    linkedin: "https://www.linkedin.com/in/uma-bhatia/",
  },
  {
    id: 65,
    name: "Punit Agarwal",
    role: "Founder",
    subRole: "KoinX",
    batch: "Y16",
    image: "/Punit Agarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/iampunit/",
  },
  {
    id: 66,
    name: "Rohit Garg",
    role: "Cofounder & CEO",
    subRole: "Tealfeed",
    batch: "Y16",
    image: "/Rohit Garg.jpeg",
    linkedin: "https://www.linkedin.com/in/rohitgarg923/",
  },
  {
    id: 67,
    name: "Pranav Gupta",
    role: "Founder",
    subRole: "Liveasy",
    batch: "Y16",
    image: "/Pranav Gupta.jpeg",
    linkedin: "https://www.linkedin.com/in/pranavgupta00/",
  },
  {
    id: 68,
    name: "Madhav Khandelwal",
    role: "Founder & CEO",
    subRole: "Evolv",
    batch: "Y16",
    image: "/Madhav Khandelwal.jpeg",
    linkedin: "https://www.linkedin.com/in/madhavk1698/",
  },
  {
    id: 69,
    name: "Akshay Jain",
    role: "Founder",
    subRole: "Daily Code Solutions",
    batch: "Y16",
    image: "/Akshay Jain.jpeg",
    linkedin: "https://www.linkedin.com/in/akkij/",
  },
  {
    id: 70,
    name: "Apoorv Agarwal",
    role: "Co-Founder & CTO",
    subRole: "Adsys",
    batch: "Y16",
    image: "/Apoorv Agarwal.jpeg",
    linkedin: "https://www.linkedin.com/in/apoorv26/",
  },
  {
    id: 71,
    name: "Herane Malhotra",
    role: "Founder",
    subRole: "Cynefin Technologies",
    batch: "Y16",
    image: "/Herane Malhotra.jpeg",
    linkedin: "https://www.linkedin.com/in/herane-malhotra007/",
  },
  {
    id: 72,
    name: "Himanshu Daga",
    role: "Co-Founder",
    subRole: "Dash Glasses",
    batch: "Y16",
    image: "/Himanshu Daga.jpeg",
    linkedin: "https://www.linkedin.com/in/himanshu-daga/",
  },
  {
    id: 73,
    name: "Keshav Sikawat",
    role: "Co-Founder",
    subRole: "Auggin",
    batch: "Y17",
    image: "/Keshav Sikawat.jpeg",
    linkedin: "https://www.linkedin.com/in/keshav-sikawat/",
  },
  {
    id: 74,
    name: "Rishabha Sancheti",
    role: "Cofounder & CEO",
    subRole: "Jobetto",
    batch: "Y17",
    image: "/Rishabha Sancheti.jpeg",
    linkedin: "https://www.linkedin.com/in/rishabha-sancheti-99a94912b/",
  },
  {
    id: 75,
    name: "Utkarsh Kulshrestha",
    role: "Co-Founder",
    subRole: "Evolv",
    batch: "Y17",
    image: "/Utkarsh Kulshrestha.jpeg",
    linkedin: "https://www.linkedin.com/in/utkarsh-kulshrestha/",
  },
  {
    id: 76,
    name: "Naman Goyal",
    role: "Founder & CEO",
    subRole: "Zapp Invest",
    batch: "Y20",
    image: "/Naman Goyal.jpeg",
    linkedin: "https://www.linkedin.com/in/naman-goyal-ab364921b/",
  },
];

export default function AlumniSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleAlumni, setVisibleAlumni] = useState(8); // Initial number of alumni to show

  // Sample alumni data - replace with your actual data

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const loadMoreAlumni = () => {
    setVisibleAlumni((prev) => Math.min(prev + 8, alumniData.length));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className={`text-center mb-16 mt-20 transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              <span className="block overflow-hidden">
                <span className="block transition-transform duration-1000 ease-out delay-200">
                  Meet Our Alumni Network
                </span>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
              Connect with our successful graduates who are making an impact
              across various industries
            </p>
          </div>

          {/* Alumni Cards Grid */}
          <div className="grid grid-cols-1 mt-20 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {alumniData.slice(0, visibleAlumni).map((alumni, index) => (
              <div
                key={alumni.id}
                className={`rounded-lg shadow-md overflow-hidden transform transition-all duration-500 ease-out hover:shadow-xl ${
                  isLoaded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${Math.min(index, 7) * 100}ms`, // Cap the delay for new items
                  background:
                    "linear-gradient(135deg, #f0f9ff 0%, #fff8f0 100%)",
                }}
              >
                {/* Decorative top border with gradient */}
                <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-orange-400"></div>

                <div className="p-5 flex flex-col items-center relative">
                  {/* Subtle background pattern */}
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                      backgroundSize: "20px 20px",
                    }}
                  ></div>

                  {/* Circle Photo - Gradient removed */}
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4 shadow-md ring-2 ring-white">
                    <img
                      src={alumni.image}
                      alt={alumni.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>

                  <a
                    href={alumni.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 transform transition hover:scale-110"
                  >
                    <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all shadow-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-6 w-6 text-white"
                      >
                        <path
                          fill="currentColor"
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                      </svg>
                    </div>
                  </a>

                  {/* Name with subtle text shadow */}
                  <h3 className="font-semibold text-lg text-center text-gray-800">
                    {alumni.name}
                  </h3>

                  {/* Batch - Using gradient text */}
                  <div className="mb-1 bg-gradient-to-r from-blue-600 to-orange-500 text-transparent bg-clip-text">
                    <p className="text-sm font-medium">{alumni.batch}</p>
                  </div>

                  {/* Role with improved styling */}
                  <div className="text-center">
                    <p className="text-gray-700 text-sm">{alumni.role}</p>
                    {alumni.subRole && (
                      <p className="text-gray-600 text-sm italic">
                        {alumni.subRole}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button - Styled to match the theme */}
          {visibleAlumni < alumniData.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMoreAlumni}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-out flex items-center space-x-2 font-medium hover:scale-105 hover:shadow-lg"
              >
                <span>View More Alumni</span>
              </button>
            </div>
          )}

          {/* Call to Action */}
          <div
            className={`mt-16 text-center p-8 rounded-lg shadow-sm transition-all duration-1000 ease-out ${
              isLoaded
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-8"
            }`}
            style={{
              background: "linear-gradient(135deg, #f0f9ff 0%, #fff8f0 100%)",
            }}
          >
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-orange-400 absolute top-0 left-0"></div>
            <h2 className="text-3xl md:text-5xl font-bold text-blue-600 mb-4">
              Want to be the next{" "}
              <span className="text-orange-500">Success Story </span>?
            </h2>

            <p className="text-gray-700 font-semibold mb-6 max-w-2xl mx-auto">
              From vision to venture — accelerate your startup journey with our
              Foundership Program and industry-leading mentorship.
            </p>
            <a
              href="/register"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-full hover:from-orange-600 hover:to-orange-700 transition-all duration-300 ease-out inline-block font-medium hover:scale-105 hover:shadow-lg"
            >
              Apply Now
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 md:px-12 transition-all duration-1000 ease-out delay-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">Copyright © 2025, All Rights Reserved</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-sm hover:underline transition-all duration-300 hover:text-opacity-80"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm hover:underline transition-all duration-300 hover:text-opacity-80"
            >
              Terms & Conditions
            </a>
            <a
              href="#"
              className="text-sm hover:underline transition-all duration-300 hover:text-opacity-80"
            >
              Site Map
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

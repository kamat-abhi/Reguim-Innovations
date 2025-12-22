import { motion } from "framer-motion";
import PhotoStack from "../components/PhotoStack";
import about1 from "../assets/car.webp";
import about2 from "../assets/chemical.jpg";
import about3 from "../assets/waste.jpg";
import about4 from "../assets/Health-Innovation--800x338.jpeg"
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="bg-white text-black overflow-hidden">

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold mb-6"
        >
          Engineering the Future
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="max-w-3xl text-lg text-gray-700"
        >
          Regium Innovations and Research Pvt. Ltd. is a forward-thinking company
          committed to innovation, technology, and real-world impact.
        </motion.p>
      </section>

      {/* STORY + PHOTO STACK */}
<section className="px-6 md:px-20 py-32">
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9 }}
    className="max-w-4xl mb-16"
  >
    <h2 className="text-3xl font-bold mb-4">Who We Are</h2>
    <p className="text-gray-700 leading-relaxed mb-4">
      Founded by <strong>Mr. Piyush Kumar</strong>, Regium Innovations and Research
      Pvt. Ltd. operates at the intersection of science, engineering, and
      real-world deployment.
    </p>
    <p className="text-gray-700 leading-relaxed">
      We work closely with private industries, government bodies, and innovators
      to translate research into scalable, sustainable solutions.
    </p>
  </motion.div>

  {/* FULL WIDTH IMAGE STRIP */}
  <div className="relative -mx-6 md:-mx-20">
    <PhotoStack images={[about1, about2, about3, about4]} />
  </div>
</section>


      {/* FOCUS AREAS */}
      <section className="bg-white text-black px-6 md:px-20 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-12"
        >
          Our Focused Areas
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            "Automobile Modification & Manufacturing",
            "Chemical Production & Research",
            "Water Purification & Packaging",
            "Research & Development",
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="border border-black rounded-xl p-6 hover:bg-black hover:text-white transition-all"
            >
              <h3 className="font-semibold text-lg">{item}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-20 py-24 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl font-bold mb-6"
        >
          Shaping Industries. Creating Impact.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 max-w-2xl mx-auto"
        >
          We collaborate with private industries, government bodies, and
          individuals to deliver efficient, sustainable, and tailored
          solutions.
        </motion.p>
      </section>
      <Footer/>
    </div>
  );
};

export default About;

import { motion } from "framer-motion";

export default function About() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
      variants={fadeIn}
      className="container mx-auto py-12 px-4"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500">
            About Sama
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Illuminating spaces with elegance and innovation since 2010
          </p>
        </div>

        <div className="space-y-16">
          {/* Our Story */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="space-y-4 order-2 md:order-1">
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
              <p className="text-gray-300">
                Sama Lighting was founded with a vision to transform how people experience light in their living spaces. What began as a small studio in New York has grown into a globally recognized brand synonymous with innovative, artistic, and functional lighting solutions.
              </p>
              <p className="text-gray-300">
                Our journey has been defined by a relentless pursuit of excellence, bringing together master craftspeople, innovative engineers, and visionary designers to create lighting that transcends mere functionality to become art.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-xl shadow-purple-900/20 order-1 md:order-2">
              <img
                src="https://images.unsplash.com/photo-1551649778-a3e749ec8c30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Sama workshop"
                className="w-full h-80 object-cover"
              />
            </div>
          </motion.section>

          {/* Our Mission */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div className="rounded-xl overflow-hidden shadow-xl shadow-blue-900/20">
              <img
                src="https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
                alt="Sama design process"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              <p className="text-gray-300">
                At Sama, our mission is to elevate living spaces through illumination. We believe that the right lighting can transform not just the aesthetic of a space, but also the emotions and experiences within it.
              </p>
              <p className="text-gray-300">
                We are committed to sustainable practices, ethical sourcing, and timeless design that reduces waste and consumption. Every Sama lighting fixture is created to last generations, both in its construction and in its design sensibility.
              </p>
            </div>
          </motion.section>

          {/* Our Values */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Craftsmanship</h3>
                <p className="text-gray-300">
                  We believe in the value of expert craftsmanship and attention to detail. Each fixture is meticulously crafted with precision and care.
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Sustainability</h3>
                <p className="text-gray-300">
                  We are committed to sustainable practices in all aspects of our business, from material sourcing to energy-efficient designs.
                </p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm border border-gray-700/50 shadow-lg">
                <div className="h-16 w-16 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                    <polyline points="16 6 12 2 8 6"></polyline>
                    <line x1="12" x2="12" y1="2" y2="15"></line>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Innovation</h3>
                <p className="text-gray-300">
                  We continuously push the boundaries of design and technology to create lighting solutions that are both innovative and timeless.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Team */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  name: "Emma Rodriquez",
                  role: "Founder & Creative Director",
                  image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1588&q=80"
                },
                {
                  name: "Marcus Chen",
                  role: "Lead Designer",
                  image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                },
                {
                  name: "Sophia Patel",
                  role: "Materials Specialist",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1361&q=80"
                },
                {
                  name: "James Wilson",
                  role: "Technical Director",
                  image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800/50 rounded-xl overflow-hidden shadow-lg backdrop-blur-sm border border-gray-700/50"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                    <p className="text-gray-400">{member.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </motion.div>
  );
}
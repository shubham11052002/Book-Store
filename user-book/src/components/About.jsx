import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-12 px-6">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-lg overflow-hidden p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Welcome to Book Haven 📚
        </h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto">
          Established in 2005, **Book Haven** is a sanctuary for book lovers.
          We curate a collection of rare first editions, modern bestsellers,
          and timeless classics to inspire minds and fuel imaginations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-blue-50 shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-700">📚 10,000+ Books</h3>
            <p className="text-gray-600 mt-2">
              A vast selection across genres and languages.
            </p>
          </div>

          <div className="bg-blue-50 shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-700">🌍 Global Shipping</h3>
            <p className="text-gray-600 mt-2">
              We deliver books to over 50+ countries.
            </p>
          </div>

          <div className="bg-blue-50 shadow-lg rounded-lg p-6 text-center">
            <h3 className="text-xl font-semibold text-blue-700">🏆 Trusted by Readers</h3>
            <p className="text-gray-600 mt-2">
              Over 500,000 happy customers worldwide.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
          <p className="text-gray-700 mt-4 max-w-2xl mx-auto">
            We believe books are more than just pages; they’re **gateways to new worlds**.
            Our mission is to make **reading accessible, enjoyable, and enriching for everyone**.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href="/shop"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Explore Collection
            </a>
            <a
              href="/contact"
              className="bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-900 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      {/* Image Section at Bottom */}
      <div className="max-w-5xl w-full mt-6">
        <img
          src="data:image/jpeg;base64,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"
          alt="Bookstore interior"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
         style={{width:"40%",height:"30%",marginLeft:"30%"}} />
      </div>
    </div>
  );
};

export default About;

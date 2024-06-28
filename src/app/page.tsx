import React from "react";
import Head from "next/head";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Welcome to Perago</title>
        <meta name="description" content="Welcome to Perago" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {/* Hero Section */}
        <section
          className="flex items-center justify-center min-h-screen bg-cover bg-center"
          style={{ backgroundImage: "url(emp.png)" }}
        >
          <div className="p-10 rounded-lg text-center bg-gray-800 bg-opacity-70 backdrop-blur-lg shadow-lg">
            <h1 className="text-5xl font-bold text-white mb-4">
              Manage Employee Hierarchy
            </h1>
            <p className="text-xl text-white mb-8">
              Empower your organization with streamlined hierarchy management.
            </p>
            <a
              href="/positions"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
            >
              Get Started
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

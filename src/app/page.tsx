import React from 'react';
import Head from 'next/head';

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Welcome to Perago</title>
        <meta name="description" content="Welcome to Perago" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main >
        {/* Hero Section */}
        <section className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-your-image.jpg)' }}>
          <div className="bg-gray-400 p-10 rounded-lg text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Welcome to Perago</h1>
            <p className="text-xl text-white mb-8">Your journey to a better you starts here.</p>
            <a href="/positions" className="bg-blue-500 text-white py-3 px-6 rounded-lg text-lg hover:bg-blue-600">Get Started</a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;

import React from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <h1>Home</h1>
        <p>This is the home page.</p>
      </main>

      <Footer />
    </>
  );
}

export default Home;

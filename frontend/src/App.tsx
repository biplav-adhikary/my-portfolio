import { ActiveSectionProvider } from "./context/ActiveSectionContext";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SkipToMain from "./components/layout/SkipToMain";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Experience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <ThemeProvider>
      <ActiveSectionProvider>
        <div className="grain-overlay">
          <SkipToMain />
          <Navbar />
          <main id="main-content" tabIndex={-1} className="outline-none">
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </div>
      </ActiveSectionProvider>
    </ThemeProvider>
  );
}

export default App;

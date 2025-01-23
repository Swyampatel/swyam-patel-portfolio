import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Moon, Sun, Download, Send, Mail, MapPin } from 'lucide-react';
import TypewriterComponent from 'typewriter-effect';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, sectionId]));
            if (entry.intersectionRatio > 0.5) {
              setActiveSection(sectionId);
            }
          }
        });
      },
      { threshold: [0.1, 0.5] }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const skills = {
    Languages: ['Python', 'Java', 'Kotlin', 'Swift', 'JavaScript', 'SQL'],
    Frameworks: ['TensorFlow', 'Flask', 'React.js', 'Docker', 'Kubernetes', 'TailwindCSS', 'MongoDB']
  };

  const projects = [
    {
      title: 'Finance Tracker',
      description: 'Full-stack finance tracker using Kotlin, React, and Spring Boot with secure authentication and data visualization.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=1000',
      tags: ['Kotlin', 'React', 'Spring Boot', 'Chart.js'],
      github: 'https://github.com/Swyampatel/ai_expense_tracker'
    },
    {
      title: 'News Sentiment Analyzer',
      description: 'News headline sentiment analysis using BeautifulSoup and TextBlob with Matplotlib visualizations.',
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000',
      tags: ['Python', 'BeautifulSoup', 'TextBlob', 'Matplotlib'],
      github: 'https://github.com/Swyampatel/News-Sentiment-Analyzer'
    },
    {
      title: 'AI Book Recommendation System',
      description: 'Personalized book recommendation system using TF-IDF vectorization with optimized web scraping.',
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=1000',
      tags: ['Python', 'TF-IDF', 'Machine Learning', 'Web Scraping'],
      github: 'https://github.com/Swyampatel/BookBuddy-AI-Powered-Book-Recommendation-System'
    },
    {
      "title": "Automated Resume Screening with NLP and Machine Learning",
      "description": "AI-powered resume screening app using keyword matching and BERT-based classification to match resumes with job roles.",
      "image": "https://static.jobscan.co/blog/uploads/533x340_01_new.png",
      "tags": ["Python", "Flask", "NLP", "Machine Learning"],
      "github": "https://github.com/Swyampatel/automated-resume-screening"
    },
    {
      "title": "Weather Prediction Application",
      "description": "Predicts rainfall using a linear regression model based on temperature and humidity, with real-time weather data fetched via WeatherStack API.",
      "image": "https://www.snexplores.org/wp-content/uploads/2019/11/860_main_weather_and_prediction.png",
      "tags": ["Python", "Flask", "Machine Learning", "API Integration"],
      "github": "https://github.com/Swyampatel/weather-prediction-app"
    },
    {
      "title": "AI Stock Price Prediction",
      "description": "Predicts stock prices using LSTM models with historical data fetched from Yahoo Finance, visualizing actual vs. predicted prices.",
      "image": "https://github.com/Swyampatel/ai-stock-price-prediction/raw/main/prediction_plot.png",
      "tags": ["Python", "TensorFlow", "LSTM", "Time-Series Analysis"],
      "github": "https://github.com/Swyampatel/ai-stock-price-prediction"
    }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <nav className="fixed w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Swyam Patel
            </span>
            <div className="hidden md:flex items-center space-x-8">
              {['about', 'projects','experience', 'skills', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  className={`capitalize transition-colors duration-300 ${
                    activeSection === section
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  {section}
                </a>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {darkMode ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section
        id="about"
        className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-opacity duration-800 ${
          visibleSections.has('about') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{
          background: darkMode
            ? 'linear-gradient(135deg, #1a1a1a 0%, #2d3748 100%)'
            : 'linear-gradient(135deg, #f7fafc 0%, #edf2f7 100%)'
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-tight tracking-tight bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
              Tech Director &<br className="sm:hidden" /> AI Engineer
            </h1>
            <div className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 h-20 max-w-3xl mx-auto">
              <TypewriterComponent
                options={{
                  strings: [
                    'Driving innovation through AI/ML solutions',
                    'Building scalable cloud systems',
                    'Full-stack development expert'
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 50,
                  deleteSpeed: 30,
                }}
              />
            </div>
            <div className="flex justify-center items-center space-x-6 py-8">
              <a
                href="https://linkedin.com/in/swyampatel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group transform hover:scale-110"
              >
                <Linkedin className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-all duration-300 group-hover:text-blue-500" />
              </a>
              <a
                href="https://github.com/Swyampatel"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group transform hover:scale-110"
              >
                <Github className="w-6 h-6 text-gray-800 dark:text-white transition-all duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-200" />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4">
              <a
                href="#contact"
                className="px-8 py-4 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-64 sm:w-auto"
              >
                Get in Touch
              </a>
              <a
                href="https://drive.google.com/file/d/1jvJkDYZW1TOxPZtghd-yWGaHaubeSSnI/view?usp=sharing"
                className="px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg w-64 sm:w-auto flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className={`py-24 px-4 bg-gray-100 dark:bg-gray-800 transition-all duration-800 ${
          visibleSections.has('projects') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-700 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-gray-800 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-300 hover:shadow-lg group"
                  >
                    <Github className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                    View Code
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
  id="experience"
  className={`py-24 px-4 transition-all duration-800 ${
    visibleSections.has('experience') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`}
>
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent">
      Experience
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src="https://media.licdn.com/dms/image/v2/D560BAQG2wHYDgKCkIQ/company-logo_200_200/company-logo_200_200/0/1696644259146/mlcapital_logo?e=1745452800&v=beta&t=7PBfgnaRcw8FfvpSOJ7Adep3GAslmqi1xWBk_1DNHt8"
          alt="Tesla"
          className="h-12 w-auto mb-4"
        />
        <h3 className="text-xl font-bold dark:text-white">Tech Director</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">ML Capital</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Remote (Toronto, ON, CA)
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Oct 2024 – Present</p>
        
      </div>
      {/* Card 2 */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src="https://www.oshawacentre.com/media/v1/356/2022/08/Mobilinq-mobile-cellphone-repair-accessories-logo.png"
          alt="AWS"
          className="h-12 w-auto mb-4"
        />
        <h3 className="text-xl font-bold dark:text-white">Cloud Engineer Intern</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Mobilinq</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Remote (Toronto, ON, CA)
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Apr 2024 – Sept 2024
        </p>
        
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
        <img
          src="https://www.vaughanmills.com/media/v1/360/2022/08/MobileCare_Logo_c05Vt7k-scaled-2.jpg"
          alt="AWS"
          className="h-12 w-auto mb-4"
        />
        <h3 className="text-xl font-bold dark:text-white">Store Manager</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Mobile Care</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          London, On, CA
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Sept 2022 – Mar 2024
        </p>
        
      </div>
      {/* Additional cards here */}
    </div>
  </div>
</section>


      <section
        id="skills"
        className={`py-24 px-4 transition-all duration-800 ${
          visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 via-purple-500 to-blue-600 bg-clip-text text-transparent animate-gradient-x">
            Skills
          </h2>
          <div className="space-y-16">
            {Object.entries(skills).map(([category, skillList], categoryIndex) => (
              <div
                key={category}
                className={`transition-all duration-500`}
                style={{ animationDelay: `${categoryIndex * 200}ms` }}
              >
                <h3 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {category}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {skillList.map((skill, index) => (
                    <div
                      key={skill}
                      style={{ animationDelay: `${index * 100}ms` }}
                      className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20"
                    >
                      <div className="relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <p className="text-center text-lg font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {skill}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={`py-24 px-4 transition-all duration-800 ${
          visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Let's Collaborate!
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6 dark:text-white">Get in Touch</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail className="w-5 h-5 mr-3" />
                  <span>Patelswyam80@gmail.com</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="w-5 h-5 mr-3" />
                  <span>New Jersey, United States</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <a
                  href="https://linkedin.com/in/swyampatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300"
                >
                  <Linkedin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </a>
                <a
                  href="https://github.com/Swyampatel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 transition-colors duration-300"
                >
                  <Github className="w-5 h-5 text-gray-800 dark:text-white" />
                </a>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 text-gray-800 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 text-gray-800 dark:text-white transition-colors duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-600 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900 focus:ring-0 text-gray-800 dark:text-white transition-colors duration-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
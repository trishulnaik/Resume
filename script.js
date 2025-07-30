document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 70, // Adjust for fixed header if any
                  behavior: 'smooth'
              });
          }
      });
  });

  // Scroll-triggered animations for sections
  const sections = document.querySelectorAll('.section.reveal');
  const options = {
      threshold: 0.1 // Trigger when 10% of the section is visible
  };

  const revealSection = (entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('active');
              // observer.unobserve(entry.target); // Optional: Unobserve once animated
          } else {
              // Optional: Remove 'active' class when out of view to re-animate on scroll back
              // entry.target.classList.remove('active');
          }
      });
  };

  const sectionObserver = new IntersectionObserver(revealSection, options);
  sections.forEach(section => {
      sectionObserver.observe(section);
  });

  // Chatbot functionality
  const chatbotIcon = document.getElementById('chatbot-icon');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');

  // Toggle chatbot visibility
  chatbotIcon.addEventListener('click', () => {
      chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
      if (chatbotContainer.style.display === 'flex') {
          // If opening, auto-scroll to bottom and focus input
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
          chatbotInput.focus();
      }
  });

  chatbotCloseBtn.addEventListener('click', () => {
      chatbotContainer.style.display = 'none';
  });

  function addMessage(message, sender) {
      const messageElement = document.createElement('div');
      messageElement.classList.add('message', `${sender}-message`);
      messageElement.textContent = message;
      chatbotMessages.appendChild(messageElement);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll to the latest message
  }

  function showTypingIndicator() {
      const typingDiv = document.createElement('div');
      typingDiv.classList.add('typing-indicator', 'bot-message'); // Apply bot-message styling
      typingDiv.innerHTML = `<span></span><span></span><span></span>`;
      chatbotMessages.appendChild(typingDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      return typingDiv;
  }

  function removeTypingIndicator(indicator) {
      if (indicator && chatbotMessages.contains(indicator)) {
          chatbotMessages.removeChild(indicator);
      }
  }

  // Initial bot message (only if chatbot is visible, or when it opens for the first time)
  // To ensure the welcome message appears only once per session or on first open
  let welcomeMessageShown = false;

  // Modified to show welcome message when chatbot is opened if not already shown
  chatbotIcon.addEventListener('click', () => {
      if (chatbotContainer.style.display === 'flex' && !welcomeMessageShown) {
          addMessage("Hello! I'm Bannoth Trishul Naik's virtual assistant. How can I help you today?", 'bot');
          welcomeMessageShown = true;
      }
  });


  const respondToUser = (message) => {
      const lowerCaseMessage = message.toLowerCase();
      let botResponse = '';

      if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('reach out') || lowerCaseMessage.includes('email') || lowerCaseMessage.includes('phone')) {
          botResponse = "You can contact Bannoth Trishul Naik via email at trishulnaikbannoth@gmail.com or call/message at +91-8127842321.";
      } else if (lowerCaseMessage.includes('skills') || lowerCaseMessage.includes('technologies')) {
          botResponse = "Bannoth Trishul Naik's key skills include Full Stack Development (React, Node.js, MongoDB), Observability (Datadog, Prometheus), Containerization (Docker, Kubernetes), Cloud (AWS), and Scripting (JavaScript, Shell Scripting, Terraform).";
      } else if (lowerCaseMessage.includes('experience') || lowerCaseMessage.includes('work')) {
          botResponse = "Bannoth Trishul Naik has experience as a Front-End Engineer and Performance & Reliability Engineer at Times Internet Limited, and also freelances as a Digital Marketing Expert and Tech Consultant.";
      } else if (lowerCaseMessage.includes('projects')) {
          botResponse = "Some notable projects include an SRE Monitoring App with Prometheus + Grafana (MERN Stack), a Gamified MBA Learning Platform (in progress), and an ERP-Based Financial Case Study Game.";
      } else if (lowerCaseMessage.includes('education') || lowerCaseMessage.includes('academics')) {
          botResponse = "Bannoth Trishul Naik holds an MBA from Osmania University and a Bachelor of Technology from the Indian Institute of Information Technology, Allahabad.";
      } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
          botResponse = "You're welcome! Is there anything else I can assist you with?";
      } else if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hey')) {
          botResponse = "Hello there! How can I help you?";
      }
      else {
          botResponse = "I'm sorry, I can only provide information from Bannoth Trishul Naik's resume. You can ask about contact details, skills, experience, projects, or education.";
      }

      const typingIndicator = showTypingIndicator();
      setTimeout(() => {
          removeTypingIndicator(typingIndicator);
          addMessage(botResponse, 'bot');
      }, 1500); // Simulate typing delay
  };

  chatbotSend.addEventListener('click', () => {
      const userMessage = chatbotInput.value.trim();
      if (userMessage) {
          addMessage(userMessage, 'user');
          chatbotInput.value = '';
          respondToUser(userMessage);
      }
  });

  chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
          chatbotSend.click();
      }
  });
});
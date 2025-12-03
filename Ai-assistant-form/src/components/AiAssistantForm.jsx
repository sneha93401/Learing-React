import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { sendAIMessage } from "../Services/geminiservices";
import { speak } from "../utils/tts";
import { ClockArrowDown } from "lucide-react";
import '../components/AiAssitant.css'
import AiImg from '../assets/Ai-character1.png';

import ModelViewer from "../components/ModelViewer";


function TypewriterText({ text, speed = 25, onComplete }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  return <span>{displayedText}</span>;
}

function AiAssistantForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    phone_number: "",
    city: "",
  });

  const [messages, setMessages] = useState([
    // { role: "ai", text: "Hi! I'm your friendly AI assistant. Let's fill out this form together. First, what's your name?", isTyping: true }
  ]);

  useEffect(() => {
  const init = async () => {
    // first message for AI – you can send empty or a small system hint
    const aiReply = await sendAIMessage("start", {
      currentStep: "name",
      formData,
      mode: "form",
    });

    setMessages([
      {
        role: "ai",
        text: aiReply || "Hi! I'm your friendly AI assistant. Let's fill out this form together. First, what's your name?",
        isTyping: true,
      },
    ]);

    if (window.speechSynthesis) speak(aiReply);
  };

  init();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const [currentStep, setCurrentStep] = useState(0);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [status, setStatus] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [appState, setAppState] = useState({
  mode: "form", 
  lastValidatedStep: -1,
  appreciatedName: false
});

const validators = {
  name: val => val.trim().length >= 2,
  city: val => val.trim().length > 0,
  age: val => /^\d+$/.test(val) && Number(val) > 0 && Number(val) <= 50,
  email: val =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
  phone_number: val => /^\d{10}$/.test(val.trim())
};

  const STEPS = [
    { id: 'name', question: 'What\'s your name?', icon: '👤' },
    { id: 'city', question: 'Which city are you from?', icon: '🏙️' },
    { id: 'age', question: 'How old are you?', icon: '🎂' },
    { id: 'phone_number', question: 'What\'s your phone number?', icon: '📱' },
    { id: 'email', question: 'What\'s your email address?', icon: '📧' }
  ];

  const handleUserAnswer = async (answer) => {
  if (!answer.trim()) return;

  const step = STEPS[currentStep];

  if (appState.mode === "form") {
    const isValid = validators[step.id]?.(answer);
    if (!isValid) {
      setMessages(prev => [
        ...prev, 
        {
          role: "ai",
          text: `Oops! Please enter a valid ${step.id === "phone_number" ? "10-digit phone number" : step.id}.`,
          isTyping: false
        }
      ]);
      return; 
    }
  }

  // Add user message
  setMessages(prev => [...prev, { role: "user", text: answer, isTyping: false }]);
  setInputValue("");

  // Update formData if form mode
  if (appState.mode === "form") {
    const updatedFormData = { ...formData, [step.id]: answer };
    setFormData(updatedFormData);
  }

  // AI response
  setIsAIThinking(true);
  try {
    // Compose context with new state info to guide Gemini AI to handle both Q&A and form
    const aiResponse = await sendAIMessage(answer, {
      currentStep: STEPS[currentStep].id,
      formData,
      nextStep: STEPS[currentStep + 1]?.id || null,
      mode: appState.mode,
      appreciatedName: appState.appreciatedName,
    });

    setMessages(prev => [...prev, { role: "ai", text: aiResponse, isTyping: true }]);

    if (window.speechSynthesis) speak(aiResponse);

    if (appState.mode === "form") {
      if (!appState.appreciatedName && STEPS[currentStep].id === "name") {
        setAppState(prev => ({ ...prev, appreciatedName: true }));
      }
      setCurrentStep(currentStep + 1);
      if (currentStep + 1 >= STEPS.length) {
        setAppState(prev => ({ ...prev, mode: "complete" }));
        await saveToSupabase(formData);
      }
    } else {
      // No other changes
    }
  } catch (error) {
    setMessages(prev => [...prev, { role: "ai", text: "Sorry, something went wrong. Please try again.", isTyping: false }]);
  } finally {
    setIsAIThinking(false);
  }
};

  const saveToSupabase = async (data) => {
    const { error } = await supabase.from("formData").insert([data]);
    if (error) {
      setStatus("Save failed!");
    } else {
      setStatus(" Form completed and saved!");
      setMessages(prev => [...prev, {
        role: "ai",
        text: "Great! Your form is complete and saved. Thank you!",
        isTyping: true
      }]);
    }
  };

  return (
    <div className="ai-form-container">
      <div className="ai-form-card">
        {/* Header */}
        <div className="ai-form-header">
          <div className="header-gradient-overlay"></div>
          <h2 className="header-title"><img className="img-AI1" src={AiImg}  alt="AI Character"/> AI Assistant Form</h2>
          <div className="progress-bar">
            {STEPS.map((step, idx) => (
              <div 
                key={idx} 
                className={`progress-step ${idx <= currentStep ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-wrapper ${msg.role}`}>
              {msg.role === "ai" && (
                <div className="ai-avatar"><img className="img-AI" src={AiImg}  alt="AI Character"/></div>
              )}
              <div className={`message-bubble ${msg.role}`}>
                {msg.isTyping ? (
                  <TypewriterText text={msg.text} speed={30} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          {isAIThinking && (
            <div className="message-wrapper ai">
              <div className="ai-avatar"><img className="img-AI" src={AiImg}  alt="AI Character"/></div>
              <div className="message-bubble ai thinking">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="input-area">
          <div className="input-wrapper">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={`${STEPS[currentStep]?.icon || '💬'} Type your answer...`}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && inputValue.trim()) {
                  handleUserAnswer(inputValue);
                }
              }}
              disabled={isAIThinking}
              className="input-field"
            />
            <button
              onClick={() => inputValue.trim() && handleUserAnswer(inputValue)}
              disabled={isAIThinking || !inputValue.trim()}
              className="send-button"
            >
              {isAIThinking ? <ClockArrowDown /> : "Send"} {isAIThinking}
            </button>
          </div>

          {status && (
            <p className={`status-message ${status.includes("✅") ? 'success' : 'error'}`}>
              {status}
            </p>
          )}
        </div>
      </div>

      <ModelViewer />
    </div>
  );
}

export default AiAssistantForm;
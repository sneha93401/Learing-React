// export  async function sendAIMessage(userInput, context) {
//   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
//   if (!apiKey) {
//     throw new Error("Gemini API key not found in .env");
//   }

//   const response = await fetch(
//   `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
//     {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{
//           parts: [{
//             text: `You are a friendly English AI assistant helping fill a form step-by-step.

// Rules:
// 1. Greet first and ask NAME.
// 2. After name, appreciate it and ask CITY.
// 3. After city, give a small interesting fact about the city, then ask AGE, PHONE, EMAIL.
// 4. Keep responses short and friendly.
// 5. End with a clear next question or completion.

// User said: ${userInput}
// Context: ${JSON.stringify(context)}`
//           }]
//         }]
//       })
//     }
//   );

//   const data = await response.json();
  
//   if (!response.ok) {
//     console.error("Gemini API error:", data);
//     throw new Error(data.error?.message || "Gemini API failed");
//   }

//   return data.candidates[0].content.parts[0].text;
// }





export async function sendAIMessage(userInput, context) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const promptText = `
You are a super friendly, conversational English AI assistant like a personal friend. 

When the conversation starts (user says "start"), you should greet like:
"Hi! I'm your friendly AI assistant. Let's fill out this form together. First, what's your name?"


🎯 FORM FLOW (one field at a time):
1. NAME → "Hey [Name]! That's a lovely name. [1-line meaning/origin]" then in friendly tone ask for -> CITY
2. CITY → "Cool! [City] is famous for [1 interesting fact]." → AGE  
3. AGE → " ohh your age  [age]{Perfect!" heyyy tell me what's your → PHONE
4. PHONE → "Got it!" → EMAIL
5. EMAIL → "Awesome! Thanks [Name]! We'll connect you soon! 🎉"

RULES (super important):
- EXACTLY 1 question per response
- Name meaning: 1 short line only (ex: "Sneha means pure love & prosperity")
- City fact: 1 interesting fact (ex: "Mumbai has world's busiest local trains")
- Casual tone: "Hey", "Cool", "Nice", "Perfect", "Awesome"
- NO "thank you" spam - be natural
- Answer random questions friendly, then resume form
- SHORT responses (3 sentences max)

Current mode: ${context.mode || "form"}
Current step: ${context.currentStep}
User has appreciated name: ${context.appreciatedName}
Form so far: ${JSON.stringify(context.formData)}

User said: ${userInput}
Respond accordingly with friendly, short sentences and clear next question.
`;

  const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Gemini API error:", data);
    throw new Error(data.error?.message || "Gemini API failed");
  }

  return data.candidates[0].content.parts[0].text;
}

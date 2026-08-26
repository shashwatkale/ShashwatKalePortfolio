import { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, User, Minimize2, MessageSquare, Terminal } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Hello! I am Shashwat's AI Copilot. Ask me anything about his GenAI engineering experience at TCS, RAG architectures, MCP servers, or production projects!",
      time: 'Just now',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const knowledgeBase: { keywords: string[]; response: string }[] = [
    {
      keywords: ['jansetu', 'civic', 'complaint', 'vision', 'gemini'],
      response:
        'JanSetu AI is an AI-powered civic platform where citizens upload photos of road/infrastructure issues. Using Google Gemini 2.5 Flash Vision API, it classifies across 55 categories with 200+ keywords and automatically routes complaints to 20+ government departments (PWD, Traffic, Municipal Corp) in < 30 seconds. Built with React, FastAPI, AWS S3/Rekognition, and PostgreSQL.',
    },
    {
      keywords: ['tcs', 'experience', 'work', 'tata', 'role'],
      response:
        'Shashwat is an Associate System Engineer at Tata Consultancy Services (TCS) Hyderabad (Aug 2024 – Present). He designs and deploys custom GitHub Copilot agents, Model Context Protocol (MCP) servers, enterprise Agentic AI + RAG document intelligence pipelines, and structured JSON schemas to eliminate hallucinations.',
    },
    {
      keywords: ['rag', 'document', 'intelligence', 'faiss', 'langchain'],
      response:
        'Shashwat builds end-to-end Enterprise RAG pipelines featuring document ingestion, chunking, FAISS vector indexing, semantic retrieval, and structured JSON schema extraction. He optimizes context windows and prompt templates to minimize token usage and achieve zero hallucination.',
    },
    {
      keywords: ['mcp', 'model context protocol', 'copilot', 'agent', 'langgraph'],
      response:
        'Shashwat configures custom MCP (Model Context Protocol) servers to expose internal enterprise APIs and secure file systems to AI agents. He builds hierarchical LangGraph state machines for autonomous tool execution and multi-agent coordination.',
    },
    {
      keywords: ['certifications', 'aws', 'azure', 'databricks', 'claude', 'anthropic'],
      response:
        'Shashwat holds 7 top verified industry certifications: AWS Certified Machine Learning Engineer Associate, AWS AI Practitioner, Databricks Certified Generative AI Engineer, Claude Certified Developer Foundations (CCDV-F) Anthropic, and Microsoft Certified Azure AI Fundamentals & Azure Fundamentals.',
    },
    {
      keywords: ['interview', 'prep', 'platform'],
      response:
        'Shashwat built an AI Interview Preparation System using LangChain, Next.js, Python, and MS SQL Server. It generates role-specific technical questions and evaluates candidates across correctness, clarity, depth, and communication quality.',
    },
    {
      keywords: ['skills', 'stack', 'tech', 'technologies', 'tools', 'languages'],
      response:
        'Core Tech Stack:\n• AI/GenAI: LangGraph, LangChain, MCP Protocol, Gemini API, Claude API, FastAPI, FAISS, Qdrant, Pydantic\n• Full-Stack: Next.js, React, ASP.NET Core, C#, EF Core\n• Databases: PostgreSQL, MS SQL Server, Vector DBs\n• Cloud & DevOps: AWS (S3, Rekognition, RDS), GCP Vertex AI, Docker, GitHub Actions CI/CD.',
    },
    {
      keywords: ['contact', 'email', 'phone', 'hire', 'reach', 'linkedin', 'github'],
      response:
        'You can reach Shashwat directly at:\n• Email: shashwat.kale.27@gmail.com\n• LinkedIn: linkedin.com/in/shashwatkale27\n• GitHub: github.com/shashwatkale\n• Location: Hyderabad, India.',
    },
    {
      keywords: ['education', 'college', 'degree', 'university'],
      response:
        'Shashwat holds a B.Tech in Artificial Intelligence (2020 – 2024) from G.H. Raisoni College of Engineering, Nagpur.',
    },
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    audioEngine.playClick();
    const userMsg: Message = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Answer matching
    const lower = query.toLowerCase();
    let reply =
      "I specialize in Shashwat's GenAI background, MCP servers, enterprise RAG, and production projects. You can ask about JanSetu AI, his TCS experience, or contact information!";

    for (const item of knowledgeBase) {
      if (item.keywords.some((k) => lower.includes(k))) {
        reply = item.response;
        break;
      }
    }

    setTimeout(() => {
      audioEngine.playClick();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-auto flex flex-col items-end">
      {/* Expanded Chat Drawer */}
      {isOpen && (
        <div className="w-[92vw] sm:w-96 max-w-sm h-[480px] rounded-3xl bg-[#060814]/95 border border-cyan-500/40 backdrop-blur-2xl shadow-[0_10px_50px_rgba(0,240,255,0.25)] flex flex-col overflow-hidden mb-3 animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-cyan-950/60 to-black/80 border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <Bot className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-xs font-display font-bold text-white flex items-center gap-1.5">
                  <span>NEXUS AI COPILOT</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                </div>
                <div className="text-[9px] font-mono-tech text-cyan-400">SHASHWAT'S KNOWLEDGE AGENT</div>
              </div>
            </div>

            <button
              onClick={() => {
                audioEngine.playClick();
                setIsOpen(false);
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 font-mono-tech text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-lg bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-cyan-400" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed whitespace-pre-line ${
                    m.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-medium rounded-tr-none'
                      : 'bg-white/[0.04] border border-white/10 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {m.text}
                  <div
                    className={`text-[8px] mt-1 text-right ${
                      m.sender === 'user' ? 'text-cyan-950/70' : 'text-slate-500'
                    }`}
                  >
                    {m.time}
                  </div>
                </div>

                {m.sender === 'user' && (
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <div className="w-6 h-6 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <Bot className="w-3 h-3 text-cyan-400 animate-spin" />
                </div>
                <span className="animate-pulse">Synthesizing agent response...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts */}
          <div className="px-3 py-2 border-t border-white/5 bg-black/40 flex items-center gap-1.5 overflow-x-auto text-[10px] font-mono-tech scrollbar-none">
            {['JanSetu AI', 'TCS Experience', 'MCP & RAG', 'Certifications', 'Contact'].map(
              (prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 rounded-full bg-white/[0.04] hover:bg-cyan-500/15 border border-white/10 hover:border-cyan-400/40 text-cyan-300 whitespace-nowrap transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              )
            )}
          </div>

          {/* Prompt Input Box */}
          <div className="p-3 bg-black/80 border-t border-cyan-500/20 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Shashwat's GenAI work..."
              className="flex-1 bg-white/[0.04] border border-white/10 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs font-mono-tech text-white outline-none placeholder:text-slate-500"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold transition-all cursor-pointer shadow-[0_0_15px_rgba(0,240,255,0.4)]"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          audioEngine.playClick();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono-tech shadow-[0_0_30px_rgba(0,240,255,0.5)] border border-cyan-300/50 cursor-pointer transition-all transform hover:scale-105 group"
      >
        <div className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
        <Bot className="w-4 h-4 text-slate-950" />
        <span className="hidden sm:inline tracking-wider uppercase">
          {isOpen ? 'CLOSE COPILOT' : 'ASK AI COPILOT'}
        </span>
        <Sparkles className="w-3.5 h-3.5 text-slate-950" />
      </button>
    </div>
  );
}

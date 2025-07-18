import { PromptInputBox } from "../components/ui/ai-prompt-box";
import React, { useState } from "react";

const animalModels = [
  { label: "Bird (BirdNET)", value: "birds" },
  { label: "Dog (DogEmotions)", value: "dogs" },
  { label: "Cat (CatEmotion)", value: "cats" },
  { label: "Whale (ORCA-SPOT)", value: "whales" },
  { label: "Dolphin (DolphinGemma)", value: "dolphins" },
];

interface ChatMessage {
  role: "user" | "model";
  model: string;
  content: string;
  confidence?: number;
  species?: string;
  emotion?: string;
  status?: string;
  message?: string;
}

export default function Index() {
  const [selectedModel, setSelectedModel] = useState(animalModels[0].value);
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (message: string, files?: File[]) => {
    setChat((prev) => [
      ...prev,
      { role: "user", model: selectedModel, content: message }
    ]);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("input", message);
      if (files && files.length > 0) formData.append("file", files[0]);
      const res = await fetch(`http://localhost:4000/models/${selectedModel}/run`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setChat((prev) => [
        ...prev,
        {
          role: "model",
          model: selectedModel,
          content: data.message,
          confidence: data.confidence,
          species: data.species,
          emotion: data.emotion,
          status: data.status,
          message: data.message,
        },
      ]);
    } catch (e) {
      setChat((prev) => [
        ...prev,
        { role: "model", model: selectedModel, content: "Error: Could not analyze input." }
      ]);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-xl p-4">
        <div className="mb-4 flex gap-2 items-center">
          <label htmlFor="model-select" className="text-base font-medium text-gray-700 dark:text-gray-200">Animal Model:</label>
          <select
            id="model-select"
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className="rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#1F2023] px-3 py-2 text-base text-gray-900 dark:text-gray-100 focus:outline-none"
          >
            {animalModels.map(model => (
              <option key={model.value} value={model.value}>{model.label}</option>
            ))}
          </select>
        </div>
        <div className="mb-6">
          <div className="bg-[#23242a] rounded-xl p-4">
            <h2 className="text-lg font-semibold mb-2 text-white">Chat History</h2>
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {chat.map((msg, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#18191c] text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded bg-green-700/80 font-bold">{msg.model}</span>
                    {msg.confidence !== undefined && (
                      <span className="ml-auto text-xs text-green-400 font-bold">Confidence: {(msg.confidence * 100).toFixed(1)}%</span>
                    )}
                  </div>
                  <div className="text-sm">
                    <b>{msg.role === "user" ? "You:" : "Model:"}</b> {msg.content}
                  </div>
                  {msg.role === "model" && (
                    <div className="mt-1 text-xs text-gray-300">
                      {msg.species && <div><b>Species:</b> {msg.species}</div>}
                      {msg.emotion && <div><b>Emotion:</b> {msg.emotion}</div>}
                      {msg.status && <div><b>Status:</b> {msg.status}</div>}
                      {msg.message && <div><b>What it’s saying:</b> {msg.message}</div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <PromptInputBox onSend={handleSend} isLoading={isLoading} />
      </div>
    </div>
  );
} 
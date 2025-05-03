
import { useState, useEffect } from "react";

interface ApiKeys {
  openai?: string;
}

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKeys>(() => {
    const savedKeys = localStorage.getItem("cyberpulse_api_keys");
    return savedKeys ? JSON.parse(savedKeys) : {};
  });

  useEffect(() => {
    localStorage.setItem("cyberpulse_api_keys", JSON.stringify(apiKeys));
  }, [apiKeys]);

  const setOpenAiKey = (key: string) => {
    setApiKeys((prev) => ({ ...prev, openai: key }));
  };

  const hasOpenAiKey = () => !!apiKeys.openai;

  const getOpenAiKey = () => apiKeys.openai;

  const clearKeys = () => {
    setApiKeys({});
  };

  return {
    setOpenAiKey,
    hasOpenAiKey,
    getOpenAiKey,
    clearKeys
  };
};

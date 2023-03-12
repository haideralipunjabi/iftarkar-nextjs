import { useState, useEffect } from "react";

export function useInstallable() {
  const [promptTrigger, setPromptTrigger] = useState();
  const handlePrompt = (e) => {
    e.preventDefault();
    setPromptTrigger(e);
  };
  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
    };
  });
  return promptTrigger;
}

export function useApple() {
  const [isApple, setIsApple] = useState(false);
  useEffect(() => {
    if (
      ["iPhone", "iPad", "iPod"].includes(navigator.platform) &&
      !navigator.standalone
    ) {
      setIsApple(true);
    }
  }, []);
  return isApple;
}

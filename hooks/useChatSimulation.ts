"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/lib/chatScripts";

interface UseChatSimulation {
  messages: ChatMessage[];
  isTyping: boolean;
  /** True once the whole script has played through. */
  done: boolean;
  reset: () => void;
}

const DEFAULT_TYPING = 1000;

/**
 * Drives a scripted chat sequence. While `running` is true it walks the script:
 * waits `delay`, shows the typing indicator (agent only) for `typingDuration`,
 * then pushes the message into the visible list. Returns the current state and
 * a `reset` to replay.
 */
export function useChatSimulation(
  script: ChatMessage[],
  running: boolean,
): UseChatSimulation {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [done, setDone] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const [runId, setRunId] = useState(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimers();
    setMessages([]);
    setIsTyping(false);
    setDone(false);
    setRunId((id) => id + 1);
  }, [clearTimers]);

  useEffect(() => {
    if (!running) return;

    // Restart the sequence from scratch on each run. Reset state off the
    // effect body (setState inside a timer, not synchronously).
    clearTimers();
    timers.current.push(
      setTimeout(() => {
        setMessages([]);
        setIsTyping(false);
        setDone(false);
      }, 0),
    );

    let elapsed = 0;

    script.forEach((message) => {
      elapsed += message.delay;

      if (message.role === "agent") {
        const typing = message.typingDuration ?? DEFAULT_TYPING;
        // Show typing indicator at `elapsed`.
        timers.current.push(
          setTimeout(() => setIsTyping(true), elapsed),
        );
        elapsed += typing;
        // Then reveal the message and hide the indicator.
        timers.current.push(
          setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [...prev, message]);
          }, elapsed),
        );
      } else {
        timers.current.push(
          setTimeout(() => {
            setMessages((prev) => [...prev, message]);
          }, elapsed),
        );
      }
    });

    timers.current.push(setTimeout(() => setDone(true), elapsed + 400));

    return clearTimers;
    // runId forces a fresh run after reset(); script/running drive normal starts.
  }, [running, script, runId, clearTimers]);

  return { messages, isTyping, done, reset };
}

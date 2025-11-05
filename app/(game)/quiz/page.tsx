"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGame } from "@/lib/providers/GameProvider";
import { candidates } from "@/lib/data/candidates";
import { quizData } from "@/lib/data/questions";
import ProgressBar from "@/components/game/ProgressBar";
import QuizOption from "@/components/game/QuizOption";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function QuizPage() {
  const router = useRouter();
  const { state, dispatch } = useGame();
  const { selectedCandidateId, currentQuestionIndex } = state;
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const candidate = useMemo(
    () => candidates.find((c) => c.id === selectedCandidateId),
    [selectedCandidateId]
  );

  const questions = useMemo(() => {
    if (!selectedCandidateId) return [];
    return quizData[selectedCandidateId] || [];
  }, [selectedCandidateId]);

  const currentQuestion = useMemo(() => {
    return questions[currentQuestionIndex];
  }, [questions, currentQuestionIndex]);

  const totalQuestions = questions.length;

  useEffect(() => {
    if (!state.isGameStarted || !state.selectedCandidateId) {
      router.replace("/allocate");
      return;
    }
    if (state.isGameFinished) {
      router.replace("/results");
      return;
    }
  }, [state.isGameStarted, state.isGameFinished, state.selectedCandidateId, router]);

  const handleContinue = () => {
    if (selectedOption === null) return;

    dispatch({
      type: "ANSWER_QUESTION",
      payload: { optionIndex: selectedOption },
    });
    setSelectedOption(null);
  };

  if (!candidate) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-muted-foreground">Loading candidate...</p>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-2">
          <p className="text-muted-foreground">Question not found.</p>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
          >
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4">
      <div className="mt-6 border border-gray-200 rounded-2xl bg-white shadow-sm p-6 space-y-4">
      <Link
        href="/allocate"
        className="flex items-center gap-2 text-sm font-semibold mb-2 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </Link>

      <div className="flex items-center gap-3">
        <Image
          src={candidate.avatar}
          alt={candidate.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <h2 className="font-bold">{candidate.name}</h2>
          <p className="text-xs text-muted-foreground">
            {candidate.partyShort}
          </p>
        </div>
      </div>

      <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <Image
                  src="/imgs/Bihar_district_map.png"
                  alt="India Map"
                  width={393}
                  height={221}
                  className="w-full h-full object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-semibold leading-snug">
                {currentQuestion.situation}
              </h3>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <QuizOption
                    key={index}
                    number={index + 1}
                    text={option.text}
                    selected={selectedOption === index}
                    onSelect={() => setSelectedOption(index)}
                    aria-label={`Option ${index + 1}: ${option.text.substring(0, 50)}...`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="pt-2">
        <Button
          size="lg"
          className="w-full"
          onClick={handleContinue}
          disabled={selectedOption === null}
          aria-label={
            selectedOption === null
              ? "Please select an option to continue"
              : "Continue to next question"
          }
        >
          {currentQuestionIndex < totalQuestions - 1 ? "Continue" : "View Results"}
        </Button>
      </div>
      </div>
    </div>
  );
}

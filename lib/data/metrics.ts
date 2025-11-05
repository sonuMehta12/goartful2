// data/metrics.ts
import { Metric } from "@/lib/types/game";
import { Landmark, Users, UserRound, ShieldCheck, TrendingUp } from "lucide-react";

export const gameMetrics: Metric[] = [
  { id: "voteBank", label: "Vote Bank", icon: Landmark, color: "orange" },
  { id: "youthAppeal", label: "Youth Appeal", icon: Users, color: "green" },
  { id: "womenVoters", label: "Women Voters", icon: UserRound, color: "pink" },
  { id: "credibility", label: "Credibility", icon: ShieldCheck, color: "blue" },
  { id: "momentum", label: "Momentum", icon: TrendingUp, color: "red" },
];

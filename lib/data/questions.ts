// data/questions.ts
import { Question, Candidate } from "@/lib/types/game";

type QuizData = Record<Candidate["id"], Question[]>;

export const quizData: QuizData = {
  "nitish-kumar": [
    {
      situation:
        "The campaign enters its final, crucial weeks. Pre-election polls show a dead heat. Which path do you choose?",
      options: [
        {
          text: "Launch 'Naya Bihar': A forward-looking campaign focusing on development, technology, and job creation.",
          effects: {
            youthAppeal: 10,
            credibility: 5,
            voteBank: -2,
            womenVoters: 2,
          },
        },
        {
          text: "Solidify 'Samajik Nyay': Double down on social justice, consolidating traditional caste vote banks.",
          effects: {
            voteBank: 10,
            womenVoters: 5,
            youthAppeal: -5,
            credibility: -2,
          },
        },
        {
          text: "Emphasize 'Vikas aur Virasat': A hybrid campaign blending your development record with soft nationalism.",
          effects: {
            voteBank: 5,
            credibility: 2,
            momentum: 5,
            youthAppeal: -3,
          },
        },
      ],
    },
    {
      situation:
        "A massive, spontaneous student protest against government exam paper leaks erupts in Patna. How do you respond?",
      options: [
        {
          text: "Meet the protestors personally. Acknowledge their grievance and promise a high-level, time-bound inquiry.",
          effects: { credibility: 10, youthAppeal: 5, momentum: -5 },
        },
        {
          text: "Issue a firm statement blaming the opposition for orchestrating the protest.",
          effects: { voteBank: 5, credibility: -10, youthAppeal: -10 },
        },
        {
          text: "Ignore the protest and create a diversion. Announce a massive 'Startup Bihar' fund.",
          effects: { momentum: 5, youthAppeal: 2, credibility: -8 },
        },
      ],
    },
    {
      situation:
        "A major infrastructure project is delayed due to corruption allegations. Your opponents are using this to attack your 'development' narrative. How do you respond?",
      options: [
        {
          text: "Order a swift, transparent investigation and suspend officials pending inquiry.",
          effects: {
            credibility: 12,
            momentum: -3,
            voteBank: -2,
          },
        },
        {
          text: "Deflect blame onto the previous government and highlight other successful projects.",
          effects: {
            voteBank: 8,
            credibility: -5,
            momentum: 5,
          },
        },
        {
          text: "Announce a new, even larger infrastructure initiative to shift focus.",
          effects: {
            momentum: 8,
            youthAppeal: 5,
            credibility: -8,
            voteBank: -3,
          },
        },
      ],
    },
    {
      situation:
        "A coalition partner threatens to withdraw support unless you concede to their demands on a key policy. How do you handle this?",
      options: [
        {
          text: "Negotiate behind closed doors, finding a middle ground that maintains coalition unity.",
          effects: {
            voteBank: 10,
            momentum: 5,
            credibility: -3,
          },
        },
        {
          text: "Stand firm on your position, risking coalition breakdown but showing leadership.",
          effects: {
            credibility: 10,
            momentum: -5,
            voteBank: -8,
          },
        },
        {
          text: "Publicly acknowledge the partner's concerns while privately working on a compromise.",
          effects: {
            credibility: 5,
            voteBank: 3,
            momentum: 3,
          },
        },
      ],
    },
    {
      situation:
        "The final week of campaigning. Polls show a tight race. Where do you focus your final push?",
      options: [
        {
          text: "Intensive door-to-door campaigning in your strongholds to maximize turnout.",
          effects: {
            voteBank: 15,
            momentum: 8,
            youthAppeal: -5,
          },
        },
        {
          text: "Large public rallies targeting undecided voters in swing constituencies.",
          effects: {
            momentum: 12,
            voteBank: 5,
            credibility: 3,
          },
        },
        {
          text: "Media blitz and social media campaign focusing on your development achievements.",
          effects: {
            youthAppeal: 10,
            credibility: 8,
            voteBank: -3,
            momentum: 5,
          },
        },
      ],
    },
  ],
  "tejashwi-yadav": [
    {
      situation:
        "Your core team presents two divergent strategies for the opening gambit. Which path will you choose?",
      options: [
        {
          text: "Focus on a forward-looking 'Jobs and Development' agenda.",
          effects: { youthAppeal: 15, credibility: 5, voteBank: -3 },
        },
        {
          text: "Double down on 'Social Justice' and the Caste Census demand.",
          effects: { voteBank: 15, youthAppeal: -5, momentum: 5 },
        },
      ],
    },
    {
      situation:
        "A central agency reopens an old land-for-jobs case involving your family. How do you respond to this crisis?",
      options: [
        {
          text: "Dismiss it as a politically-motivated attack and pivot back to your development agenda.",
          effects: { credibility: 5, momentum: 5, youthAppeal: 2 },
        },
        {
          text: "Launch a direct counter-attack detailing recent corruption allegations against NDA ministers.",
          effects: { momentum: 10, credibility: -5, voteBank: 5 },
        },
      ],
    },
    {
      situation:
        "Your party's traditional vote bank is showing signs of fragmentation, with younger voters questioning old loyalties. How do you address this?",
      options: [
        {
          text: "Reinforce traditional social justice messaging and mobilize party veterans.",
          effects: {
            voteBank: 12,
            youthAppeal: -8,
            momentum: 5,
          },
        },
        {
          text: "Launch a 'Youth Wing' initiative with fresh faces and modern messaging.",
          effects: {
            youthAppeal: 15,
            voteBank: -5,
            momentum: 8,
          },
        },
        {
          text: "Blend traditional appeal with new promises - 'Justice for All, Development for Bihar'.",
          effects: {
            voteBank: 8,
            youthAppeal: 8,
            credibility: 5,
            momentum: 3,
          },
        },
      ],
    },
    {
      situation:
        "A viral video of you making an unguarded comment during a private meeting circulates online. How do you manage the fallout?",
      options: [
        {
          text: "Issue an immediate apology and clarify the context, showing accountability.",
          effects: {
            credibility: 8,
            momentum: -5,
            voteBank: -3,
          },
        },
        {
          text: "Dismiss it as a deepfake and threaten legal action against those spreading it.",
          effects: {
            momentum: 5,
            credibility: -10,
            voteBank: 3,
          },
        },
        {
          text: "Ignore it and pivot to discussing your policy agenda, hoping it fades away.",
          effects: {
            momentum: -3,
            credibility: -5,
            youthAppeal: -5,
          },
        },
      ],
    },
    {
      situation:
        "Election day approaches. Your internal polling shows you're leading but the margin is narrow. What's your final strategy?",
      options: [
        {
          text: "Focus on your core constituencies, ensuring maximum turnout from your base.",
          effects: {
            voteBank: 18,
            momentum: 10,
            youthAppeal: -5,
          },
        },
        {
          text: "Target opposition strongholds with aggressive campaigning to flip votes.",
          effects: {
            momentum: 12,
            voteBank: -8,
            credibility: 5,
          },
        },
        {
          text: "Launch a last-minute 'development promise' announcement to capture undecided voters.",
          effects: {
            youthAppeal: 10,
            credibility: -5,
            momentum: 8,
            voteBank: 3,
          },
        },
      ],
    },
  ],
  "prashant-kishor": [
    {
      situation:
        "As Prashant Kishor, you must set the campaign's core narrative. What is your focus?",
      options: [
        {
          text: "Launch a broad-based 'Naya Bihar' campaign focused on good governance and economic development.",
          effects: { youthAppeal: 10, credibility: 10, momentum: 5 },
        },
        {
          text: "Double down on the 'clean politics' message, exposing the criminal links of established politicians.",
          effects: { credibility: 15, momentum: 8, voteBank: -5 },
        },
        {
          text: "Focus on mobilizing specific, neglected communities like agricultural and migrant workers.",
          effects: { voteBank: 12, momentum: 5, youthAppeal: -5 },
        },
      ],
    },
    {
      situation:
        "A spontaneous sugarcane farmers' protest over delayed payments has paralyzed the Tirhut region. How do you intervene?",
      options: [
        {
          text: "Immediately travel to the protest site and sit with the farmers, becoming the face of their struggle.",
          effects: { voteBank: 15, momentum: 10, credibility: 5 },
        },
        {
          text: "Use your network to expand the protest to other agricultural sectors, turning it into a statewide agitation.",
          effects: { momentum: 15, voteBank: 10, credibility: -5 },
        },
        {
          text: "Stay in Patna but issue a detailed policy paper on agricultural reforms.",
          effects: { credibility: 10, youthAppeal: 5, momentum: -8 },
        },
      ],
    },
    {
      situation:
        "Your campaign gains momentum, but established parties launch personal attacks questioning your 'outsider' status and lack of ground-level political experience. How do you counter this?",
      options: [
        {
          text: "Embrace the 'outsider' label, positioning yourself as a fresh alternative to career politicians.",
          effects: {
            credibility: 10,
            youthAppeal: 12,
            voteBank: -5,
            momentum: 8,
          },
        },
        {
          text: "Highlight your extensive work with successful political campaigns as proof of understanding governance.",
          effects: {
            credibility: 15,
            momentum: 5,
            voteBank: 3,
          },
        },
        {
          text: "Attack back, exposing the corruption and failures of established politicians.",
          effects: {
            momentum: 10,
            credibility: -3,
            voteBank: 5,
            youthAppeal: 8,
          },
        },
      ],
    },
    {
      situation:
        "A key policy announcement receives mixed reactions - praised by urban voters but criticized by rural communities. How do you respond?",
      options: [
        {
          text: "Stand by the policy, explaining its long-term benefits for all sections.",
          effects: {
            credibility: 10,
            voteBank: -8,
            youthAppeal: 8,
            momentum: -3,
          },
        },
        {
          text: "Modify the policy to address rural concerns while keeping urban support.",
          effects: {
            voteBank: 8,
            credibility: 5,
            momentum: 5,
            youthAppeal: -3,
          },
        },
        {
          text: "Pause the policy announcement and consult with diverse stakeholders first.",
          effects: {
            credibility: 8,
            voteBank: 5,
            momentum: -5,
          },
        },
      ],
    },
    {
      situation:
        "The final stretch of the campaign. You need to maximize voter turnout, especially among first-time and young voters. What's your approach?",
      options: [
        {
          text: "Organize massive youth rallies with music, celebrities, and social media influencers.",
          effects: {
            youthAppeal: 18,
            momentum: 15,
            voteBank: -5,
            credibility: -3,
          },
        },
        {
          text: "Focus on door-to-door campaigns with detailed policy discussions.",
          effects: {
            credibility: 12,
            voteBank: 10,
            youthAppeal: -5,
            momentum: 5,
          },
        },
        {
          text: "Launch a digital campaign with viral challenges and policy explainer videos.",
          effects: {
            youthAppeal: 15,
            credibility: 8,
            momentum: 10,
            voteBank: -3,
          },
        },
      ],
    },
  ],
};

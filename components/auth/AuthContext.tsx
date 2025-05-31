// components/auth/AuthContext.tsx
// Ensure the UserProfile interface here includes at least:
// uid, email, displayName, photoURL, role, profileComplete
// (Your provided AuthContext already does this well)

"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleAuthProvider, db } from "@/lib/config/firebase"; // Adjust the import path as needed
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  DocumentData, // Keep this if UserProfile extends it
  Timestamp, // Explicit import for Timestamp type
  FieldValue, // Explicit import for FieldValue type
} from "firebase/firestore";
import { useRouter } from "next/navigation";

// Define the shape of your custom user profile data from Firestore
// This should align with lib/types/user.ts or be the source of truth
export interface UserProfile extends DocumentData {
  // Extends DocumentData if you use its methods directly
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role?: "artist" | "user" | "admin"; // Consistent roles
  profileComplete?: boolean; // Specifically for artists
  createdAt?: Timestamp | FieldValue;
  updatedAt?: Timestamp | FieldValue;
  // Add other fields from your ArtistProfileCompletionForm if UserMenu or Navbar needs them
  phoneNumber?: string | null;
  city?: string | null;
  portfolioLink?: string | null;
  tagline?: string | null;
  bio?: string | null;
  // artExperience?: string | null; // Only if needed directly in UserMenu/Navbar
}

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true); // Set loading true at the start of auth check
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(db, "users", firebaseUser.uid);
        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserProfile(userDocSnap.data() as UserProfile);
          } else {
            const newUserProfileData: UserProfile = {
              // Explicitly type this
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              role: "user", // Default role
              profileComplete: false,
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(), // Also set updatedAt on creation
            };
            await setDoc(userDocRef, newUserProfileData);
            setUserProfile(newUserProfileData);
          }
        } catch (error) {
          console.error("Error fetching/creating user profile:", error);
          // Decide how to handle this error, maybe set userProfile to a default error state or null
          setUserProfile(null);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true); // Indicate loading during sign-in attempt
    try {
      await signInWithPopup(auth, googleAuthProvider);
      // onAuthStateChanged will handle the rest: setting user, userProfile, and setLoading(false)
      // No explicit navigation here, let pages decide based on auth state
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      // Potentially show a toast notification to the user
      setUser(null); // Ensure user state is null if sign-in fails
      setUserProfile(null);
      setLoading(false); // Ensure loading is false on error
    }
  };

  const signOutUser = async () => {
    // Renamed to avoid conflict if you import firebaseSignOut directly
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      // onAuthStateChanged will set user & userProfile to null and setLoading(false)
      router.push("/"); // Navigate to home after sign out
    } catch (error) {
      console.error("Error signing out:", error);
      // Potentially show a toast
      setLoading(false); // Ensure loading is reset on error
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signOut: signOutUser, // Use the renamed function
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

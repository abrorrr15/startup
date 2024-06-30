"use client";

import { useState } from "react";
import StoreSignup from "@/app/_adminUI/StoreSignup";
import "../../styles.css";
const SignupPage = () => {
  const [showStoreForm, setShowStoreForm] = useState(false);

  const handleSignupComplete = () => {
    setShowStoreForm(true);
  };

  return (
    <div className="background min-h-screen flex items-center justify-center">
      <StoreSignup />
    </div>
  );
};

export default SignupPage;

"use client";

import React, { useState, useEffect, Suspense } from "react";
import Script from "next/script";
import { useSearchParams } from "next/navigation";

// Allow window.FB and window.fbAsyncInit to be recognized by TypeScript
declare global {
  interface Window {
    fbAsyncInit: any;
    FB: any;
  }
}

function WhatsAppConnectContent() {
  const searchParams = useSearchParams();
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, loading, exchanging, success, error
  const [errorMsg, setErrorMsg] = useState("");
  
  const [authCode, setAuthCode] = useState<string | null>(null);
  const [signupData, setSignupData] = useState<any>(null);

  // Initialize FB SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "2290666861778395",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v26.0",
      });
      setSdkLoaded(true);
    };

    if (window.FB) {
      window.FB.init({
        appId: "2290666861778395",
        autoLogAppEvents: true,
        xfbml: true,
        version: "v26.0",
      });
      setSdkLoaded(true);
    }

    return () => {
      delete window.fbAsyncInit;
    };
  }, []);

  // Listen for Meta Embedded Signup messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.facebook.com") return;

      try {
        const data = typeof event.data === "string" ? JSON.parse(event.data) : event.data;
        if (!data || data.type !== "WA_EMBEDDED_SIGNUP") return;
        
        if (data.event === "CANCEL") {
          setStatus("error");
          setErrorMsg("WhatsApp signup was cancelled.");
        } else if (data.event === "ERROR") {
          setStatus("error");
          setErrorMsg("An error occurred during WhatsApp Embedded Signup.");
        } else {
          setSignupData(data);
        }
      } catch (error) {
        // Ignore parsing errors from other extensions
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  // Execute Server-side Token Exchange
  useEffect(() => {
    if (authCode && signupData && status === "exchanging") {
      const exchangeToken = async () => {
        try {
          const wabaId = signupData?.data?.waba_id || signupData?.waba_id || "";
          const phoneNumberId = signupData?.data?.phone_number_id || signupData?.phone_number_id || "";
          const displayPhoneNumber = signupData?.data?.phone_number || signupData?.display_phone_number || "";
          const verifiedName = signupData?.data?.verified_name || signupData?.verified_name || "";
          
          // Extracts the schoolId from the URL query parameters
          const schoolId = searchParams.get("schoolId");

          if (!schoolId) {
             setStatus("error");
             setErrorMsg("Missing School ID in the URL. Cannot connect WhatsApp.");
             return;
          }

          const payload = {
            code: authCode,
            schoolId,
            wabaId,
            phoneNumberId,
            displayPhoneNumber,
            verifiedName
          };

          // Uses a relative path because it's hosted on the same backend!
          const response = await fetch("/api/whatsapp/embedded-signup/exchange/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (response.ok && result.success) {
            setStatus("success");
          } else {
            setStatus("error");
            setErrorMsg(result.message || "Backend token exchange failed.");
          }
        } catch (error) {
          setStatus("error");
          setErrorMsg("Failed to connect to the backend server.");
        }
      };

      exchangeToken();
    }
  }, [authCode, signupData, status, searchParams]);

  const handleConnect = () => {
    if (!window.FB) {
      setStatus("error");
      setErrorMsg("Facebook SDK is not loaded yet. Please wait a moment and try again.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    setSignupData(null);
    setAuthCode(null);

    window.FB.login(
      (response: any) => {
        if (response?.authResponse?.code) {
          setAuthCode(response.authResponse.code);
          setStatus("exchanging");
        } else {
          setStatus("error");
          setErrorMsg("Login was cancelled or authorization was not completed.");
        }
      },
      {
        config_id: "2655838821499638",
        response_type: "code",
        override_default_response_type: true,
        extras: {
          version: "v4",
          sessionInfoVersion: "3"
        },
      }
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 font-sans">
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Connect WhatsApp</h1>
        <p className="text-gray-600">
          Connect your school's WhatsApp Business Account to enable seamless communication with students and instructors.
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex flex-col items-center text-center space-y-4 py-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Meta WhatsApp Embedded Signup
          </h2>
          <p className="max-w-md text-sm text-gray-600">
            Click the button below to launch the secure Meta popup. You can connect an existing WhatsApp Business profile or create a new one.
          </p>

          <div className="pt-4 w-full max-w-sm">
            <button
              onClick={handleConnect}
              disabled={status === "loading" || status === "exchanging" || !sdkLoaded}
              className="w-full bg-[#25D366] hover:bg-[#1DA851] disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {status === "loading" ? "Connecting..." : status === "exchanging" ? "Finalizing connection..." : !sdkLoaded ? "Loading..." : "Connect WhatsApp"}
            </button>
          </div>
        </div>
      </div>

      {status === "error" && (
        <div className="mt-6 border border-red-200 bg-red-50 text-red-700 px-4 py-3 rounded-lg">
          <strong>Connection Failed:</strong> {errorMsg}
        </div>
      )}

      {status === "success" && (
        <div className="mt-6 border border-green-200 bg-green-50 text-green-700 px-4 py-3 rounded-lg">
          <strong>WhatsApp Connected Successfully!</strong> You can now close this window and return to School-Desk.
        </div>
      )}
    </div>
  );
}

// Next.js App Router requires Suspense for useSearchParams
export default function WhatsAppConnectPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <WhatsAppConnectContent />
    </Suspense>
  );
}

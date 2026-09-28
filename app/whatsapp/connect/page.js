"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useState, useRef } from "react";

function WhatsAppConnectContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const accesstoken = searchParams.get("accesstoken");
  const businessName = searchParams.get("businessName");

  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const waDataRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      // Listen for the specific message from the Meta popup
      if (event.data?.type === "WA_EMBEDDED_SIGNUP") {
        waDataRef.current = event.data;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  if (!accesstoken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Unauthorized access</h2>
          <p className="text-gray-600">Missing authorization token.</p>
        </div>
      </div>
    );
  }

  const handleConnect = () => {
    if (!window.FB) {
      setError("Facebook SDK not loaded. Please try again.");
      return;
    }

    setLoading(true);
    setError(null);
    waDataRef.current = null; // Reset previously captured data

    window.FB.login(
      (response) => {
        if (response.authResponse) {
          const authCode = response.authResponse.code;
          
          // Wait briefly to ensure the message event has been processed
          setTimeout(async () => {
            const waData = waDataRef.current;

            try {
              const res = await fetch("/api/whatsapp/embedded-signup/exchange/", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${accesstoken}`,
                },
                body: JSON.stringify({
                  code: authCode,
                  schoolId: id,
                  wabaId: waData?.waba_id,
                  phoneNumberId: waData?.phone_number_id,
                  displayPhoneNumber: waData?.phone_number,
                  verifiedName: waData?.verified_name,
                }),
              });

              if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Server responded with status ${res.status}`);
              }

              setSuccess(true);
            } catch (err) {
              console.error("Exchange error:", err);
              setError(err.message || "Failed to link WhatsApp account.");
            } finally {
              setLoading(false);
            }
          }, 1000); // 1 second delay to ensure postMessage arrives from the popup
        } else {
          setError("User cancelled login or did not fully authorize.");
          setLoading(false);
        }
      },
      {
        config_id: "2655838821499638",
        response_type: "code",
        override_default_response_type: true,
        extras: {
          version: "v4",
          sessionInfoVersion: "3",
        },
      }
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.FB) {
            window.FB.init({
              appId: "2290666861778395",
              xfbml: true,
              version: "v26.0",
            });
            setIsLoaded(true);
          }
        }}
      />
      
      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Connect WhatsApp
        </h1>
        
        {businessName && (
          <p className="text-gray-600 mb-6 text-center">
            Link WhatsApp to <strong>{businessName}</strong>
          </p>
        )}

        {!businessName && <div className="mb-6"></div>}

        {success ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-md text-center border border-green-200">
            <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="font-bold text-xl mb-2">Successfully Connected!</h3>
            <p className="text-sm">Your WhatsApp account has been linked successfully. You can now close this window and return to the application.</p>
          </div>
        ) : (
          <>
            <button
              onClick={handleConnect}
              disabled={!isLoaded || loading}
              className={`w-full py-3 px-4 rounded-md font-semibold text-white transition-all shadow-sm
                ${
                  !isLoaded || loading
                    ? "bg-blue-400 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-800"
                }
              `}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connecting...
                </span>
              ) : !isLoaded ? (
                "Loading SDK..."
              ) : (
                "Connect WhatsApp"
              )}
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md text-sm border border-red-200 flex items-start">
                <svg className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}
            
            <p className="text-xs text-gray-500 mt-6 text-center">
              By connecting, you agree to our terms and conditions and privacy policy. This will open a secure Meta popup.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function WhatsAppConnectPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full text-center">
          <svg className="animate-spin mx-auto h-8 w-8 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading connection page...</p>
        </div>
      </div>
    }>
      <WhatsAppConnectContent />
    </Suspense>
  );
}

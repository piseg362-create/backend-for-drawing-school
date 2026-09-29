"use client";

import { useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useState, useRef } from "react";

function WhatsAppConnectContent() {
  const searchParams = useSearchParams();

  const schoolId =
    searchParams.get("schoolId") ||
    searchParams.get("id");

  const userId = searchParams.get("userId");
  const accessToken = searchParams.get("accessToken");
  const businessName = searchParams.get("businessName");

  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const waDataRef = useRef(null);

  // ------------------------------------------------
  // URL DEBUG LOG
  // ------------------------------------------------
  useEffect(() => {
    console.log("========== WHATSAPP CONNECT DEBUG ==========");

    console.log("Current URL:", window.location.href);

    console.log("Query Parameters:", {
      schoolId,
      userId,
      businessName,
      hasAccessToken: !!accessToken,
    });

    console.log("============================================");
  }, [schoolId, userId, businessName, accessToken]);

  // ------------------------------------------------
  // META POSTMESSAGE LISTENER
  // ------------------------------------------------
  useEffect(() => {
    const handleMessage = (event) => {
      console.log("========== POSTMESSAGE RECEIVED ==========");
      console.log("Origin:", event.origin);
      console.log("Raw event.data:", event.data);

      // Only accept Meta
      if (
        event.origin !== "https://www.facebook.com" &&
        event.origin !== "https://web.facebook.com"
      ) {
        console.log("❌ Ignored message from unknown origin");
        return;
      }

      let data = event.data;

      // Sometimes Meta sends JSON string
      if (typeof data === "string") {
        try {
          data = JSON.parse(data);
          console.log("Parsed string message:", data);
        } catch (error) {
          console.log("❌ Could not parse event.data as JSON");
          return;
        }
      }

      if (data?.type !== "WA_EMBEDDED_SIGNUP") {
        console.log("Not a WhatsApp Embedded Signup event");
        return;
      }

      console.log("✅ WA_EMBEDDED_SIGNUP EVENT");
      console.log("Full Meta event:", data);

      console.log("Meta event type:", data.event);
      console.log("Meta event data:", data.data);

      if (data.event === "FINISH") {
        const signupData = data.data || {};

        const parsedWhatsAppData = {
          wabaId: signupData.waba_id,
          phoneNumberId: signupData.phone_number_id,
          displayPhoneNumber:
            signupData.display_phone_number ||
            signupData.phone_number,
          verifiedName: signupData.verified_name,
        };

        console.log("========== FINAL WHATSAPP DATA ==========");
        console.log("WABA ID:", parsedWhatsAppData.wabaId);
        console.log(
          "Phone Number ID:",
          parsedWhatsAppData.phoneNumberId
        );
        console.log(
          "Display Phone:",
          parsedWhatsAppData.displayPhoneNumber
        );
        console.log(
          "Verified Name:",
          parsedWhatsAppData.verifiedName
        );
        console.log("==========================================");

        waDataRef.current = parsedWhatsAppData;
      }
    };

    window.addEventListener("message", handleMessage);

    console.log("✅ WhatsApp postMessage listener attached");

    return () => {
      window.removeEventListener("message", handleMessage);
      console.log("WhatsApp postMessage listener removed");
    };
  }, []);

  if (!accessToken) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Unauthorized access
          </h2>

          <p className="text-gray-600">
            Missing authorization token.
          </p>
        </div>
      </div>
    );
  }

  // ------------------------------------------------
  // CONNECT WHATSAPP
  // ------------------------------------------------
  const handleConnect = () => {
    console.log("========== CONNECT CLICKED ==========");

    console.log("School ID:", schoolId);
    console.log("User ID:", userId);
    console.log("Has Access Token:", !!accessToken);

    if (!schoolId) {
      console.error("❌ SCHOOL ID IS MISSING");
      setError("School ID is missing.");
      return;
    }

    if (!window.FB) {
      console.error("❌ Facebook SDK not loaded");
      setError("Facebook SDK not loaded. Please try again.");
      return;
    }

    console.log("✅ Facebook SDK available");

    setLoading(true);
    setError(null);

    // Clear previous data
    waDataRef.current = null;

    console.log("Opening Meta Embedded Signup...");

    window.FB.login(
      (response) => {
        console.log("========== FB LOGIN RESPONSE ==========");
        console.log("FB response:", response);

        if (response.authResponse) {
          const authCode = response.authResponse.code;

          console.log("✅ Meta authorization successful");

          console.log(
            "Authorization code received:",
            authCode ? "YES" : "NO"
          );

          setTimeout(async () => {
            console.log(
              "========== CHECKING META SIGNUP DATA =========="
            );

            const waData = waDataRef.current;

            console.log("Stored WhatsApp data:", waData);

            if (!waData) {
              console.error(
                "❌ WhatsApp Embedded Signup data not received"
              );

              setError(
                "WhatsApp signup data was not received from Meta."
              );

              setLoading(false);
              return;
            }

            if (!waData.wabaId) {
              console.error("❌ WABA ID missing");
              setError(
                "WhatsApp Business Account ID was not received from Meta."
              );
              setLoading(false);
              return;
            }

            if (!waData.phoneNumberId) {
              console.error("❌ Phone Number ID missing");
              setError(
                "WhatsApp Phone Number ID was not received from Meta."
              );
              setLoading(false);
              return;
            }

            if (!schoolId) {
              console.error("❌ School ID missing");
              setError("School ID is missing.");
              setLoading(false);
              return;
            }

            const payload = {
              code: authCode,
              schoolId,
              wabaId: waData.wabaId,
              phoneNumberId: waData.phoneNumberId,
              displayPhoneNumber:
                waData.displayPhoneNumber || null,
              verifiedName:
                waData.verifiedName || null,
            };

            console.log("========== BACKEND PAYLOAD ==========");
            console.log({
              ...payload,
              code: payload.code ? "PRESENT" : "MISSING",
            });
            console.log("======================================");

            try {
              console.log(
                "Sending request to embedded-signup exchange..."
              );

              const res = await fetch(
                "/api/whatsapp/embedded-signup/exchange/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                  },
                  body: JSON.stringify(payload),
                }
              );

              console.log(
                "Backend HTTP status:",
                res.status
              );

              const responseData = await res
                .json()
                .catch(() => ({}));

              console.log(
                "Backend response:",
                responseData
              );

              if (!res.ok) {
                throw new Error(
                  responseData.message ||
                    `Server responded with status ${res.status}`
                );
              }

              console.log(
                "✅ WhatsApp account connected successfully"
              );

              setSuccess(true);
            } catch (err) {
              console.error(
                "❌ Exchange error:",
                err
              );

              setError(
                err.message ||
                  "Failed to link WhatsApp account."
              );
            } finally {
              setLoading(false);
            }
          }, 1000);
        } else {
          console.log(
            "❌ User cancelled Meta login"
          );

          setError(
            "User cancelled login or did not fully authorize."
          );

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
          console.log(
            "========== FACEBOOK SDK LOADED =========="
          );

          if (window.FB) {
            window.FB.init({
              appId: "2290666861778395",
              xfbml: true,
              version: "v26.0",
            });

            console.log("✅ Facebook SDK initialized");

            setIsLoaded(true);
          } else {
            console.error(
              "❌ Facebook SDK object not found"
            );
          }
        }}
      />

      <div className="p-8 bg-white rounded-lg shadow-md max-w-md w-full">

        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Connect WhatsApp
        </h1>

        {businessName && (
          <p className="text-gray-600 mb-6 text-center">
            Link WhatsApp to{" "}
            <strong>{businessName}</strong>
          </p>
        )}

        {success ? (
          <div className="bg-green-50 text-green-700 p-6 rounded-md text-center border border-green-200">
            <h3 className="font-bold text-xl mb-2">
              Successfully Connected!
            </h3>

            <p className="text-sm">
              Your WhatsApp account has been linked
              successfully.
            </p>
          </div>
        ) : (
          <>
            <button
              onClick={handleConnect}
              disabled={!isLoaded || loading}
              className={`w-full py-3 px-4 rounded-md font-semibold text-white ${
                !isLoaded || loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading
                ? "Connecting..."
                : !isLoaded
                ? "Loading SDK..."
                : "Connect WhatsApp"}
            </button>

            {error && (
              <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md text-sm border border-red-200">
                {error}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function WhatsAppConnectPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <WhatsAppConnectContent />
    </Suspense>
  );
}
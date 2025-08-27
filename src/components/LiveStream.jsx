import React, { useRef, useEffect, forwardRef, useState } from "react";
import clsx from "clsx";

const LiveStream = forwardRef(
  ({ webrtcUrl, demoVideo, onClick, isFocused, isDoubled, isSibling }, ref) => {
    const videoRef = useRef();
    const [streamStatus, setStreamStatus] = useState("loading");
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
      if (!webrtcUrl) {
        setStreamStatus("error");
        if (videoRef.current) {
          videoRef.current.src = demoVideo;
          videoRef.current.srcObject = null;
        }
        return;
      }

      setStreamStatus("loading");

      const pc = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      pc.addTransceiver("video", { direction: "recvonly" });

      pc.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
          setStreamStatus("success");
        }
      };

      pc.oniceconnectionstatechange = () => {
        if (pc.iceConnectionState === "failed") {
          console.error("ICE connection failed.");
          setStreamStatus("error");
        }
      };

      pc.createOffer()
        .then((offer) => pc.setLocalDescription(offer))
        .then(() => {
          fetch(webrtcUrl, {
            method: "POST",
            headers: { "Content-Type": "application/sdp" },
            body: pc.localDescription.sdp,
          })
            .then((res) => {
              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }
              return res.text();
            })
            .then((answerSdp) => {
              pc.setRemoteDescription({ type: "answer", sdp: answerSdp });
            })
            .catch((err) => {
              console.error("WebRTC connection failed:", err);
              setStreamStatus("error");
            });
        })
        .catch((err) => {
          console.error("WebRTC offer creation failed:", err);
          setStreamStatus("error");
        });

      return () => {
        pc.close();
      };
    }, [webrtcUrl, reloadCount]);

    const handleReload = () => {
      setReloadCount((prev) => prev + 1);
    };

    const containerClasses = clsx(
      "aspect-video w-full transition-all duration-500 ease-in-out relative overflow-hidden",
      {
        "border-4 border-blue-500": isFocused,
        "border-transparent": !isFocused,
        "w-[900px] max-w-none z-20": isDoubled,
        hidden: isSibling,
        "max-w-[500px] min-w-[400px]": !isDoubled && !isSibling,
      }
    );

    return (
      <div onClick={onClick} ref={ref} className={containerClasses}>
        {streamStatus === "success" ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            playsInline
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
            {streamStatus === "loading" && <p>Loading live feed...</p>}
            {streamStatus === "error" && (
              <div className="flex flex-col items-center gap-4 p-4">
                <p className="text-red-500 text-center">
                  Failed to load stream.
                </p>
                <button
                  onClick={handleReload}
                  className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
                >
                  Reload
                </button>
              </div>
            )}
          </div>
        )}

        {isFocused && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded">
            Focused
          </span>
        )}
      </div>
    );
  }
);

export default LiveStream;

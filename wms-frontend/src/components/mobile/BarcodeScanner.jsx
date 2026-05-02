import React, { useEffect, useState, useRef } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { X, RefreshCw, Camera } from 'lucide-react';

const BarcodeScanner = ({ onScanSuccess, onClose }) => {
  const [cameras, setCameras] = useState([]);
  const [currentCameraId, setCurrentCameraId] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef(null);
  const scannerContainerId = "reader";

  useEffect(() => {
    // Initialize the scanner instance
    html5QrCodeRef.current = new Html5Qrcode(scannerContainerId);

    const config = {
      fps: 20, // Higher FPS for smoother tracking
      qrbox: (viewfinderWidth, viewfinderHeight) => {
        // Dynamic qrbox: 80% of width, 50% of height
        return { 
          width: viewfinderWidth * 0.8, 
          height: viewfinderHeight * 0.5 
        };
      },
      aspectRatio: window.innerHeight / window.innerWidth, // Match screen aspect ratio
      videoConstraints: {
        facingMode: "environment",
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
        focusMode: "continuous" // Attempt to force continuous focus
      },
      formatsToSupport: [ 
        Html5QrcodeSupportedFormats.QR_CODE,
        Html5QrcodeSupportedFormats.EAN_13,
        Html5QrcodeSupportedFormats.EAN_8,
        Html5QrcodeSupportedFormats.CODE_128,
        Html5QrcodeSupportedFormats.CODE_39,
        Html5QrcodeSupportedFormats.UPC_A,
        Html5QrcodeSupportedFormats.UPC_E,
        Html5QrcodeSupportedFormats.ITF
      ]
    };

    // Try to start with back camera directly
    setIsScanning(true);
    html5QrCodeRef.current.start(
      { facingMode: "environment" },
      config,
      (decodedText) => {
        onScanSuccess(decodedText);
      },
      (errorMessage) => { /* quiet */ }
    ).then(() => {
      // Successfully started, now get cameras for the "Switch" feature
      Html5Qrcode.getCameras().then(devices => {
        if (devices && devices.length > 0) {
          setCameras(devices);
          // Find which one is currently active if possible, or just use the first one as a baseline
          setCurrentCameraId(devices[0].id);
        }
      });
    }).catch(err => {
      console.error("Camera start error:", err);
      setIsScanning(false);
      
      // Detailed error for user
      let userMsg = "LỖI CAMERA: ";
      if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        userMsg += "Trình duyệt yêu cầu HTTPS để bật Camera. Vui lòng dùng link https://";
      } else if (err.includes("NotAllowedError") || err.includes("Permission denied")) {
        userMsg += "Bạn đã chặn quyền truy cập Camera. Vui lòng vào cài đặt trình duyệt để cho phép.";
      } else {
        userMsg += "Không thể khởi tạo camera. Lỗi: " + err;
      }
      alert(userMsg);
    });

    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = (cameraId) => {
    if (!html5QrCodeRef.current) return;
    
    setIsScanning(true);
    html5QrCodeRef.current.start(
      cameraId,
      {
        fps: 10,
        qrbox: { width: 250, height: 150 },
        formatsToSupport: [ 
          Html5QrcodeSupportedFormats.QR_CODE,
          Html5QrcodeSupportedFormats.EAN_13,
          Html5QrcodeSupportedFormats.EAN_8,
          Html5QrcodeSupportedFormats.CODE_128,
          Html5QrcodeSupportedFormats.CODE_39,
          Html5QrcodeSupportedFormats.UPC_A,
          Html5QrcodeSupportedFormats.UPC_E,
          Html5QrcodeSupportedFormats.ITF
        ]
      },
      (decodedText) => {
        onScanSuccess(decodedText);
      },
      (errorMessage) => {
        // Silently fail for scan errors
      }
    ).catch(err => {
      console.error("Failed to start scanner", err);
      setIsScanning(false);
    });
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      try {
        await html5QrCodeRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        console.error("Failed to stop scanner", err);
      }
    }
  };

  const switchCamera = async () => {
    if (cameras.length < 2) return;
    
    await stopScanner();
    
    const currentIndex = cameras.findIndex(c => c.id === currentCameraId);
    const nextIndex = (currentIndex + 1) % cameras.length;
    const nextCameraId = cameras[nextIndex].id;
    
    setCurrentCameraId(nextCameraId);
    startScanner(nextCameraId);
  };

  return (
    <div className="fixed-top vh-100 vw-100 bg-black z-3 d-flex flex-column">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center p-3 text-white z-2">
        <div className="d-flex align-items-center gap-2">
           <Camera size={20} className="text-primary" />
           <h6 className="mb-0 fw-bold">QUÉT MÃ VẠCH / QR</h6>
        </div>
        <button className="btn btn-link text-white p-0" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      
      {/* Viewport */}
      <div className="flex-grow-1 position-relative d-flex align-items-center justify-content-center bg-black overflow-hidden">
        <div id={scannerContainerId} style={{ width: '100%', height: '100%' }}></div>
        
        {/* Subtle Frame Corners - Shifted Upwards slightly */}
        <div className="position-absolute z-2" style={{ width: '80%', height: '50%', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
           <div className="position-absolute top-0 start-0 w-4 h-4 border-top border-start border-primary border-4"></div>
           <div className="position-absolute top-0 end-0 w-4 h-4 border-top border-end border-primary border-4"></div>
           <div className="position-absolute bottom-0 start-0 w-4 h-4 border-bottom border-start border-primary border-4"></div>
           <div className="position-absolute bottom-0 end-0 w-4 h-4 border-bottom border-end border-primary border-4"></div>
           
           {/* Transparent Scanning Line Overlay inside the frame */}
           <div className="position-absolute w-100 h-1 bg-primary shadow-lg animate-scan" style={{ opacity: 0.6 }}></div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="p-4 bg-dark bg-opacity-90 d-flex flex-column gap-3 align-items-center z-2">
        {cameras.length > 1 && (
          <button 
            className="btn btn-outline-light rounded-pill px-4 py-2 d-flex align-items-center gap-2 fs-8 fw-bold"
            onClick={switchCamera}
          >
            <RefreshCw size={16} /> ĐỔI CAMERA
          </button>
        )}
        <p className="fs-8 mb-0 text-white opacity-75">
          {isScanning ? "Đang tìm mã vạch..." : "Đang khởi tạo camera..."}
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        #reader video {
          width: 100% !important;
          height: 100% !important;
          object-fit: cover !important;
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}} />
    </div>
  );
};

export default BarcodeScanner;

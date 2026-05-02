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

    // Get available cameras
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length > 0) {
        setCameras(devices);
        
        // Prefer back camera (environment)
        const backCamera = devices.find(device => 
          device.label.toLowerCase().includes('back') || 
          device.label.toLowerCase().includes('rear') ||
          device.label.toLowerCase().includes('environment')
        );
        
        const initialCameraId = backCamera ? backCamera.id : devices[0].id;
        setCurrentCameraId(initialCameraId);
        startScanner(initialCameraId);
      }
    }).catch(err => {
      console.error("Error getting cameras", err);
      alert("Không tìm thấy camera hoặc chưa cấp quyền.");
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
        
        {/* Overlay scanning frame */}
        <div className="position-absolute border border-primary border-4 rounded-3" 
             style={{ width: '250px', height: '150px', pointerEvents: 'none', boxShadow: '0 0 0 1000px rgba(0,0,0,0.5)' }}>
          <div className="position-absolute top-0 start-0 w-100 h-2 bg-primary animate-scan"></div>
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

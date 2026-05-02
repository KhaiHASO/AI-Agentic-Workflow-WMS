import React, { useState, useEffect } from 'react';
import MobileLayout from './MobileLayout';
import { useNavigate } from 'react-router-dom';
import { Scan, AlertCircle, CheckCircle2, MoreVertical, Split, ChevronRight, Camera } from 'lucide-react';
import { mockApi } from '../../data/mockApi';
import BarcodeScanner from './BarcodeScanner';
import { db } from '../../data/centralizedDataStore';

const InboundDraft = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState('');
  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastScanned, setLastScanned] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    loadDraft();
  }, []);

  const loadDraft = async () => {
    const data = await mockApi.getDraftLines('MR-001');
    setLines(data);
  };

  const processScanResult = async (decodedText) => {
    setLoading(true);
    try {
      const result = await mockApi.submitScan('MR-001', decodedText);
      // Simulate updating the line in UI
      const newLines = lines.map(line => {
        if (line.itemId === result.item.id) {
          const newQty = line.scannedQty + 1;
          let status = 'Partial';
          if (newQty >= line.expectedQty) status = 'Done';
          return { ...line, scannedQty: newQty, status };
        }
        return line;
      });
      setLines(newLines);
      setLastScanned(result.item);
      setBarcode('');
      setShowCamera(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScan = async (e) => {
    e.preventDefault();
    if (!barcode) return;
    await processScanResult(barcode);
  };

  const handleSubmit = () => {
    if (!lines.some(l => l.scannedQty > 0)) {
      alert('Chưa có hàng nào được quét!');
      return;
    }
    if (window.confirm('Xác nhận hoàn tất và nhập kho Staging?')) {
      db.submitReceipt('MR-001', lines);
      alert('Đã nhập kho thành công! Tồn kho đã được cập nhật.');
      navigate('/mobile');
    }
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'done': return 'status-done';
      case 'partial': return 'status-partial';
      case 'error': return 'status-error';
      default: return 'status-pending';
    }
  };

  return (
    <MobileLayout 
      title="Quét hàng - Draft MR-001" 
      footer={
        <button className="btn-mobile-primary" onClick={handleSubmit}>
          HOÀN TẤT DRAFT (SUBMIT)
        </button>
      }
    >
      {showCamera && (
        <BarcodeScanner 
          onScanSuccess={processScanResult} 
          onClose={() => setShowCamera(false)} 
        />
      )}

      {/* Scan Area */}
      <div className="scan-input-area shadow-sm mb-4">
        <label className="text-muted-custom fs-8 fw-bold mb-2 d-block">QUÉT MÃ VẠCH (BARCODE)</label>
        <form onSubmit={handleScan} className="d-flex gap-2">
          <div className="position-relative flex-grow-1">
            <input 
              type="text" 
              className="form-control border-0 p-0 fs-5 fw-bold" 
              placeholder="Chờ quét..." 
              value={barcode}
              onChange={(e) => setBarcode(e.target.value)}
              autoFocus
            />
          </div>
          <button 
            type="button" 
            className="btn btn-dark rounded-pill p-2" 
            onClick={() => setShowCamera(true)}
          >
            <Camera size={20} />
          </button>
          <button type="submit" className="btn btn-primary rounded-pill p-2" disabled={loading}>
            <Scan size={20} />
          </button>
        </form>
      </div>

      {/* Last Scanned Feedback */}
      {lastScanned && (
        <div className="bg-white rounded-3 p-3 mb-4 border-start border-4 border-success shadow-sm d-flex justify-content-between align-items-center">
          <div>
            <div className="text-muted-custom fs-8">Vừa quét:</div>
            <div className="fw-bold">{lastScanned.name}</div>
          </div>
          <CheckCircle2 className="text-success" />
        </div>
      )}

      {/* Line List */}
      <div className="d-flex flex-column gap-2">
        <div className="d-flex justify-content-between align-items-center mb-2 px-1">
          <span className="fw-bold fs-7 uppercase">Danh sách Line ({lines.length})</span>
          <span className="text-muted-custom fs-8">MR-001 / Nhựa Việt</span>
        </div>

        {lines.map((line) => (
          <div 
            key={line.id} 
            className="bg-white rounded-3 p-3 shadow-sm border border-light"
            onClick={() => navigate(`/mobile/draft/${line.id}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex justify-content-between align-items-start mb-2">
              <div className="fw-bold fs-6">{line.itemId}</div>
              <div className="d-flex align-items-center gap-2">
                <span className={`status-badge-mobile ${getStatusClass(line.status)}`}>
                  {line.status === 'Done' ? 'Hoàn thành' : line.status === 'Partial' ? 'Một phần' : 'Chờ quét'}
                </span>
                <ChevronRight size={16} className="text-muted" />
              </div>
            </div>
            <div className="text-muted-custom fs-7 mb-3">Tên hàng: {line.itemName || 'Màng PE 5kg'}</div>
            
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between fs-8 mb-1">
                <span>Tiến độ</span>
                <span>{line.scannedQty} / {line.expectedQty} {line.unit || 'Cuộn'}</span>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div 
                  className={`progress-bar ${line.status === 'Done' ? 'bg-success' : 'bg-warning'}`} 
                  style={{ width: `${(line.scannedQty / line.expectedQty) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MobileLayout>
  );
};

export default InboundDraft;

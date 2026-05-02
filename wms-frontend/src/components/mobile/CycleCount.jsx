import React, { useState } from 'react';
import MobileLayout from './MobileLayout';
import { Scan, MapPin, ClipboardCheck, AlertTriangle, CheckCircle2, Search } from 'lucide-react';

const CycleCount = () => {
  const [step, setStep] = useState('select_loc'); // 'select_loc', 'counting', 'summary'
  const [loc, setLoc] = useState('');
  const [scannedItems, setScannedItems] = useState([]);
  const [barcode, setBarcode] = useState('');

  const startCounting = () => {
    if (!loc) return alert('Vui lòng quét hoặc chọn vị trí');
    setStep('counting');
  };

  const handleScan = (e) => {
    e.preventDefault();
    if (!barcode) return;
    
    // Simulate finding item
    const newItem = { id: barcode, qty: 1, time: new Date().toLocaleTimeString() };
    setScannedItems([newItem, ...scannedItems]);
    setBarcode('');
  };

  const finishSession = () => {
    setStep('summary');
  };

  return (
    <MobileLayout 
      title="Kiểm kê (Cycle Count)"
      footer={
        <div className="d-flex gap-2">
          {step === 'select_loc' && (
            <button className="btn-mobile-primary" onClick={startCounting}>BẮT ĐẦU KIỂM KÊ</button>
          )}
          {step === 'counting' && (
            <button className="btn-mobile-primary bg-success" onClick={finishSession}>HOÀN TẤT VỊ TRÍ</button>
          )}
          {step === 'summary' && (
            <button className="btn-mobile-primary" onClick={() => window.location.href='/mobile'}>VỀ TRANG CHỦ</button>
          )}
        </div>
      }
    >
      {step === 'select_loc' && (
        <div className="d-flex flex-column gap-3">
          <div className="bg-white rounded-3 p-3 shadow-sm border-start border-4 border-info">
            <h6 className="fw-bold mb-1">Quy tắc: KIỂM KÊ MÙ (BLIND)</h6>
            <p className="text-muted-custom fs-8 mb-0">Bạn sẽ không thấy số lượng tồn hệ thống. Vui lòng quét thực tế tại kệ.</p>
          </div>
          
          <div className="scan-input-area shadow-sm">
            <label className="text-muted-custom fs-8 fw-bold mb-2 d-block">QUÉT MÃ VỊ TRÍ (LOCATION)</label>
            <div className="d-flex gap-2">
              <input 
                type="text" 
                className="form-control border-0 p-0 fs-5 fw-bold" 
                placeholder="VD: WH-A-01-01" 
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
              />
              <button className="btn btn-info text-white rounded-pill p-2"><MapPin size={20} /></button>
            </div>
          </div>

          <div className="text-center py-4 opacity-50">
            <ClipboardCheck size={64} className="mb-2" />
            <p className="fs-7">Chọn hoặc quét vị trí kệ để bắt đầu</p>
          </div>
        </div>
      )}

      {step === 'counting' && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="badge bg-info text-white rounded-pill px-3 py-2 fs-7">Vị trí: {loc}</span>
            <span className="text-muted-custom fs-8 fw-bold">ĐÃ QUÉT: {scannedItems.length}</span>
          </div>

          <div className="scan-input-area shadow-sm mb-4" style={{ borderColor: 'var(--accent-green)' }}>
            <label className="text-muted-custom fs-8 fw-bold mb-2 d-block">QUÉT MÃ HÀNG TẠI VỊ TRÍ</label>
            <form onSubmit={handleScan} className="d-flex gap-2">
              <input 
                type="text" 
                className="form-control border-0 p-0 fs-5 fw-bold" 
                placeholder="Chờ quét hàng..." 
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn btn-success rounded-pill p-2"><Scan size={20} /></button>
            </form>
          </div>

          <div className="d-flex flex-column gap-2">
            {scannedItems.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3 p-3 shadow-sm border border-light d-flex justify-content-between align-items-center animate__animated animate__fadeInDown">
                <div>
                  <div className="fw-bold fs-7">{item.id}</div>
                  <div className="text-muted-custom fs-9">{item.time}</div>
                </div>
                <div className="fw-bold text-success fs-5">x1</div>
              </div>
            ))}
            {scannedItems.length === 0 && (
              <div className="text-center py-5 opacity-20">
                <Search size={48} />
                <p>Chưa có dữ liệu quét</p>
              </div>
            )}
          </div>
        </div>
      )}

      {step === 'summary' && (
        <div className="text-center py-4">
          <div className="p-4 bg-success bg-opacity-10 rounded-circle text-success d-inline-block mb-3 animate__animated animate__bounceIn">
            <CheckCircle2 size={48} />
          </div>
          <h4 className="fw-bold">Hoàn tất vị trí!</h4>
          <p className="text-muted-custom mb-4">Kết quả kiểm kê tại <b>{loc}</b> đã được gửi về hệ thống để Review chênh lệch.</p>
          
          <div className="bg-white rounded-3 p-3 shadow-sm border border-light text-start mb-4">
            <div className="text-muted-custom fs-8 fw-bold mb-2 uppercase">TỔNG HỢP KIỂM KÊ</div>
            <div className="d-flex justify-content-between mb-2">
              <span>Tổng số mặt hàng:</span>
              <span className="fw-bold">{new Set(scannedItems.map(i => i.id)).size}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Tổng số lượng quét:</span>
              <span className="fw-bold text-success">{scannedItems.length}</span>
            </div>
          </div>

          <div className="alert alert-warning fs-8 text-start d-flex gap-2">
            <AlertTriangle size={16} className="mt-1 flex-shrink-0" />
            <span>Lưu ý: Tồn kho thực tế sẽ chỉ cập nhật sau khi Supervisor phê duyệt bản tin kiểm kê này.</span>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .uppercase { text-transform: uppercase; }
      `}} />
    </MobileLayout>
  );
};

export default CycleCount;

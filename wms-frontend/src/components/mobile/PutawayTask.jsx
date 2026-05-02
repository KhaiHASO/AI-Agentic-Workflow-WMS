import React, { useState } from 'react';
import MobileLayout from './MobileLayout';
import { Scan, MapPin, Package, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';

const PutawayTask = () => {
  const [step, setStatus] = useState('scan_item'); // 'scan_item', 'scan_loc', 'confirm'
  const [task, setTask] = useState({
    id: 'PT-000221',
    itemId: 'RM-001',
    itemName: 'Màng PE 5kg',
    qty: 55,
    unit: 'Cuộn',
    from: 'INB-STAGE-01',
    to: 'WH-A-01-02-P03',
    lot: 'LOT2026-A1'
  });

  const nextStep = () => {
    if (step === 'scan_item') setStatus('scan_loc');
    else if (step === 'scan_loc') setStatus('confirm');
    else alert('Đã hoàn thành cất hàng!');
  };

  return (
    <MobileLayout 
      title="Nhiệm vụ Cất hàng"
      footer={
        <button className="btn-mobile-primary d-flex align-items-center justify-content-center gap-2" onClick={nextStep}>
          {step === 'scan_item' && <><Scan size={20} /> QUÉT MÃ HÀNG (RM-001)</>}
          {step === 'scan_loc' && <><MapPin size={20} /> QUÉT VỊ TRÍ ĐÍCH (P03)</>}
          {step === 'confirm' && <><CheckCircle2 size={20} /> XÁC NHẬN HOÀN TẤT</>}
        </button>
      }
    >
      {/* Task Header */}
      <div className="bg-white rounded-3 p-3 shadow-sm mb-3 border-start border-4 border-primary">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold fs-7 text-primary">{task.id}</span>
          <span className="status-badge-mobile status-pending">Đang thực hiện</span>
        </div>
        <h5 className="fw-bold mb-1">{task.itemName}</h5>
        <div className="text-muted-custom fs-7">Số lượng: <span className="text-main fw-bold">{task.qty} {task.unit}</span></div>
      </div>

      {/* Movement Guide */}
      <div className="d-flex flex-column gap-3 mb-4">
        <div className={`task-card shadow-sm border-0 ${step === 'scan_item' ? 'border-primary border-2' : 'opacity-50'}`}>
          <div className="p-3 bg-light rounded-3">
            <Package size={24} className="text-muted" />
          </div>
          <div className="flex-grow-1">
            <div className="text-muted-custom fs-8 uppercase fw-bold">LẤY TỪ (FROM)</div>
            <div className="fw-bold fs-6">{task.from}</div>
          </div>
          {step !== 'scan_item' && <CheckCircle2 className="text-success" size={20} />}
        </div>

        <div className="d-flex justify-content-center">
          <ArrowRight className="text-muted" size={24} />
        </div>

        <div className={`task-card shadow-sm border-0 ${step === 'scan_loc' ? 'border-primary border-2' : 'opacity-50'}`}>
          <div className="p-3 bg-light rounded-3">
            <MapPin size={24} className="text-muted" />
          </div>
          <div className="flex-grow-1">
            <div className="text-muted-custom fs-8 uppercase fw-bold">CẤT VÀO (TO)</div>
            <div className="fw-bold fs-6">{task.to}</div>
          </div>
          {step === 'confirm' && <CheckCircle2 className="text-success" size={20} />}
        </div>
      </div>

      {/* Instruction */}
      <div className="p-3 bg-primary bg-opacity-10 rounded-3 border border-primary border-opacity-20">
        <div className="d-flex align-items-start gap-2">
          <Scan size={18} className="text-primary mt-1" />
          <div>
            <div className="fw-bold fs-7 text-primary">HƯỚNG DẪN</div>
            <p className="mb-0 fs-8 text-dark">
              {step === 'scan_item' && 'Vui lòng quét mã vạch trên kiện hàng để xác nhận đúng vật tư.'}
              {step === 'scan_loc' && 'Di chuyển đến vị trí kệ và quét mã vị trí để hoàn tất cất hàng.'}
              {step === 'confirm' && 'Kiểm tra lại thông tin và bấm Xác nhận để cập nhật tồn kho.'}
            </p>
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};

export default PutawayTask;

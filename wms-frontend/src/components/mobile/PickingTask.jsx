import React, { useState } from 'react';
import MobileLayout from './MobileLayout';
import { Scan, MapPin, Package, CheckCircle2, AlertTriangle, ListFilter } from 'lucide-react';

const PickingTask = () => {
  const [step, setStep] = useState('list'); // 'list', 'scan_loc', 'scan_item'
  const [tasks, setTasks] = useState([
    { id: 'PK-01', itemId: 'RM-001', itemName: 'Màng PE 5kg', qty: 20, loc: 'WH-A-01-01', status: 'Pending' },
    { id: 'PK-02', itemId: 'FG-001', itemName: 'Sản phẩm A', qty: 5, loc: 'WH-B-02-04', status: 'Pending' },
  ]);

  const [activeTask, setActiveTask] = useState(null);

  const startTask = (task) => {
    setActiveTask(task);
    setStep('scan_loc');
  };

  const handleConfirm = () => {
    const updated = tasks.map(t => t.id === activeTask.id ? { ...t, status: 'Done' } : t);
    setTasks(updated);
    setActiveTask(null);
    setStep('list');
    alert('Đã lấy hàng thành công!');
  };

  return (
    <MobileLayout 
      title={step === 'list' ? 'Danh sách Picking' : 'Đang lấy hàng'}
      footer={
        step !== 'list' && (
          <button className="btn-mobile-primary" onClick={step === 'scan_loc' ? () => setStep('scan_item') : handleConfirm}>
            {step === 'scan_loc' && 'XÁC NHẬN VỊ TRÍ'}
            {step === 'scan_item' && 'HOÀN TẤT LẤY HÀNG'}
          </button>
        )
      }
    >
      {step === 'list' && (
        <div className="d-flex flex-column gap-2">
          <div className="d-flex justify-content-between align-items-center mb-3 px-1">
            <span className="fw-bold fs-7">NHIỆM VỤ CHỜ ({tasks.filter(t => t.status === 'Pending').length})</span>
            <button className="btn btn-light btn-sm rounded-pill"><ListFilter size={16} /></button>
          </div>

          {tasks.map(t => (
            <div 
              key={t.id} 
              className={`bg-white rounded-3 p-3 shadow-sm border border-light d-flex justify-content-between align-items-center ${t.status === 'Done' ? 'opacity-50' : ''}`}
              onClick={t.status === 'Pending' ? () => startTask(t) : undefined}
            >
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <span className="fw-bold fs-7 text-primary">{t.loc}</span>
                  <span className="text-muted-custom fs-8">/ {t.id}</span>
                </div>
                <div className="fw-bold fs-6">{t.itemName}</div>
                <div className="text-muted-custom fs-8">Cần lấy: <span className="text-main fw-bold">{t.qty}</span> đơn vị</div>
              </div>
              {t.status === 'Done' ? <CheckCircle2 className="text-success" /> : <Scan className="text-muted" size={20} />}
            </div>
          ))}
        </div>
      )}

      {step !== 'list' && activeTask && (
        <div>
          <div className="bg-white rounded-3 p-3 shadow-sm mb-4 border-start border-4 border-warning">
            <div className="text-muted-custom fs-8 uppercase fw-bold mb-1">ĐANG LẤY (PICKING)</div>
            <h5 className="fw-bold mb-1">{activeTask.itemName}</h5>
            <div className="d-flex justify-content-between">
              <span className="text-muted-custom fs-7">Vị trí: <span className="text-main fw-bold">{activeTask.loc}</span></span>
              <span className="text-muted-custom fs-7">SL: <span className="text-main fw-bold">{activeTask.qty}</span></span>
            </div>
          </div>

          <div className="d-flex flex-column gap-4 align-items-center justify-content-center py-5">
             {step === 'scan_loc' && (
               <>
                 <div className="p-4 bg-primary bg-opacity-10 rounded-circle text-primary animate__animated animate__pulse animate__infinite">
                   <MapPin size={48} />
                 </div>
                 <div className="text-center">
                   <h6 className="fw-bold">Quét mã vị trí</h6>
                   <p className="text-muted-custom fs-7">Vui lòng quét nhãn dán tại kệ <br/><span className="text-main fw-bold fs-5">{activeTask.loc}</span></p>
                 </div>
               </>
             )}
             {step === 'scan_item' && (
               <>
                 <div className="p-4 bg-success bg-opacity-10 rounded-circle text-success animate__animated animate__pulse animate__infinite">
                   <Package size={48} />
                 </div>
                 <div className="text-center">
                   <h6 className="fw-bold">Quét mã hàng</h6>
                   <p className="text-muted-custom fs-7">Vui lòng quét mã vạch trên sản phẩm <br/><span className="text-main fw-bold fs-5">{activeTask.itemId}</span></p>
                 </div>
               </>
             )}
          </div>
        </div>
      )}
    </MobileLayout>
  );
};

export default PickingTask;

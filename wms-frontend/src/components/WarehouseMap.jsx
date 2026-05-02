import React, { useState, useRef } from 'react';
import { TransformWrapper, TransformComponent, useTransformContext } from "react-zoom-pan-pinch";
import { 
  Plus, Minus, RotateCcw, 
  AlertCircle, Info
} from 'lucide-react';

const MapControls = () => {
  const { zoomIn, zoomOut, resetTransform } = useTransformContext();

  return (
    <div className="map-controls-overlay position-absolute top-0 end-0 m-2 m-md-4 d-flex flex-column gap-2 z-3">
      <div className="bg-white rounded-3 shadow-lg d-flex flex-column border border-light overflow-hidden">
        <button 
          className="btn btn-white border-0 py-2 px-3 rounded-0 text-dark hover-bg-light d-flex align-items-center justify-content-center" 
          onClick={() => zoomIn(0.3)}
          title="Phóng to"
        >
          <Plus size={20} />
        </button>
        <div style={{ height: '1px', backgroundColor: 'var(--line-gray)' }}></div>
        <button 
          className="btn btn-white border-0 py-2 px-3 rounded-0 text-dark hover-bg-light d-flex align-items-center justify-content-center" 
          onClick={() => zoomOut(0.3)}
          title="Thu nhỏ"
        >
          <Minus size={20} />
        </button>
      </div>
      
      <button 
        className="btn bg-white rounded-3 shadow-lg border border-light py-2 px-3 text-dark d-flex align-items-center justify-content-center"
        onClick={() => resetTransform()}
        title="Đặt lại bản đồ"
      >
        <RotateCcw size={18} />
      </button>
    </div>
  );
};

const WarehouseMap = () => {
  const [selectedRack, setSelectedRack] = useState(null);
  const isDragging = useRef(false);
  const dragStartPos = useRef({ x: 0, y: 0 });

  const onStart = (e) => {
    const x = e.clientX || e.touches?.[0].clientX;
    const y = e.clientY || e.touches?.[0].clientY;
    dragStartPos.current = { x, y };
    isDragging.current = false;
  };

  const onMove = (e) => {
    const x = e.clientX || e.touches?.[0].clientX;
    const y = e.clientY || e.touches?.[0].clientY;
    const dist = Math.sqrt(
      Math.pow(x - dragStartPos.current.x, 2) + 
      Math.pow(y - dragStartPos.current.y, 2)
    );
    if (dist > 10) {
      isDragging.current = true;
    }
  };

  const handleRackClick = (id, type) => {
    if (isDragging.current) return;
    setSelectedRack({ id, type });
  };

  return (
    <div className="warehouse-map-container h-100 position-relative bg-light overflow-hidden d-flex flex-column">
      
      {/* Mobile-only context info */}
      <div className="d-md-none bg-white p-2 px-3 border-bottom d-flex justify-content-between align-items-center z-2 shadow-sm">
        <span className="fs-9 uppercase-bold text-muted fw-bold">Sơ đồ kho thời gian thực</span>
        <div className="d-flex gap-2">
           <div className="status-dot available"></div>
           <span className="fs-9 fw-bold">LIVE</span>
        </div>
      </div>

      <div className="flex-grow-1 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ 
          backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)',
          backgroundSize: '24px 24px',
          pointerEvents: 'none'
        }}></div>

        <TransformWrapper
          initialScale={1}
          minScale={0.3}
          maxScale={5}
          centerOnInit={true}
          limitToBounds={false} // ALLOW PANNING OUTSIDE INITIAL BOUNDS TO PREVENT SNAPPING
          wheel={{ step: 0.01, smoothWheel: true }}
          zoomAnimation={{ animationType: "easeOut", animationTime: 300 }}
          doubleClick={{ disabled: true }}
          panning={{ velocityDisabled: false }}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              <MapControls />
              
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{ width: "100%", height: "100%" }}
              >
                <div 
                  className="map-interaction-layer"
                  onMouseDown={onStart}
                  onMouseMove={onMove}
                  onTouchStart={onStart}
                  onTouchMove={onMove}
                  style={{ cursor: rest.panning?.active ? "grabbing" : "grab", width: '1200px', height: '650px' }}
                >
                  <svg className="map-svg w-100 h-100" viewBox="0 0 1200 650">
                    <rect x="50" y="50" width="1100" height="550" fill="white" rx="12" filter="drop-shadow(0 4px 12px rgba(0,0,0,0.05))" />
                    
                    {/* Row A */}
                    <g transform="translate(100, 100)">
                      <text x="0" y="-20" fill="var(--text-muted)" fontSize="12" className="uppercase-bold fw-bold" pointerEvents="none">Dãy lưu trữ A</text>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <React.Fragment key={i}>
                          <g transform={`translate(${i * 75}, 0)`} onClick={() => handleRackClick(`A${i+1}-01`, 'Lưu trữ')} className="map-rack-group">
                            <rect width="65" height="45" fill="var(--rack-blue)" fillOpacity="0.85" rx="4" stroke="white" strokeWidth="1" className="rack-rect" />
                            <text x="32.5" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" pointerEvents="none">A{i+1}-01</text>
                          </g>
                          <g transform={`translate(${i * 75}, 55)`} onClick={() => handleRackClick(`A${i+1}-02`, 'Lưu trữ')} className="map-rack-group">
                            <rect width="65" height="45" fill="var(--rack-blue)" fillOpacity="0.85" rx="4" stroke="white" strokeWidth="1" className="rack-rect" />
                            <text x="32.5" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" pointerEvents="none">A{i+1}-02</text>
                          </g>
                        </React.Fragment>
                      ))}
                    </g>

                    {/* Row B */}
                    <g transform="translate(650, 100)">
                      <text x="0" y="-20" fill="var(--text-muted)" fontSize="12" className="uppercase-bold fw-bold" pointerEvents="none">Dãy lưu trữ B</text>
                      {[0, 1, 2, 3, 4, 5].map(i => (
                        <React.Fragment key={i}>
                          <g transform={`translate(${i * 75}, 0)`} onClick={() => handleRackClick(`B${i+1}-01`, 'Lưu trữ')} className="map-rack-group">
                            <rect width="65" height="45" fill="#6366f1" fillOpacity="0.85" rx="4" stroke="white" strokeWidth="1" className="rack-rect" />
                            <text x="32.5" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" pointerEvents="none">B{i+1}-01</text>
                          </g>
                          <g transform={`translate(${i * 75}, 55)`} onClick={() => handleRackClick(`B${i+1}-02`, 'Lưu trữ')} className="map-rack-group">
                            <rect width="65" height="45" fill="#6366f1" fillOpacity="0.85" rx="4" stroke="white" strokeWidth="1" className="rack-rect" />
                            <text x="32.5" y="28" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" pointerEvents="none">B{i+1}-02</text>
                          </g>
                        </React.Fragment>
                      ))}
                    </g>

                    {/* Functional Zones */}
                    <g transform="translate(100, 420)" onClick={() => handleRackClick('Staging', 'Nhập hàng')}>
                      <rect width="380" height="160" fill="var(--accent-green)" fillOpacity="0.05" stroke="var(--accent-green)" strokeWidth="2" strokeDasharray="8,4" rx="16" className="clickable-zone" />
                      <text x="190" y="30" textAnchor="middle" fill="var(--accent-green)" fontSize="14" className="uppercase-bold fw-bold" pointerEvents="none">Nhận hàng (Staging)</text>
                    </g>

                    <g transform="translate(720, 420)" onClick={() => handleRackClick('Packing', 'Xuất hàng')}>
                      <rect width="380" height="160" fill="var(--accent-blue)" fillOpacity="0.05" stroke="var(--accent-blue)" strokeWidth="2" strokeDasharray="8,4" rx="16" className="clickable-zone" />
                      <text x="190" y="30" textAnchor="middle" fill="var(--accent-blue)" fontSize="14" className="uppercase-bold fw-bold" pointerEvents="none">Đóng gói / Xuất hàng</text>
                    </g>

                    {/* QA */}
                    <g transform="translate(540, 420)" onClick={() => handleRackClick('QA', 'Kiểm định')}>
                      <rect width="130" height="160" fill="var(--accent-red)" fillOpacity="0.05" stroke="var(--accent-red)" strokeWidth="2" strokeDasharray="8,4" rx="16" className="clickable-zone" />
                      <text x="65" y="30" textAnchor="middle" fill="var(--accent-red)" fontSize="11" className="uppercase-bold fw-bold" pointerEvents="none">QA / CÁCH LY</text>
                    </g>
                  </svg>
                </div>
              </TransformComponent>
            </>
          )}
        </TransformWrapper>

        {/* Selected Rack Popover (Mobile Sheet) */}
        {selectedRack && (
          <>
            <div className="position-absolute top-0 start-0 w-100 h-100 z-3 bg-black bg-opacity-20 d-md-none" onClick={() => setSelectedRack(null)}></div>
            <div className="rack-popover glass-card shadow-2xl bg-white border-0 fade-in z-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Vị trí {selectedRack.id}</h5>
                <button className="btn-close" onClick={() => setSelectedRack(null)}></button>
              </div>
              <div className="badge bg-primary-subtle text-primary mb-3 rounded-pill px-3 py-1 fs-9 uppercase-bold">{selectedRack.type}</div>
              <div className="d-flex flex-column gap-2 fs-8 mb-4 text-start">
                 <div className="d-flex justify-content-between border-bottom pb-2"><span>Tỉ lệ lấp đầy:</span><span className="fw-bold text-success">85%</span></div>
                 <div className="d-flex justify-content-between"><span>Trạng thái:</span><span className="fw-bold text-success">Sẵn dụng</span></div>
              </div>
              <button className="btn btn-dark w-100 rounded-3 py-3 fw-bold d-flex align-items-center justify-content-center gap-2">
                <Info size={18} /> Xem chi tiết
              </button>
            </div>
          </>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .rack-rect, .clickable-zone { cursor: pointer; transition: all 0.2s; }
        .map-rack-group:hover .rack-rect { fill: var(--text-main) !important; }
        .clickable-zone:hover { fill-opacity: 0.15; }
        .uppercase-bold { text-transform: uppercase; letter-spacing: 0.05em; }
        .rack-popover { position: absolute; width: 320px; padding: 1.5rem; top: 50%; left: 50%; transform: translate(-50%, -50%); }
        
        @media (max-width: 991px) {
          .rack-popover { width: 100%; top: auto; bottom: 0; left: 0; transform: none; border-radius: 24px 24px 0 0; padding-bottom: 2.5rem; animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
          .map-controls-overlay { margin: 10px !important; }
        }
        
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.3s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
    </div>
  );
};

export default WarehouseMap;

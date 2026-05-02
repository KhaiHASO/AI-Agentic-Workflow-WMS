import React, { useRef } from 'react';
import { Printer, X, Download, Tag } from 'lucide-react';

const LabelPrinter = ({ data, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const windowUrl = 'about:blank';
    const uniqueName = new Date();
    const windowName = 'Print' + uniqueName.getTime();
    const printWindow = window.open(windowUrl, windowName, 'left=500,top=500,width=900,height=900');

    printWindow.document.write(`
      <html>
        <head>
          <title>In Tem Nhãn WMS</title>
          <style>
            @page { size: 100mm 60mm; margin: 0; }
            body { font-family: 'Inter', sans-serif; padding: 10mm; display: flex; flex-direction: column; align-items: center; justify-content: center; }
            .label-container { border: 2px solid black; padding: 5mm; width: 80mm; height: 40mm; display: flex; flex-direction: column; align-items: center; text-align: center; }
            .barcode { font-family: 'Libre Barcode 128', cursive; font-size: 40px; margin: 5px 0; }
            .item-name { font-weight: bold; font-size: 14px; margin-bottom: 5px; }
            .details { font-size: 10px; display: flex; justify-content: space-between; width: 100%; }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet">
        </head>
        <body>
          ${printContent}
          <script>
            setTimeout(() => { window.print(); window.close(); }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-black bg-opacity-50 z-3 d-flex align-items-center justify-content-center p-3" style={{ backdropFilter: 'blur(4px)' }}>
      <div className="bg-white rounded-4 shadow-lg w-100" style={{ maxWidth: '500px' }}>
        <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
           <h5 className="fw-bold mb-0 d-flex align-items-center gap-2"><Tag size={20} className="text-primary" /> XEM TRƯỚC TEM NHÃN</h5>
           <button className="btn-close" onClick={onClose}></button>
        </div>
        
        <div className="p-5 d-flex justify-content-center">
           <div ref={printRef} className="label-preview border border-dark p-3 d-flex flex-column align-items-center shadow-sm bg-white" style={{ width: '300px', height: '180px' }}>
              <div className="fs-9 fw-bold text-muted mb-2 uppercase">NAVEXA WMS LABEL</div>
              <div className="fw-bold text-center mb-1" style={{ fontSize: '1.1rem' }}>{data.itemName || data.itemId}</div>
              <div className="barcode-mock my-2" style={{ fontSize: '48px', fontFamily: 'Libre Barcode 128, cursive' }}>
                {data.itemId}
              </div>
              <div className="fw-bold fs-7 mb-1">{data.itemId}</div>
              <div className="d-flex justify-content-between w-100 px-3 fs-9 border-top pt-2 mt-2">
                 <span>LOT: <b>{data.lot || 'N/A'}</b></span>
                 <span>QTY: <b>{data.qty || '1'} {data.unit}</b></span>
              </div>
           </div>
        </div>

        <div className="p-4 bg-light rounded-bottom-4 d-flex gap-2">
           <button className="btn btn-white flex-grow-1 fw-bold" onClick={onClose}>ĐÓNG</button>
           <button className="btn btn-dark flex-grow-1 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2" onClick={handlePrint}>
              <Printer size={18} /> IN TEM (THERAL)
           </button>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap');
      `}} />
    </div>
  );
};

export default LabelPrinter;

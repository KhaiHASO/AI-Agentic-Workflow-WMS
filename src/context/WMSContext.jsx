import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { wmsApi } from '../services/wmsApi';
import itemsData from '../mockData/master/items.json';
import locationsData from '../mockData/master/locations.json';
import onHandData from '../mockData/wms/onHand.json';
import putawayTasksData from '../mockData/wms/putawayTasks.json';
import pickTasksData from '../mockData/wms/pickTasks.json';
import inboundDraftsData from '../mockData/wms/inboundDrafts.json';
import shipmentsData from '../mockData/wms/shipments.json';
import ledgerData from '../mockData/wms/ledger.json';
import qualityData from '../mockData/quality/qualityOrders.json';
import syncLogsData from '../mockData/integration/syncLogs.json';
import cycleCountData from '../mockData/quality/cycleCount.json';
import huData from '../mockData/wms/handlingUnits.json';

const WMSContext = createContext();

export const WMSProvider = ({ children }) => {
  // Helper to load from localStorage
  const loadState = (key, defaultValue) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  };

  const [items, setItems] = useState(() => loadState('wms_items', itemsData));
  const [locations, setLocations] = useState(() => loadState('wms_locations', locationsData));
  const [onHand, setOnHand] = useState(() => loadState('wms_onHand', onHandData));
  const [putawayTasks, setPutawayTasks] = useState(() => loadState('wms_putawayTasks', putawayTasksData));
  const [pickTasks, setPickTasks] = useState(() => loadState('wms_pickTasks', pickTasksData));
  const [inboundDrafts, setInboundDrafts] = useState(() => loadState('wms_inboundDrafts', inboundDraftsData));
  const [shipments, setShipments] = useState(() => loadState('wms_shipments', shipmentsData));
  const [ledger, setLedger] = useState(() => loadState('wms_ledger', ledgerData));
  const [qualityOrders, setQualityOrders] = useState(() => loadState('wms_qualityOrders', qualityData));
  const [syncLogs, setSyncLogs] = useState(() => loadState('wms_syncLogs', syncLogsData));
  const [cycleCounts, setCycleCounts] = useState(() => loadState('wms_cycleCounts', cycleCountData));
  const [relocationHistory, setRelocationHistory] = useState(() => loadState('wms_relocationHistory', []));
  const [handlingUnits, setHandlingUnits] = useState(() => loadState('wms_handlingUnits', huData));
  const [salesOrders, setSalesOrders] = useState(() => loadState('wms_salesOrders', [
    { id: "SO-2026-001", customer: "Công ty Samsung VN", qty: 150, itemCode: "RM-001", priority: "High", status: "Approved", date: "13/04/2026" },
    { id: "SO-2026-002", customer: "Logistics ABA", qty: 80, itemCode: "FG-001", priority: "Normal", status: "Approved", date: "13/04/2026" },
    { id: "SO-2026-003", customer: "Điện Máy Xanh", qty: 200, itemCode: "RM-002", priority: "Urgent", status: "Approved", date: "14/04/2026" },
    { id: "SO-2026-004", customer: "Công ty Intel", qty: 45, itemCode: "RM-001", priority: "Normal", status: "Approved", date: "14/04/2026" },
  ]));
  const [returns, setReturns] = useState(() => loadState('wms_returns', [
    { id: "RTV-2026-001", type: "RTV", reference: "PO-2026-045", partner: "Supplier A", itemCode: "RM-001", qty: 10, lotNo: "LOT-20260412", status: "Pending Review", reason: "Hàng lỗi kỹ thuật" },
    { id: "RMA-2026-001", type: "RMA", reference: "SO-2026-781", partner: "Customer B", itemCode: "FG-001", qty: 5, lotNo: "LOT-X-100", status: "Pending Review", reason: "Sai quy cách" },
  ]));
  const [uomConversions, setUomConversions] = useState(() => loadState('wms_uomConversions', [
      { id: 1, itemCode: "RM-001", fromUom: "BOX", toUom: "ROLL", factor: 12, description: "1 Thùng = 12 Cuộn" },
      { id: 2, itemCode: "RM-003", fromUom: "BAG", toUom: "KG", factor: 25, description: "1 Bao = 25 Kg" },
      { id: 3, itemCode: "PKG-001", fromUom: "BUNDLE", toUom: "PCS", factor: 50, description: "1 Bó = 50 Cái" }
  ]));
  const [suppliers, setSuppliers] = useState(() => loadState('wms_suppliers', [
      { id: 1, code: "SUP-001", name: "Công ty Nhựa ABC", contact: "Nguyễn Văn A", phone: "0901234567", address: "KCN Tân Bình, TP.HCM", status: "Active" },
      { id: 2, code: "SUP-002", name: "Tập đoàn Bao Bì Việt", contact: "Trần Thị B", phone: "0988777666", address: "KCN Amata, Đồng Nai", status: "Active" }
  ]));

  // Persistence effects
  useEffect(() => { localStorage.setItem('wms_items', JSON.stringify(items)); }, [items]);
  useEffect(() => { localStorage.setItem('wms_locations', JSON.stringify(locations)); }, [locations]);
  useEffect(() => { localStorage.setItem('wms_onHand', JSON.stringify(onHand)); }, [onHand]);
  useEffect(() => { localStorage.setItem('wms_putawayTasks', JSON.stringify(putawayTasks)); }, [putawayTasks]);
  useEffect(() => { localStorage.setItem('wms_pickTasks', JSON.stringify(pickTasks)); }, [pickTasks]);
  useEffect(() => { localStorage.setItem('wms_inboundDrafts', JSON.stringify(inboundDrafts)); }, [inboundDrafts]);
  useEffect(() => { localStorage.setItem('wms_shipments', JSON.stringify(shipments)); }, [shipments]);
  useEffect(() => { localStorage.setItem('wms_ledger', JSON.stringify(ledger)); }, [ledger]);
  useEffect(() => { localStorage.setItem('wms_qualityOrders', JSON.stringify(qualityOrders)); }, [qualityOrders]);
  useEffect(() => { localStorage.setItem('wms_syncLogs', JSON.stringify(syncLogs)); }, [syncLogs]);
  useEffect(() => { localStorage.setItem('wms_cycleCounts', JSON.stringify(cycleCounts)); }, [cycleCounts]);
  useEffect(() => { localStorage.setItem('wms_relocationHistory', JSON.stringify(relocationHistory)); }, [relocationHistory]);
  useEffect(() => { localStorage.setItem('wms_handlingUnits', JSON.stringify(handlingUnits)); }, [handlingUnits]);
  useEffect(() => { localStorage.setItem('wms_salesOrders', JSON.stringify(salesOrders)); }, [salesOrders]);
  useEffect(() => { localStorage.setItem('wms_returns', JSON.stringify(returns)); }, [returns]);
  useEffect(() => { localStorage.setItem('wms_uomConversions', JSON.stringify(uomConversions)); }, [uomConversions]);
  useEffect(() => { localStorage.setItem('wms_suppliers', JSON.stringify(suppliers)); }, [suppliers]);

  // Helper to add ledger entry
  const addLedgerEntry = (entry) => {
    const newEntry = {
      transactionId: `TXN-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString(),
      ...entry
    };
    setLedger(prev => [newEntry, ...prev]);
  };

  const syncMasterData = async (entity) => {
      try {
          const res = await wmsApi.syncFromErp(entity);
          if (res.success) {
              toast.success(`Đã đồng bộ ${res.count} ${entity} từ ERP.`);
          }
      } catch (err) {
          toast.error("Đồng bộ ERP thất bại: " + err.message);
      }
  };

  // Workflow logic: Relocate Item
  const relocateItem = (sourceLoc, itemCode, qty, destLoc) => {
      const quantity = Number(qty);
      
      // 1. Update OnHand (Decrease Source)
      setOnHand(prev => {
          const next = prev.map(oh => {
              if (oh.locationCode === sourceLoc && oh.itemCode === itemCode) {
                  return { ...oh, qty: Math.max(0, oh.qty - quantity) };
              }
              return oh;
          });
          
          // 2. Update OnHand (Increase Destination)
          const existingDest = next.find(oh => oh.locationCode === destLoc && oh.itemCode === itemCode);
          if (existingDest) {
              return next.map(oh => oh === existingDest ? { ...oh, qty: oh.qty + quantity } : oh);
          } else {
              return [...next, {
                  warehouseCode: "WH-A",
                  locationCode: destLoc,
                  itemCode: itemCode,
                  lotNo: "LOT-RELOC",
                  qty: quantity,
                  uom: "UNIT",
                  status: "Available"
              }];
          }
      });

      // 3. Log to History
      const newHistory = {
          time: new Date().toISOString(),
          itemCode,
          qty: quantity,
          fromLoc: sourceLoc,
          toLoc: destLoc,
          user: "user.wh01"
      };
      setRelocationHistory(prev => [newHistory, ...prev]);

      // 4. Log to Ledger
      addLedgerEntry({
          transactionType: "INTERNAL_RELOC",
          itemCode,
          qty: quantity,
          fromLocation: sourceLoc,
          toLocation: destLoc,
          user: "user.wh01",
          referenceNo: "RELOC-MANUAL"
      });
  };

  const approveCycleCount = async (sessionId) => {
      const session = cycleCounts.find(s => s.sessionId === sessionId);
      if (!session) return;

      try {
          await wmsApi.postAdjustment({
              sessionId,
              lines: session.lines.filter(l => l.variance !== 0)
          });

          // Update Session Status
          setCycleCounts(prev => prev.map(s => s.sessionId === sessionId ? { ...s, status: "Posted" } : s));

          // Update OnHand based on variances
          session.lines.forEach(line => {
              if (line.variance !== 0) {
                  setOnHand(prev => {
                      const existing = prev.find(oh => oh.locationCode === line.locationCode && oh.itemCode === line.itemCode);
                      if (existing) {
                          return prev.map(oh => oh === existing ? { ...oh, qty: line.countedQty } : oh);
                      } else {
                          return [...prev, {
                              warehouseCode: "WH-A",
                              locationCode: line.locationCode,
                              itemCode: line.itemCode,
                              lotNo: line.lotNo,
                              qty: line.countedQty,
                              uom: "UNIT",
                              status: "Available"
                          }];
                      }
                  });

                  addLedgerEntry({
                      transactionType: "CYCLE_COUNT_ADJ",
                      itemCode: line.itemCode,
                      qty: line.variance,
                      fromLocation: "ADJUSTMENT",
                      toLocation: line.locationCode,
                      user: "manager.wh01",
                      referenceNo: sessionId
                  });
              }
          });
      } catch (err) {
          toast.error("Lỗi khi cập nhật ERP: " + err.message);
      }
  };

  const createWave = async (selectedOrderIds) => {
    const ordersToProcess = salesOrders.filter(o => selectedOrderIds.includes(o.id));
    const allNewPickTasks = [];
    const updatedSalesOrders = [...salesOrders];

    try {
        await wmsApi.releaseWave(selectedOrderIds);

        ordersToProcess.forEach(order => {
            let remainingToPick = order.qty;
            
            // FEFO/FIFO Allocation Logic
            const availableStock = onHand
                .filter(oh => oh.itemCode === order.itemCode && oh.status === 'Available' && oh.qty > 0)
                .sort((a, b) => {
                    if (!a.expiryDate) return 1;
                    if (!b.expiryDate) return -1;
                    return new Date(a.expiryDate) - new Date(b.expiryDate);
                });

            for (const stock of availableStock) {
                if (remainingToPick <= 0) break;
                
                const pickQty = Math.min(remainingToPick, stock.qty);
                
                allNewPickTasks.push({
                    pickTaskId: `PKT-${Math.floor(Math.random() * 90000) + 10000}`,
                    soNumber: order.id,
                    status: "Assigned",
                    itemCode: order.itemCode,
                    reservedQty: pickQty,
                    pickedQty: 0,
                    fromLocation: stock.locationCode,
                    lotNo: stock.lotNo,
                    assignedTo: "user.wh01"
                });
                
                remainingToPick -= pickQty;
            }

            if (remainingToPick > 0) {
                toast.warning(`Thiếu tồn kho cho đơn ${order.id}. Còn thiếu ${remainingToPick} ${order.itemCode}`);
            }
            
            if (remainingToPick < order.qty) {
                const idx = updatedSalesOrders.findIndex(so => so.id === order.id);
                if (idx !== -1) updatedSalesOrders.splice(idx, 1);
            }
        });

        setPickTasks(prev => [...allNewPickTasks, ...prev]);
        setSalesOrders(updatedSalesOrders);
        
        addLedgerEntry({
            transactionType: "WAVE_RELEASE",
            itemCode: "MULTIPLE",
            qty: allNewPickTasks.reduce((acc, t) => acc + t.reservedQty, 0),
            fromLocation: "OFFICE",
            toLocation: "FLOOR",
            user: "planner.wh01",
            referenceNo: `WAVE-${Date.now().toString().slice(-4)}`
        });
    } catch (err) {
        toast.error("Giải phóng Wave thất bại: " + err.message);
    }
  };

  const approveReturn = (returnId) => {
    const ret = returns.find(r => r.id === returnId);
    if (!ret) return;

    setReturns(prev => prev.map(r => r.id === returnId ? { ...r, status: "Approved" } : r));
    
    if (ret.type === "RMA") {
        setOnHand(prev => {
            const existing = prev.find(oh => oh.locationCode === "RETURN-AREA" && oh.itemCode === ret.itemCode);
            if (existing) {
                return prev.map(oh => oh === existing ? { ...oh, qty: oh.qty + ret.qty } : oh);
            } else {
                return [...prev, {
                    warehouseCode: "WH-A",
                    locationCode: "RETURN-AREA",
                    itemCode: ret.itemCode,
                    lotNo: ret.lotNo,
                    qty: ret.qty,
                    uom: "UNIT",
                    status: "QC"
                }];
            }
        });
    }

    addLedgerEntry({
        transactionType: ret.type === "RMA" ? "CUSTOMER_RETURN" : "VENDOR_RETURN",
        itemCode: ret.itemCode,
        qty: ret.type === "RMA" ? ret.qty : -ret.qty,
        fromLocation: ret.type === "RMA" ? "CUSTOMER" : "STORAGE",
        toLocation: ret.type === "RMA" ? "RETURN-AREA" : "EXTERNAL",
        user: "manager.wh01",
        referenceNo: returnId
    });
  };

  const startCycleCount = (zoneCode) => {
      const newSession = {
          sessionId: `CC-${Date.now().toString().slice(-6)}`,
          status: "Counting",
          zone: zoneCode,
          startedAt: new Date().toISOString(),
          lines: []
      };
      setCycleCounts(prev => [newSession, ...prev]);
      return newSession.sessionId;
  };

  const submitCountLine = (sessionId, lineData) => {
      setCycleCounts(prev => prev.map(s => {
          if (s.sessionId === sessionId) {
              const systemEntry = onHand.find(oh => oh.locationCode === lineData.locationCode && oh.itemCode === lineData.itemCode && oh.lotNo === lineData.lotNo);
              const systemQty = systemEntry ? systemEntry.qty : 0;
              const variance = lineData.countedQty - systemQty;
              
              const newLine = {
                  ...lineData,
                  systemQty,
                  variance,
                  countedAt: new Date().toISOString()
              };
              
              return { ...s, lines: [...s.lines, newLine] };
          }
          return s;
      }));
  };

  const submitInboundDraft = async (draftId) => {
    const draft = inboundDrafts.find(d => d.draftId === draftId);
    if (!draft) return;

    try {
        await wmsApi.submitReceipt({
            draftId,
            masterReceiptId: draft.masterReceiptId,
            lines: draft.lines.map(l => ({
                itemCode: l.itemCode,
                acceptedQty: l.acceptedQty,
                rejectedQty: l.rejectedQty,
                lotNo: l.lotNo
            }))
        });

        const newPutawayTasks = draft.lines.filter(l => l.acceptedQty > 0).map(line => ({
            taskId: `PT-${Math.floor(Math.random() * 9000) + 1000}`,
            status: "Open",
            itemCode: line.itemCode,
            qty: line.acceptedQty,
            lotNo: line.lotNo,
            expiryDate: line.expiryDate,
            fromLocation: "WH-A-REC-01",
            toLocation: locations.find(l => l.canReceive && l.type === 'STORAGE')?.locationCode || "WH-A-STG-01-01-L1",
            handlingUnitBarcode: `LP-${Math.floor(Math.random() * 90000) + 10000}`,
            createdAt: new Date().toISOString()
        }));

        setPutawayTasks(prev => [...newPutawayTasks, ...prev]);
        setInboundDrafts(prev => prev.filter(d => d.draftId !== draftId));

        newPutawayTasks.forEach(task => {
            addLedgerEntry({
                transactionType: "INBOUND_RECEIPT",
                itemCode: task.itemCode,
                qty: task.qty,
                lotNo: task.lotNo,
                fromLocation: "EXTERNAL",
                toLocation: "WH-A-REC-01",
                user: "user.wh01",
                referenceNo: draftId
            });
        });

        draft.lines.filter(l => (l.rejectedQty || 0) > 0).forEach(line => {
            addLedgerEntry({
                transactionType: "INBOUND_REJECT",
                itemCode: line.itemCode,
                qty: line.rejectedQty,
                lotNo: line.lotNo,
                fromLocation: "EXTERNAL",
                toLocation: "REJECTED-AREA",
                user: "user.wh01",
                referenceNo: draftId,
                reason: line.reason || "Hàng lỗi"
            });
            
            setOnHand(prev => [...prev, {
                warehouseCode: "WH-A",
                locationCode: "REJECTED-AREA",
                itemCode: line.itemCode,
                lotNo: line.lotNo || "LOT-REJ",
                qty: line.rejectedQty,
                uom: "UNIT",
                status: "Rejected"
            }]);
        });

        const qcLines = draft.lines.filter(l => l.itemCode === 'RM-003');
        if (qcLines.length > 0) {
            const newQOs = qcLines.map(l => ({
                qualityOrderId: `QO-${Math.floor(Math.random() * 9000) + 1000}`,
                itemCode: l.itemCode,
                lotNo: l.lotNo || "N/A",
                qty: l.acceptedQty,
                status: "Pending",
                createdAt: new Date().toISOString(),
                disposition: null
            }));
            setQualityOrders(prev => [...newQOs, ...prev]);
        }
    } catch (err) {
        toast.error("Nộp phiếu Draft thất bại: " + err.message);
    }
  };

  const confirmPutaway = (taskId, actualLocation = null) => {
    const task = putawayTasks.find(t => t.taskId === taskId);
    if (!task) return;

    const finalLocation = actualLocation || task.toLocation;

    setOnHand(prev => {
        const existing = prev.find(oh => oh.locationCode === finalLocation && oh.itemCode === task.itemCode);
        if (existing) {
            return prev.map(oh => oh === existing ? { ...oh, qty: oh.qty + task.qty } : oh);
        } else {
            return [...prev, {
                warehouseCode: "WH-A",
                locationCode: finalLocation,
                itemCode: task.itemCode,
                lotNo: task.lotNo || "LOT-NEW",
                qty: task.qty,
                uom: "UNIT",
                status: "Available"
            }];
        }
    });

    setPutawayTasks(prev => prev.filter(t => t.taskId !== taskId));

    addLedgerEntry({
        transactionType: "INTERNAL_TRANSFER",
        itemCode: task.itemCode,
        qty: task.qty,
        fromLocation: task.fromLocation,
        toLocation: finalLocation,
        user: "user.wh01",
        referenceNo: taskId
    });
  };

  const suggestLocations = (itemCode) => {
    return locations.filter(loc => {
        if (!loc.canReceive) return false;
        const currentOccupancy = onHand.filter(oh => oh.locationCode === loc.locationCode).length;
        if (currentOccupancy >= (loc.maxPallets || 10)) return false;
        return loc.type === 'STORAGE' || loc.type === 'PICKING';
    }).slice(0, 3);
  };

  const confirmPickTask = (taskId, pickedQty) => {
    const task = pickTasks.find(t => t.pickTaskId === taskId);
    if (!task) return;

    setPickTasks(prev => prev.map(t => 
      t.pickTaskId === taskId 
        ? { ...t, pickedQty: t.pickedQty + pickedQty, status: (t.pickedQty + pickedQty >= t.reservedQty) ? "Completed" : "In Progress" } 
        : t
    ));

    setOnHand(prev => prev.map(oh => 
      (oh.locationCode === task.fromLocation && oh.itemCode === task.itemCode)
        ? { ...oh, qty: Math.max(0, oh.qty - pickedQty) }
        : oh
    ));

    addLedgerEntry({
        transactionType: "PICKING",
        itemCode: task.itemCode,
        qty: pickedQty,
        fromLocation: task.fromLocation,
        toLocation: "PACKING-STAGE",
        user: "user.wh01",
        referenceNo: taskId
    });
  };

  const confirmShipment = (shipmentId) => {
    const shipment = shipments.find(s => s.shipmentId === shipmentId);
    if (!shipment) return;

    setShipments(prev => prev.map(s => 
      s.shipmentId === shipmentId ? { ...s, status: "Shipped", shippedDate: new Date().toISOString() } : s
    ));

    addLedgerEntry({
        transactionType: "OUTBOUND_SHIP",
        itemCode: "MULTIPLE",
        qty: 0,
        fromLocation: "DOCK-EXIT",
        toLocation: "CUSTOMER",
        user: "user.wh01",
        referenceNo: shipmentId
    });
  };

  const completeQualityOrder = async (qoId, disposition) => {
    try {
        await wmsApi.updateQualityStatus(qoId, { status: 'Completed', disposition });
        
        setQualityOrders(prev => prev.map(qo => 
          qo.qualityOrderId === qoId ? { ...qo, status: "Completed", disposition, completedAt: new Date().toISOString() } : qo
        ));
        
        const qo = qualityOrders.find(q => q.qualityOrderId === qoId);
        if (qo && disposition === 'Failed') {
             addLedgerEntry({
                transactionType: "QUALITY_BLOCK",
                itemCode: qo.itemCode,
                qty: qo.qty,
                fromLocation: "STORAGE",
                toLocation: "REJECTED-AREA",
                user: "qc.user",
                referenceNo: qoId
            });
        }
    } catch (err) {
        toast.error("Cập nhật chất lượng thất bại: " + err.message);
    }
  };

  const addItem = (newItem) => {
    setItems(prev => [...prev, newItem]);
    addLedgerEntry({ transactionType: "MASTER_DATA_ADD", itemCode: newItem.erpItemCode, qty: 0, fromLocation: "SYSTEM", toLocation: "MASTER", user: "admin.wh01", referenceNo: "MANUAL_ADD" });
  };

  const updateItem = (itemCode, updates) => {
    setItems(prev => prev.map(item => item.erpItemCode === itemCode ? { ...item, ...updates } : item));
  };

  const addUomConversion = (newConv) => { setUomConversions(prev => [...prev, { ...newConv, id: Date.now() }]); };
  const deleteUomConversion = (id) => { setUomConversions(prev => prev.filter(u => u.id !== id)); };
  const addSupplier = (newSup) => { setSuppliers(prev => [...prev, { ...newSup, id: Date.now() }]); };
  const updateSupplier = (id, updates) => { setSuppliers(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s)); };
  const deleteSupplier = (id) => { setSuppliers(prev => prev.filter(s => s.id !== id)); };

  const getConvertedQty = (itemCode, qty, fromUom, toUom) => {
      if (fromUom === toUom) return qty;
      const conversion = uomConversions.find(c => c.itemCode === itemCode && c.fromUom === fromUom && c.toUom === toUom);
      if (conversion) return qty * conversion.factor;
      const reverseConversion = uomConversions.find(c => c.itemCode === itemCode && c.fromUom === toUom && c.toUom === fromUom);
      if (reverseConversion) return qty / reverseConversion.factor;
      return qty;
  };

  const toggleHold = (locationCode, itemCode, lotNo) => {
    setOnHand(prev => prev.map(oh => {
      if (oh.locationCode === locationCode && oh.itemCode === itemCode && oh.lotNo === lotNo) {
        const newStatus = oh.status === 'Hold' ? 'Available' : 'Hold';
        addLedgerEntry({ transactionType: newStatus === 'Hold' ? "INVENTORY_HOLD" : "INVENTORY_UNHOLD", itemCode, qty: oh.qty, fromLocation: locationCode, toLocation: locationCode, user: "manager.wh01", referenceNo: "MANUAL_TOGGLE" });
        return { ...oh, status: newStatus };
      }
      return oh;
    }));
  };

  return (
    <WMSContext.Provider value={{
      items, setItems, locations, setLocations, onHand, setOnHand, putawayTasks, setPutawayTasks,
      pickTasks, setPickTasks, inboundDrafts, setInboundDrafts, shipments, setShipments, ledger, setLedger,
      qualityOrders, setQualityOrders, syncLogs, setSyncLogs, cycleCounts, setCycleCounts,
      relocationHistory, setRelocationHistory, handlingUnits, setHandlingUnits, salesOrders, setSalesOrders,
      returns, setReturns, uomConversions, setUomConversions, suppliers, setSuppliers,
      submitInboundDraft, confirmPutaway, confirmPickTask, confirmShipment, completeQualityOrder,
      addLedgerEntry, relocateItem, approveCycleCount, createWave, approveReturn,
      addItem, updateItem, addUomConversion, deleteUomConversion, addSupplier, updateSupplier, deleteSupplier,
      toggleHold, suggestLocations, startCycleCount, submitCountLine, getConvertedQty, syncMasterData
    }}>
      {children}
    </WMSContext.Provider>
  );
};

export const useWMS = () => useContext(WMSContext);

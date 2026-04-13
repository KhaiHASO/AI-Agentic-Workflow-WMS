import React, { createContext, useState, useContext, useEffect } from 'react';
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

const WMSContext = createContext();

export const WMSProvider = ({ children }) => {
  const [items, setItems] = useState(itemsData);
  const [locations, setLocations] = useState(locationsData);
  const [onHand, setOnHand] = useState(onHandData);
  const [putawayTasks, setPutawayTasks] = useState(putawayTasksData);
  const [pickTasks, setPickTasks] = useState(pickTasksData);
  const [inboundDrafts, setInboundDrafts] = useState(inboundDraftsData);
  const [shipments, setShipments] = useState(shipmentsData);
  const [ledger, setLedger] = useState(ledgerData);
  const [qualityOrders, setQualityOrders] = useState(qualityData);
  const [syncLogs, setSyncLogs] = useState(syncLogsData);

  // Helper to add ledger entry
  const addLedgerEntry = (entry) => {
    const newEntry = {
      transactionId: `TXN-${Math.floor(Math.random() * 90000) + 10000}`,
      timestamp: new Date().toISOString(),
      ...entry
    };
    setLedger(prev => [newEntry, ...prev]);
  };

  // Workflow logic: Submit Inbound Draft
  const submitInboundDraft = (draftId) => {
    const draft = inboundDrafts.find(d => d.draftId === draftId);
    if (!draft) return;

    // 1. Create Putaway Tasks for accepted lines
    const newPutawayTasks = draft.lines.filter(l => l.acceptedQty > 0).map(line => ({
      taskId: `PT-${Math.floor(Math.random() * 9000) + 1000}`,
      status: "Open",
      itemCode: line.itemCode,
      qty: line.acceptedQty,
      fromLocation: "INB-STAGE-01",
      toLocation: locations.find(l => l.type === 'STORAGE')?.locationCode || "WH-A-STG-01-01-L1",
      handlingUnitBarcode: `LP-${Math.floor(Math.random() * 90000) + 10000}`,
      createdAt: new Date().toISOString()
    }));

    setPutawayTasks(prev => [...newPutawayTasks, ...prev]);
    
    // 2. Remove draft (mark as submitted)
    setInboundDrafts(prev => prev.filter(d => d.draftId !== draftId));

    // 3. Log to ledger (Staging entry)
    newPutawayTasks.forEach(task => {
        addLedgerEntry({
            transactionType: "INBOUND_RECEIPT",
            itemCode: task.itemCode,
            qty: task.qty,
            fromLocation: "EXTERNAL",
            toLocation: "WH-A-REC-01",
            user: "user.wh01",
            referenceNo: draftId
        });
    });

    // 4. Create Quality Order if needed (Realistic: RM-003 always needs QC)
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
  };

  const confirmPutaway = (taskId) => {
    const task = putawayTasks.find(t => t.taskId === taskId);
    if (!task) return;

    setOnHand(prev => {
        const existing = prev.find(oh => oh.locationCode === task.toLocation && oh.itemCode === task.itemCode);
        if (existing) {
            return prev.map(oh => oh === existing ? { ...oh, qty: oh.qty + task.qty } : oh);
        } else {
            return [...prev, {
                warehouseCode: "WH-A",
                locationCode: task.toLocation,
                itemCode: task.itemCode,
                lotNo: "LOT-NEW",
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
        toLocation: task.toLocation,
        user: "user.wh01",
        referenceNo: taskId
    });
  };

  return (
    <WMSContext.Provider value={{
      items, setItems,
      locations, setLocations,
      onHand, setOnHand,
      putawayTasks, setPutawayTasks,
      pickTasks, setPickTasks,
      inboundDrafts, setInboundDrafts,
      shipments, setShipments,
      ledger, setLedger,
      qualityOrders, setQualityOrders,
      syncLogs, setSyncLogs,
      submitInboundDraft,
      confirmPutaway,
      addLedgerEntry
    }}>
      {children}
    </WMSContext.Provider>
  );
};

export const useWMS = () => useContext(WMSContext);

import React, { createContext, useContext, useState, useEffect } from 'react';
import { wmsApi } from '../services/wmsApi';

const WMSContext = createContext();

export const WMSProvider = ({ children }) => {
    // Initialization with empty arrays to ensure only real data from BE is shown
    const [items, setItems] = useState([]);
    const [locations, setLocations] = useState([]);
    const [onHand, setOnHand] = useState([]);
    const [inboundDrafts, setInboundDrafts] = useState([]);
    const [purchaseOrders, setPurchaseOrders] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [shipments, setShipments] = useState([]);
    const [putawayTasks, setPutawayTasks] = useState([]);
    const [pickTasks, setPickTasks] = useState([]);
    const [qualityOrders, setQualityOrders] = useState([]);
    const [relocations, setRelocations] = useState([]);
    const [cycleCounts, setCycleCounts] = useState([]);
    const [returns, setReturns] = useState([]);
    const [devices, setDevices] = useState([]);
    const [ledger, setLedger] = useState([]);
    const [syncLogs, setSyncLogs] = useState([]);
    const [salesOrders, setSalesOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const refreshData = async () => {
        setLoading(true);
        try {
            const results = await Promise.allSettled([
                wmsApi.fetchItems(),
                wmsApi.fetchLocations(),
                wmsApi.fetchInventory(),
                wmsApi.fetchInboundReceipts(),
                wmsApi.fetchShipments(),
                wmsApi.fetchPutawayTasks(),
                wmsApi.fetchQualityOrders(),
                wmsApi.fetchRelocations ? wmsApi.fetchRelocations() : Promise.resolve([]),
                wmsApi.fetchCycleCounts(),
                wmsApi.fetchReturns ? wmsApi.fetchReturns() : Promise.resolve([]),
                wmsApi.fetchDevices ? wmsApi.fetchDevices() : Promise.resolve([]),
                wmsApi.fetchLedger(),
                wmsApi.fetchSyncOutbox(),
                wmsApi.fetchPurchaseOrders(),
                wmsApi.fetchSuppliers(),
                wmsApi.fetchSalesOrders ? wmsApi.fetchSalesOrders() : Promise.resolve([]),
                wmsApi.fetchPickTasks()
            ]);

            const getData = (index) => (results[index] && results[index].status === 'fulfilled') ? results[index].value : [];

            setItems(getData(0));
            setLocations(getData(1));
            setOnHand(getData(2));
            setInboundDrafts(getData(3));
            setShipments(getData(4));
            setPutawayTasks(getData(5));
            setQualityOrders(getData(6));
            setRelocations(getData(7));
            setCycleCounts(getData(8));
            setReturns(getData(9));
            setDevices(getData(10));
            setLedger(getData(11));
            setSyncLogs(getData(12));
            setPurchaseOrders(getData(13));
            setSuppliers(getData(14));
            setSalesOrders(getData(15));
            setPickTasks(getData(16));

        } catch (error) {
            console.error("Critical error in WMS data sync:", error);
        } finally {
            setLoading(false);
        }
    };

    const submitInboundDraft = async (id, updatedDraft) => {
        try {
            await wmsApi.updateInboundReceipt(id, updatedDraft);
            await refreshData();
            return true;
        } catch (error) {
            console.error("Error submitting inbound draft:", error);
            throw error;
        }
    };

    const createInboundReceipt = async (receiptData) => {
        try {
            const newReceipt = await wmsApi.createInboundReceipt(receiptData);
            await refreshData();
            return newReceipt;
        } catch (error) {
            console.error("Error creating inbound receipt:", error);
            throw error;
        }
    };

    const confirmPutaway = (taskId) => {
        const task = putawayTasks.find(t => t.taskId === taskId);
        if (!task) return;

        setOnHand(prev => {
            const existing = prev.find(oh => oh.locationCode === task.toLocation && oh.itemCode === task.itemCode);
            if (existing) {
                return prev.map(oh => oh === existing ? { ...oh, qty: oh.qty + task.qty } : oh);
            }
            return [...prev, { locationCode: task.toLocation, itemCode: task.itemCode, qty: task.qty }];
        });
        setPutawayTasks(prev => prev.filter(t => t.taskId !== taskId));
    };

    const createWave = (soIds) => {
        const newPickTasks = soIds.map(id => {
            const so = salesOrders.find(s => s.id === id);
            return {
                pickTaskId: `PKT-${Math.floor(Math.random() * 10000)}`,
                soNumber: id,
                itemCode: "FG-001", // Simplified
                reservedQty: so.qty,
                pickedQty: 0,
                fromLocation: "WH-A-PCK-01",
                status: "Assigned"
            };
        });
        setPickTasks(prev => [...prev, ...newPickTasks]);
        setSalesOrders(prev => prev.filter(s => !soIds.includes(s.id)));
    };

    const confirmPickTask = (pickTaskId, qty) => {
        setPickTasks(prev => prev.map(t => {
            if (t.pickTaskId === pickTaskId) {
                const pickedQty = t.pickedQty + qty;
                return { ...t, pickedQty, status: pickedQty >= t.reservedQty ? 'Completed' : 'Partial' };
            }
            return t;
        }));

        const task = pickTasks.find(t => t.pickTaskId === pickTaskId);
        if (task) {
            setOnHand(prev => prev.map(oh => {
                if (oh.locationCode === task.fromLocation && oh.itemCode === task.itemCode) {
                    return { ...oh, qty: oh.qty - qty };
                }
                return oh;
            }));
        }
    };

    const syncMasterData = async (type) => {
        console.log(`Syncing ${type}...`);
        return Promise.resolve();
    };

    const completeQualityOrder = (id, decision) => {
        setQualityOrders(prev => prev.map(o => o.qualityOrderId === id ? { ...o, status: decision } : o));
    };

    const relocateItem = async (fromLoc, itemCode, qty, toLoc) => {
        try {
            const relocationData = {
                itemCode,
                quantity: Number(qty),
                fromLocation: fromLoc,
                toLocation: toLoc,
                status: "Completed",
                timestamp: new Date().toISOString()
            };

            const savedRelocation = await wmsApi.createRelocation(relocationData);
            
            // Update local relocations history
            setRelocations(prev => [savedRelocation, ...prev]);

            // Update local OnHand (Inventory)
            setOnHand(prev => {
                let updated = [...prev];
                // 1. Deduct from source
                const sourceIdx = updated.findIndex(oh => oh.locationCode === fromLoc && oh.itemCode === itemCode);
                if (sourceIdx > -1) {
                    updated[sourceIdx] = { ...updated[sourceIdx], quantity: updated[sourceIdx].quantity - Number(qty) };
                }
                // 2. Add to destination
                const destIdx = updated.findIndex(oh => oh.locationCode === toLoc && oh.itemCode === itemCode);
                if (destIdx > -1) {
                    updated[destIdx] = { ...updated[destIdx], quantity: updated[destIdx].quantity + Number(qty) };
                } else {
                    updated.push({ locationCode: toLoc, itemCode: itemCode, quantity: Number(qty), status: 'Available' });
                }
                return updated.filter(oh => oh.quantity > 0);
            });

            return true;
        } catch (error) {
            console.error("Error in relocation:", error);
            throw error;
        }
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <WMSContext.Provider value={{
            items, locations, onHand, inboundDrafts, shipments, 
            putawayTasks, pickTasks, qualityOrders, relocations, cycleCounts, 
            returns, devices, ledger, syncLogs, salesOrders, purchaseOrders, suppliers,
            loading, refreshData, completeQualityOrder, submitInboundDraft,
            confirmPutaway, createWave, confirmPickTask, syncMasterData, setOnHand,
            relocateItem, createInboundReceipt
        }}>
            {children}
        </WMSContext.Provider>
    );
};

export const useWMS = () => useContext(WMSContext);

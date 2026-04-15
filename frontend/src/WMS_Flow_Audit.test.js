import { renderHook, act } from '@testing-library/react';
import { WMSProvider, useWMS } from './context/WMSContext';
import React from 'react';

const wrapper = ({ children }) => <WMSProvider>{children}</WMSProvider>;

describe('WMS Flow Audit Verification', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Flow 1: Dynamic Inbound via Draft (UC-04, UC-05, UC-09)', async () => {
    const { result } = renderHook(() => useWMS(), { wrapper });

    const draft = result.current.inboundDrafts[0];
    expect(draft).toBeDefined();

    // Verification of receipt submission
    await act(async () => {
      await result.current.submitInboundDraft(draft.draftId);
    });

    // Check if draft is removed and putaway tasks are created
    expect(result.current.inboundDrafts.find(d => d.draftId === draft.draftId)).toBeUndefined();
    const relatedPutaway = result.current.putawayTasks.filter(t => t.itemCode === draft.lines[0].itemCode);
    expect(relatedPutaway.length).toBeGreaterThan(0);
    
    // Check Ledger for INBOUND_RECEIPT
    const ledgerEntry = result.current.ledger.find(e => e.transactionType === 'INBOUND_RECEIPT' && e.referenceNo === draft.draftId);
    expect(ledgerEntry).toBeDefined();
  });

  test('Flow 2: Putaway and Inventory Update (UC-10)', async () => {
    const { result } = renderHook(() => useWMS(), { wrapper });

    // Ensure we have a putaway task
    await act(async () => {
        await result.current.submitInboundDraft(result.current.inboundDrafts[0].draftId);
    });

    const task = result.current.putawayTasks[0];
    const initialQty = result.current.onHand.find(oh => oh.locationCode === task.toLocation && oh.itemCode === task.itemCode)?.qty || 0;

    await act(async () => {
      await result.current.confirmPutaway(task.taskId);
    });

    const finalQty = result.current.onHand.find(oh => oh.locationCode === task.toLocation && oh.itemCode === task.itemCode)?.qty || 0;
    expect(finalQty).toBe(initialQty + task.qty);
  });

  test('Flow 3: Outbound Wave and Picking (UC-11, UC-12)', async () => {
    const { result } = renderHook(() => useWMS(), { wrapper });

    const soToRelease = result.current.salesOrders[0];
    const initialPickTasks = result.current.pickTasks.length;

    await act(async () => {
      await result.current.createWave([soToRelease.id]);
    });

    // Verify pick tasks created
    expect(result.current.pickTasks.length).toBeGreaterThan(initialPickTasks);
    const newPickTask = result.current.pickTasks.find(t => t.soNumber === soToRelease.id);
    expect(newPickTask).toBeDefined();

    // Verify Picking execution
    const pickQty = 5;
    const initialOnHand = result.current.onHand.find(oh => oh.locationCode === newPickTask.fromLocation && oh.itemCode === newPickTask.itemCode).qty;
    
    await act(async () => {
      await result.current.confirmPickTask(newPickTask.pickTaskId, pickQty);
    });

    const finalOnHand = result.current.onHand.find(oh => oh.locationCode === newPickTask.fromLocation && oh.itemCode === newPickTask.itemCode).qty;
    expect(finalOnHand).toBe(initialOnHand - pickQty);
  });

  test('Flow 4: Master Data Sync Mock (UC-01)', async () => {
    const { result } = renderHook(() => useWMS(), { wrapper });
    
    // Mocking a sync call (using the existing service mock)
    await act(async () => {
        await result.current.syncMasterData('items');
    });
    
    // In our mock environment, this logs a success toast and would update items if it were a real API
    // We verify the function exists and runs without error
    expect(result.current.syncMasterData).toBeDefined();
  });
});

import { renderHook, act } from '@testing-library/react';
import { WMSProvider, useWMS } from './WMSContext';
import React from 'react';

// Mock data for testing
const wrapper = ({ children }) => <WMSProvider>{children}</WMSProvider>;

describe('WMSContext Workflow Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should submit inbound draft and create putaway tasks', () => {
    const { result } = renderHook(() => useWMS(), { wrapper });

    const initialDraftCount = result.current.inboundDrafts.length;
    const initialPutawayCount = result.current.putawayTasks.length;
    const draftId = result.current.inboundDrafts[0].draftId;

    act(() => {
      result.current.submitInboundDraft(draftId);
    });

    expect(result.current.inboundDrafts.length).toBe(initialDraftCount - 1);
    expect(result.current.putawayTasks.length).toBeGreaterThan(initialPutawayCount);
  });

  test('should confirm putaway and update onHand inventory', () => {
    const { result } = renderHook(() => useWMS(), { wrapper });

    // 1. Submit a draft first to get putaway tasks
    act(() => {
      result.current.submitInboundDraft(result.current.inboundDrafts[0].draftId);
    });

    const task = result.current.putawayTasks[0];
    const initialOnHand = result.current.onHand.find(oh => oh.locationCode === task.toLocation && oh.itemCode === task.itemCode)?.qty || 0;

    act(() => {
      result.current.confirmPutaway(task.taskId);
    });

    const updatedOnHand = result.current.onHand.find(oh => oh.locationCode === task.toLocation && oh.itemCode === task.itemCode)?.qty || 0;
    expect(updatedOnHand).toBe(initialOnHand + task.qty);
    expect(result.current.putawayTasks.find(t => t.taskId === task.taskId)).toBeUndefined();
  });

  test('should confirm pick task and reduce onHand inventory', () => {
    const { result } = renderHook(() => useWMS(), { wrapper });

    const task = result.current.pickTasks[0];
    
    // Ensure there is enough onHand at the specific location to pick
    act(() => {
        result.current.setOnHand(prev => {
            const existing = prev.find(oh => oh.locationCode === task.fromLocation && oh.itemCode === task.itemCode);
            if (existing) {
                return prev.map(oh => oh === existing ? { ...oh, qty: 100 } : oh);
            } else {
                return [...prev, {
                    warehouseCode: "WH-A",
                    locationCode: task.fromLocation,
                    itemCode: task.itemCode,
                    qty: 100,
                    uom: "UNIT",
                    status: "Available"
                }];
            }
        });
    });

    act(() => {
      result.current.confirmPickTask(task.pickTaskId, 10);
    });

    const updatedOnHand = result.current.onHand.find(oh => oh.locationCode === task.fromLocation && oh.itemCode === task.itemCode)?.qty;
    expect(updatedOnHand).toBe(90);
    expect(result.current.pickTasks.find(t => t.pickTaskId === task.pickTaskId).pickedQty).toBeGreaterThan(0);
  });
});

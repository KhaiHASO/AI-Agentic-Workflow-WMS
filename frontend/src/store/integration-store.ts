import { create } from 'zustand';

interface Message {
  id: string;
  topic: string;
  correlationId: string;
  status: 'Pending' | 'Success' | 'Failed';
  attempts: number;
  timestamp: string;
  direction: 'Inbound' | 'Outbound';
}

interface IntegrationState {
  messages: Message[];
  
  // Actions
  retryMessage: (id: string) => void;
}

export const useIntegrationStore = create<IntegrationState>((set) => ({
  messages: [
    {
      id: 'msg-1',
      topic: 'ERP.SO.SYNC',
      correlationId: 'CORR-9901',
      status: 'Failed',
      attempts: 3,
      timestamp: '2024-05-18 10:00',
      direction: 'Inbound'
    },
    {
      id: 'msg-2',
      topic: 'WMS.GRN.PUSH',
      correlationId: 'CORR-9902',
      status: 'Success',
      attempts: 1,
      timestamp: '2024-05-18 10:05',
      direction: 'Outbound'
    }
  ],
  retryMessage: (id) => set((state) => ({
    messages: state.messages.map(m => m.id === id ? { ...m, status: 'Pending', attempts: m.attempts + 1 } : m)
  })),
}));

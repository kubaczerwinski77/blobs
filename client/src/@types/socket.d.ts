export interface ISocketType {
  id: string;
  emitEvent: (eventName: string, payload: unknown) => void;
  connected: boolean;
  players: {
    [string]: {
      id: string;
      position: [number, number, number];
    };
  };
}

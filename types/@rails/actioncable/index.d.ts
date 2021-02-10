export class Subscription {
  unsubscribe(): void;
}

declare class Subscriptions {
  create(channelName: string, mixin: Record<string, unknown>): Subscription;
}

export class Consumer {
  subscriptions: Subscriptions;

  disconnect(): void;
}

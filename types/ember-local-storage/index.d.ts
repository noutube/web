import ComputedProperty from '@ember/object/computed';

export function storageFor<K extends keyof Registry>(
  name: K
): ComputedProperty<Registry[K]>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Registry {}

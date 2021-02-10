import ComputedProperty from '@ember/object/computed';

export function storageFor<K extends keyof Registry>(
  name: K
): ComputedProperty<Registry[K]>;

interface Registry {}

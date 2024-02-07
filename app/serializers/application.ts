import Serializer from '@ember-data/serializer';
import JSONAPISerializer from '@ember-data/serializer/json-api';

export default JSONAPISerializer;

interface SerializerRegistry extends Record<string, Serializer> {
  application: JSONAPISerializer;
}

declare module '@ember/owner' {
  interface DIRegistry {
    serializer: SerializerRegistry;
  }
}

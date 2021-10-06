import JSONAPISerializer from '@ember-data/serializer/json-api';

// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import DS from 'ember-data';

export default class ApplicationSerializer extends JSONAPISerializer {
  serializeAttribute(
    snapshot: DS.Snapshot,
    // eslint-disable-next-line @typescript-eslint/ban-types
    json: {},
    key: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    attributes: {}
  ): void {
    if (snapshot.record.isNew || key in snapshot.changedAttributes()) {
      super.serializeAttribute(snapshot, json, key, attributes);
    }
  }
}

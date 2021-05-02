// eslint-disable-next-line ember/use-ember-data-rfc-395-imports
import ModelRegistry from 'ember-data/types/registries/model';

export default interface JSONAPIPayload {
  data: {
    id: string;
    type: keyof ModelRegistry;
    attributes: Record<string, unknown>;
  };
}

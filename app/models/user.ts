import Model, { attr } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') declare email: string;
  @attr('string') declare authenticationToken: string;
  @attr('string') declare password: string;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    user: UserModel;
  }
}

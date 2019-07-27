import Model, { attr, hasMany } from '@ember-data/model';

export default class ChannelModel extends Model {
  @attr('string') apiId;
  @attr('string') title;
  @attr('string') thumbnail;

  @hasMany('videos') videos;
  @hasMany('subscriptions') subscriptions;
}

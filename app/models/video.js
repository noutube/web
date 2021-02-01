import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class VideoModel extends Model {
  @attr('string') apiId;
  @attr('string') title;
  @attr('string') thumbnail;
  @attr('number') duration;
  @attr('date') publishedAt;
  @attr('boolean') isLive;
  @attr('boolean') isLiveContent;
  @attr('boolean') isUpcoming;
  @attr('date') scheduledAt;

  @belongsTo('channel') channel;
  @hasMany('items') items;
}

import Model, { attr, hasMany } from '@ember-data/model';
import EmberArray from '@ember/array';

import SubscriptionModel from 'noutube/models/subscription';
import VideoModel from 'noutube/models/video';

export default class ChannelModel extends Model {
  @attr('string') declare apiId: string;
  @attr('string') declare title: string;
  @attr('string') declare thumbnail: string;

  @hasMany('videos', { async: false })
  declare videos: EmberArray<VideoModel>;
  @hasMany('subscriptions', { async: false })
  declare subscriptions: EmberArray<SubscriptionModel>;
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    channel: ChannelModel;
  }
}

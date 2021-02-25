import Model, { attr, hasMany } from '@ember-data/model';
import EmberArray from '@ember/array';

import SubscriptionModel from 'nou2ube/models/subscription';
import VideoModel from 'nou2ube/models/video';

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

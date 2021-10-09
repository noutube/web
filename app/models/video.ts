import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import EmberArray from '@ember/array';

import ChannelModel from 'noutube/models/channel';
import ItemModel from 'noutube/models/item';

export default class VideoModel extends Model {
  @attr('string') declare apiId: string;
  @attr('string') declare title: string;
  @attr('string') declare thumbnail: string;
  @attr('number') declare duration: number;
  @attr('date') declare publishedAt: Date;
  @attr('boolean') declare isLive: boolean;
  @attr('boolean') declare isLiveContent: boolean;
  @attr('boolean') declare isUpcoming: boolean;
  @attr('date') declare scheduledAt: Date | null;

  @belongsTo('channel', { async: false })
  declare channel: ChannelModel;
  @hasMany('items', { async: false })
  declare items: EmberArray<ItemModel>;

  get showAt(): Date {
    return this.scheduledAt ?? this.publishedAt;
  }
}

declare module 'ember-data/types/registries/model' {
  export default interface ModelRegistry {
    video: VideoModel;
    videos: VideoModel;
  }
}

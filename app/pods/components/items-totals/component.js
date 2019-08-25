import Component from '@glimmer/component';
import { map, sum } from '@ember/object/computed';

export default class ItemsTotals extends Component {
  @map('args.items.@each.video', (item) => item.video) videos;
  @map('videos.@each.duration', (video) => video.duration) durations;
  @sum('durations') totalDuration;
}

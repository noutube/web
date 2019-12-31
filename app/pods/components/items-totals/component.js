import Component from '@glimmer/component';

export default class ItemsTotals extends Component {
  get totalDuration() {
    let videos = this.args.items.map((item) => item.video);
    let durations = videos.map((video) => video.duration);
    return durations.reduce((acc, n) => acc + n, 0);
  }
}

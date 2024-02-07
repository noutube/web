import Helper from '@ember/component/helper';
import Component from '@glimmer/component';
import '@glint/environment-ember-loose/registry';
import '@gavant/glint-template-types/types/ember-render-modifiers/did-insert';
import '@gavant/glint-template-types/types/ember-render-modifiers/will-destroy';
import AdapterRegistry from 'ember-data/types/registries/adapter';
import Modifier from 'ember-modifier';

import { pluralize } from 'ember-inflector';
import DidInsertModifier from 'ember-render-modifiers/modifiers/did-insert';
import WillDestroyModifier from 'ember-render-modifiers/modifiers/will-destroy';
import EmberTruthRegistry from 'ember-truth-helpers/template-registry';
import { TemplateFactory } from 'htmlbars-inline-precompile';
import { MomentInput, duration } from 'moment';

// incomplete
export interface PanEvent {
  current: {
    distanceX: number;
    distanceY: number;
  };
  originalEvent: Event;
}

interface DidPanModifierSignature {
  Args: {
    Named: {
      onPan: (event: PanEvent) => void;
      onPanEnd: (event: PanEvent) => void;
      onPanStart: (event: PanEvent) => void;
    };
  };
}
declare class DidPanModifier extends Modifier<DidPanModifierSignature> {}

interface EmberYoutubeComponentSignature {
  Args: {
    ended?: () => void;
    height?: number;
    playbackRateChanged?: (rate: number) => void;
    playerVars?: Record<string, unknown>;
    speed?: number;
    width?: number;
    ytid?: string;
  };
}

declare class EmberYoutubeComponent extends Component<EmberYoutubeComponentSignature> {}

interface SelectLightComponentSignature<T> {
  Args: {
    disabled?: boolean;
    onChange?: (event: Event) => void;
    value?: T;
  };
  Blocks: {
    default: [];
  };
}

declare class SelectLightComponent<T> extends Component<
  SelectLightComponentSignature<T>
> {}

interface LocalClassHelperSignature {
  Args: {
    Positional: [string?];
    Named: {
      from?: string;
    };
  };
  Return: string;
}

declare class LocalClassHelper extends Helper<LocalClassHelperSignature> {}

interface MomentHelperSignature {
  Args: {
    Positional: [MomentInput];
  };
  Return: string;
}

declare class MomentHelper extends Helper<MomentHelperSignature> {}

interface MomentDurationHelperSignature {
  Args: {
    Positional: Parameters<typeof duration>;
  };
  Return: string;
}

declare class MomentDurationHelper extends Helper<MomentDurationHelperSignature> {}

interface MomentFromNowHelperSignature {
  Args: {
    Positional: [MomentInput];
    Named: {
      interval?: number;
    };
  };
  Return: string;
}

declare class MomentFromNowHelper extends Helper<MomentFromNowHelperSignature> {}

interface PageTitleHelperSignature {
  Args: {
    Positional: string[];
    Named: {
      front?: boolean;
      prepend?: boolean;
      replace?: boolean;
      separator?: string;
    };
  };
  Return: '';
}

declare class PageTitleHelper extends Helper<PageTitleHelperSignature> {}

interface PluralizeHelperSignature {
  Args: {
    Positional: Parameters<typeof pluralize>;
  };
  Return: string;
}

declare class PluralizeHelper extends Helper<PluralizeHelperSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry extends EmberTruthRegistry {
    EmberYoutube: typeof EmberYoutubeComponent;
    SelectLight: typeof SelectLightComponent;
    'did-insert': typeof DidInsertModifier;
    'did-pan': typeof DidPanModifier;
    'local-class': typeof LocalClassHelper;
    moment: typeof MomentHelper;
    'moment-duration': typeof MomentDurationHelper;
    'moment-from-now': typeof MomentFromNowHelper;
    'page-title': typeof PageTitleHelper;
    pluralize: typeof PluralizeHelper;
    'will-destroy': typeof WillDestroyModifier;
  }
}

// Types for compiled templates
declare module 'noutube/templates/*' {
  const tmpl: TemplateFactory;
  export default tmpl;
}

// Fix some broken ember-data types
declare module '@ember-data/adapter/error' {
  export interface InvalidError {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any[];
  }
}
declare module '@ember-data/store' {
  export default interface Store {
    adapterFor<K extends keyof AdapterRegistry>(
      modelName: K
    ): AdapterRegistry[K];
  }
}

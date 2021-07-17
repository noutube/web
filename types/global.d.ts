import Helper from '@glint/environment-ember-loose/ember-component/helper';
import Modifier from '@glint/environment-ember-loose/ember-modifier';
import Component from '@glint/environment-ember-loose/glimmer-component';
import '@glint/environment-ember-loose/registry';

import DidInsertModifier from '@gavant/glint-template-types/types/ember-render-modifiers/did-insert';
import WillDestroyModifier from '@gavant/glint-template-types/types/ember-render-modifiers/will-destroy';
import EqHelper from '@gavant/glint-template-types/types/ember-truth-helpers/eq';
import NotHelper from '@gavant/glint-template-types/types/ember-truth-helpers/not';
import { pluralize } from 'ember-inflector';
import { Recognizer } from 'hammerjs';
import { TemplateFactory } from 'htmlbars-inline-precompile';
import { MomentInput, duration } from 'moment';

interface EmberYoutubeComponentSignature {
  Args: {
    ended?: () => void;
    height?: number;
    playerVars?: Record<string, unknown>;
    speed?: number;
    width?: number;
    ytid?: string;
  };
}

declare class EmberYoutubeComponent extends Component<EmberYoutubeComponentSignature> {}

interface XSelectComponentSignature<T> {
  Args: {
    disabled?: boolean;
    onChange?: (value: T) => void;
    value?: T;
  };
  Yields: {
    default: [{ option: typeof XOptionComponent }];
  };
}

declare class XSelectComponent<T> extends Component<
  XSelectComponentSignature<T>
> {}

interface XOptionComponentSignature<T> {
  Args: {
    value: T;
  };
  Yields: {
    default: [];
  };
}

declare class XOptionComponent<T> extends Component<
  XOptionComponentSignature<T>
> {}

interface LocalClassHelperSignature {
  NamedArgs: {
    from?: string;
  };
  PositionalArgs: [string?];
  Return: string;
}

declare class LocalClassHelper extends Helper<LocalClassHelperSignature> {}

interface MomentHelperSignature {
  PositionalArgs: [MomentInput];
  Return: string;
}

declare class MomentHelper extends Helper<MomentHelperSignature> {}

interface MomentDurationHelperSignature {
  PositionalArgs: Parameters<typeof duration>;
  Return: string;
}

declare class MomentDurationHelper extends Helper<MomentDurationHelperSignature> {}

interface MomentFromNowHelperSignature {
  NamedArgs: {
    interval?: number;
  };
  PositionalArgs: [MomentInput];
  Return: string;
}

declare class MomentFromNowHelper extends Helper<MomentFromNowHelperSignature> {}

interface PageTitleHelperSignature {
  NamedArgs: {
    front?: boolean;
    prepend?: boolean;
    replace?: boolean;
    separator?: string;
  };
  PositionalArgs: string[];
  Return: '';
}

declare class PageTitleHelper extends Helper<PageTitleHelperSignature> {}

interface PluralizeHelperSignature {
  PositionalArgs: Parameters<typeof pluralize>;
  Return: string;
}

declare class PluralizeHelper extends Helper<PluralizeHelperSignature> {}

interface RecognizeGestureModifierSignature {
  NamedArgs: ConstructorParameters<typeof Recognizer>[0];
  PositionalArgs: string[];
}

declare class RecognizeGestureModifier extends Modifier<RecognizeGestureModifierSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    EmberYoutube: typeof EmberYoutubeComponent;
    XSelect: typeof XSelectComponent;
    'did-insert': typeof DidInsertModifier;
    eq: typeof EqHelper;
    'local-class': typeof LocalClassHelper;
    moment: typeof MomentHelper;
    'moment-duration': typeof MomentDurationHelper;
    'moment-from-now': typeof MomentFromNowHelper;
    not: typeof NotHelper;
    'page-title': typeof PageTitleHelper;
    pluralize: typeof PluralizeHelper;
    'recognize-gesture': typeof RecognizeGestureModifier;
    'will-destroy': typeof WillDestroyModifier;
  }
}

// Types for compiled templates
declare module 'nou2ube/templates/*' {
  const tmpl: TemplateFactory;
  export default tmpl;
}

import type { UserActions } from './settings.context';

type ISettingsContextStates = {
  selectedTheme: string;
};

interface ISettingsContext extends ISettingsContextStates {
  dispatchChangeTheme: (name: string) => void;
}

type IChangeThemeAction = {
  type: UserActions.CHANGE_THEME;
  payload: {
    name: string;
  };
};

type ISettingsActions = IChangeThemeAction;

export type { ISettingsActions, ISettingsContext, ISettingsContextStates };

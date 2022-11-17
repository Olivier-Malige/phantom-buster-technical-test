import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useReducer } from 'react';

import type {
  ISettingsActions,
  ISettingsContext,
  ISettingsContextStates,
} from './setting.interfaces';

enum UserActions {
  CHANGE_THEME = 'CHANGE_THEME',
}

const LOCAL_STORAGE_KEY_THEME = 'theme';

const reducer = (state: ISettingsContextStates, action: ISettingsActions) => {
  const { type, payload } = action;
  switch (type) {
    case UserActions.CHANGE_THEME: {
      return {
        ...state,
        selectedTheme: payload.name,
      };
    }
    default:
      return state;
  }
};

const initialStates = {
  selectedTheme: localStorage.getItem(LOCAL_STORAGE_KEY_THEME) || 'light',
};

const SettingsContext = createContext<ISettingsContext | null>(null);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_THEME, state.selectedTheme);
  }, [state.selectedTheme]);

  const contextValue = useMemo(() => {
    return {
      selectedTheme: state.selectedTheme,

      dispatchChangeTheme: (name: string) =>
        dispatch({ type: UserActions.CHANGE_THEME, payload: { name } }),
    };
  }, [state, dispatch]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export { SettingsContext, SettingsProvider, UserActions };

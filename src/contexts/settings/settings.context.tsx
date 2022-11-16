import type { ReactNode } from 'react';
import { createContext, useMemo, useReducer } from 'react';

import type {
  ISettingsActions,
  ISettingsContext,
  ISettingsContextStates,
} from './setting.interfaces';

enum UserActions {
  CHANGE_THEME = 'CHANGE_THEME',
}

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
  selectedTheme: 'light',
};

const SettingsContext = createContext<ISettingsContext | null>(null);

const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

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

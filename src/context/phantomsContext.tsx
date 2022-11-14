import type { ReactNode } from 'react';
import { createContext, useMemo, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { IPhantoms } from '../data/phantoms';
import phantomsJson from '../data/phantoms.json';

interface IPhantomAction {
  type: ACTIONS;
  payload: {
    id: string;
    value?: string;
  };
}

interface IPhantomsContext {
  phantoms: IPhantoms;
  delete: (id: string) => void;
  rename: (id: string, value: string) => void;
  duplicate: (id: string) => void;
}

const initialState = phantomsJson as IPhantoms;

export const PhantomsContext = createContext<IPhantomsContext | null>(null);

enum ACTIONS {
  DELETE = 'DELETE',
  RENAME = 'RENAME',
  DUPLICATE = 'DUPLICATE',
}

const reducer = (state: IPhantoms, action: IPhantomAction) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.DELETE: {
      return state.filter((phantom) => phantom.id !== payload.id);
    }

    case ACTIONS.RENAME: {
      if (payload.value) {
        return [
          ...state.map((phantom) => {
            if (phantom.id === payload.id && payload.value) {
              return { ...phantom, name: payload.value };
            }
            return phantom;
          }),
        ];
      }
      return state;
    }

    case ACTIONS.DUPLICATE: {
      const phantomToDuplicate = state.find(
        (phantom) => phantom.id === payload.id
      );

      if (phantomToDuplicate) {
        return [...state, { ...phantomToDuplicate, id: uuidv4() }];
      }
      return state;
    }
    default:
      return state;
  }
};

export const PhantomsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const contextValue = useMemo(() => {
    return {
      phantoms: state,

      delete: (id: string) =>
        dispatch({ type: ACTIONS.DELETE, payload: { id } }),

      rename: (id: string, value: string) =>
        dispatch({ type: ACTIONS.RENAME, payload: { id, value } }),

      duplicate: (id: string) =>
        dispatch({ type: ACTIONS.DUPLICATE, payload: { id } }),
    };
  }, [state, dispatch]);

  return (
    <PhantomsContext.Provider value={contextValue}>
      {children}
    </PhantomsContext.Provider>
  );
};

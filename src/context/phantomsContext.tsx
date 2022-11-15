import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import type { IPhantoms } from '../data/phantoms';
import { useFetchData } from '../hooks/useFetchData';

interface IPhantomsContext {
  phantoms: IPhantoms;
  dispatchDelete: (id: string) => void;
  dispatchRename: (id: string, value: string) => void;
  dispatchDuplicate: (id: string) => void;
}

enum ACTIONS {
  DELETE = 'DELETE',
  RENAME = 'RENAME',
  DUPLICATE = 'DUPLICATE',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
}

type IPhantomsContextStates = {
  phantoms: IPhantoms;
  isLoading: boolean;
};

const initialStates: IPhantomsContextStates = {
  phantoms: [],
  isLoading: true,
};

type IRenameAction = {
  type: ACTIONS.RENAME;
  payload: {
    id: string;
    value: string;
  };
};

type IDeleteAction = {
  type: ACTIONS.DELETE;
  payload: {
    id: string;
  };
};

type IDuplicateAction = {
  type: ACTIONS.DUPLICATE;
  payload: {
    id: string;
  };
};

type IFetchSuccessAction = {
  type: ACTIONS.FETCH_SUCCESS;
  payload: {
    data: IPhantoms;
  };
};

type IPhantomAction =
  | IRenameAction
  | IDeleteAction
  | IDuplicateAction
  | IFetchSuccessAction;

const reducer = (state: IPhantomsContextStates, action: IPhantomAction) => {
  const { type, payload } = action;
  switch (type) {
    case ACTIONS.DELETE: {
      return {
        ...state,
        phantoms: state.phantoms.filter((phantom) => phantom.id !== payload.id),
      };
    }

    case ACTIONS.RENAME: {
      if (payload.value) {
        return {
          ...state,
          phantoms: state.phantoms.map((phantom) => {
            if (phantom.id === payload.id && payload.value) {
              return { ...phantom, name: payload.value };
            }
            return phantom;
          }),
        };
      }
      return state;
    }

    case ACTIONS.DUPLICATE: {
      const phantomToDuplicate = state.phantoms.find(
        (phantom) => phantom.id === payload.id
      );

      if (phantomToDuplicate) {
        return {
          ...state,
          phantoms: [
            ...state.phantoms,
            { ...phantomToDuplicate, id: uuidv4() },
          ],
        };
      }
      return state;
    }

    case ACTIONS.FETCH_SUCCESS: {
      return { ...state, isLoading: false, phantoms: payload.data };
    }

    default:
      return state;
  }
};

const PhantomsContext = createContext<IPhantomsContext | null>(null);

const PhantomsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const { data } = useFetchData();

  useEffect(() => {
    if (data) {
      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: { data } });
    }
  }, [data]);

  const contextValue = useMemo(() => {
    return {
      phantoms: state.phantoms,

      dispatchDelete: (id: string) =>
        dispatch({ type: ACTIONS.DELETE, payload: { id } }),

      dispatchRename: (id: string, value: string) =>
        dispatch({ type: ACTIONS.RENAME, payload: { id, value } }),

      dispatchDuplicate: (id: string) =>
        dispatch({ type: ACTIONS.DUPLICATE, payload: { id } }),
    };
  }, [state, dispatch]);

  return (
    <PhantomsContext.Provider value={contextValue}>
      {children}
    </PhantomsContext.Provider>
  );
};

export { PhantomsContext, PhantomsProvider };

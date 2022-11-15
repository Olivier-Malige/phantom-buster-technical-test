import type { ReactNode } from 'react';
import { createContext, useEffect, useMemo, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { useFetchData } from '../../hooks/useFetchData';
import type {
  IPhantomsActions,
  IPhantomsContext,
  IPhantomsContextStates,
} from './phantoms.interfaces';
import { extractCategoriesFromPhantoms } from './phantoms.utils';

enum PhantomsActions {
  DELETE = 'DELETE',
  RENAME = 'RENAME',
  DUPLICATE = 'DUPLICATE',
  FETCH_SUCCESS = 'FETCH_SUCCESS',
  SET_CATEGORY_FILTER = 'SET_CATEGORY_FILTER',
}

const reducer = (state: IPhantomsContextStates, action: IPhantomsActions) => {
  const { type, payload } = action;
  switch (type) {
    case PhantomsActions.DELETE: {
      return {
        ...state,
        phantoms: state.phantoms.filter((phantom) => phantom.id !== payload.id),
      };
    }

    case PhantomsActions.RENAME: {
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

    case PhantomsActions.DUPLICATE: {
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

    case PhantomsActions.FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        phantoms: payload.data,
        categories: extractCategoriesFromPhantoms(payload.data),
      };
    }

    case PhantomsActions.SET_CATEGORY_FILTER: {
      return {
        ...state,
        filters: {
          ...state.filters,
          category: payload.category,
        },
      };
    }

    default:
      return state;
  }
};
const initialStates: IPhantomsContextStates = {
  phantoms: [],
  isLoading: true,
  categories: [],
  filters: {
    category: '',
  },
};

const PhantomsContext = createContext<IPhantomsContext | null>(null);

const PhantomsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialStates);

  const { data } = useFetchData();

  useEffect(() => {
    if (data) {
      dispatch({ type: PhantomsActions.FETCH_SUCCESS, payload: { data } });
    }
  }, [data]);

  const contextValue = useMemo(() => {
    return {
      phantoms: state.phantoms,
      categories: state.categories,
      filters: state.filters,
      isLoading: state.isLoading,

      dispatchDelete: (id: string) =>
        dispatch({ type: PhantomsActions.DELETE, payload: { id } }),

      dispatchRename: (id: string, value: string) =>
        dispatch({ type: PhantomsActions.RENAME, payload: { id, value } }),

      dispatchDuplicate: (id: string) =>
        dispatch({ type: PhantomsActions.DUPLICATE, payload: { id } }),

      dispatchSetCategoryFilter: (category: string) =>
        dispatch({
          type: PhantomsActions.SET_CATEGORY_FILTER,
          payload: { category },
        }),
    };
  }, [state, dispatch]);

  return (
    <PhantomsContext.Provider value={contextValue}>
      {children}
    </PhantomsContext.Provider>
  );
};

export { PhantomsActions, PhantomsContext, PhantomsProvider };

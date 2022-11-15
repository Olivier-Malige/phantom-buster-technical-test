import type { IPhantoms } from '../../data/phantoms';
import type { PhantomsActions } from './phantoms.context';

type IPhantomsContextStates = {
  phantoms: IPhantoms;
  isLoading: boolean;
  categories: string[];
  filters: {
    category: string;
  };
};

interface IPhantomsContext extends IPhantomsContextStates {
  dispatchDelete: (id: string) => void;
  dispatchRename: (id: string, value: string) => void;
  dispatchDuplicate: (id: string) => void;
  dispatchSetCategoryFilter: (category: string) => void;
}

type IRenameAction = {
  type: PhantomsActions.RENAME;
  payload: {
    id: string;
    value: string;
  };
};

type IDeleteAction = {
  type: PhantomsActions.DELETE;
  payload: {
    id: string;
  };
};

type IDuplicateAction = {
  type: PhantomsActions.DUPLICATE;
  payload: {
    id: string;
  };
};

type IFetchSuccessAction = {
  type: PhantomsActions.FETCH_SUCCESS;
  payload: {
    data: IPhantoms;
  };
};

type ISetCategoryFilterAction = {
  type: PhantomsActions.SET_CATEGORY_FILTER;
  payload: {
    category: string;
  };
};

type IPhantomsActions =
  | IRenameAction
  | IDeleteAction
  | IDuplicateAction
  | IFetchSuccessAction
  | ISetCategoryFilterAction;

export type {
  IDeleteAction,
  IDuplicateAction,
  IFetchSuccessAction,
  IPhantoms,
  IPhantomsActions,
  IPhantomsContext,
  IPhantomsContextStates,
};

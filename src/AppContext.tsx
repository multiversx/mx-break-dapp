import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { SESSION_KEY } from './const/session.ts';

export type AppStateType = {
  address?: string;
  encrypted?: string | object;
  balance?: string;
  claimingTokens?: number;
  sending?: boolean;
  accessToken?: string;
};

const initialState: AppStateType = {
  address: '',
  encrypted: '',
  balance: '...',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
      } & M[Key]; // Explicitly constrain Key to string and intersect with M[Key]
};

enum ActionType {
  GENERATE = 'GENERATE',
  SEND = 'SEND',
  CLAIM = 'CLAIM',
  UPDATE_BALANCE = 'UPDATE_BALANCE',
  STOP = 'STOP',
  CLEAR = 'CLEAR',
}

type ActionPayloadType = {
  [ActionType.GENERATE]: {
    address?: string;
    encrypted?: string | object;
    accessToken?: string;
  };
  [ActionType.CLAIM]: {
    claimingTokens?: number;
  };
  [ActionType.UPDATE_BALANCE]: {
    balance?: string;
  };
  [ActionType.SEND]: never;
  [ActionType.STOP]: never;
  [ActionType.CLEAR]: never;
};

export type Actions = ActionMap<ActionPayloadType>[keyof ActionMap<ActionPayloadType>];

type ContextType = {
  state: AppStateType;
  dispatch: Dispatch<Actions>;
};

const AppContext = createContext<ContextType>({
  state: initialState,
  dispatch: () => null,
});

export const reducer = (state: AppStateType, action: Actions): typeof initialState => {
  switch (action.type) {
    case ActionType.GENERATE: {
      const { address, encrypted, accessToken } = action;

      return {
        ...state,
        address,
        encrypted,
        accessToken,
      };
    }

    case ActionType.CLAIM: {
      const { claimingTokens } = action;

      return {
        ...state,
        claimingTokens,
      };
    }

    case ActionType.UPDATE_BALANCE: {
      const { balance } = action;

      return {
        ...state,
        balance,
      };
    }

    case ActionType.SEND: {
      return {
        ...state,
        sending: true,
      };
    }

    case ActionType.STOP: {
      return {
        ...state,
        sending: false,
      };
    }

    case ActionType.CLEAR: {
      sessionStorage.clear();
      return initialState;
    }

    default: {
      throw new Error(`unhandled type ${(action as { type: string }).type}`);
    }
  }
};

export const Provider = ({ children }: PropsWithChildren) => {
  const session = JSON.parse(sessionStorage.getItem(SESSION_KEY) ?? '{}') || ({} as AppStateType);
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...session,
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppProvider = () => {
  const context = useContext(AppContext);

  if (context == null) {
    throw new Error('useProvider must be used within a Provider');
  }

  const { state, dispatch } = context;

  return { ...state, dispatch, actions: ActionType };
};

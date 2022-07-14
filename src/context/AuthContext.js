import { createContext, useEffect, useReducer } from "react";
import apiService from "../app/apiService";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const INITIALIZE = "INITIALIZE";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };

    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const email = window.localStorage.getItem("email");
        const token = window.localStorage.getItem("token");
        const name = window.localStorage.getItem("name");
        const role = window.localStorage.getItem("role")
        apiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (email) {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: true, user: { email, name, role } },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    window.localStorage.setItem("email", email);
    const res = await apiService.post(`/users/login`, { email, password });
    console.log("current user", res)
    window.localStorage.setItem("token", res.data.data.token);
    const name = res.data.data.userName;
    const role = res.data.data.role
    window.localStorage.setItem("name", name);
    window.localStorage.setItem("role", role)
    apiService.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.data.token}`;
    dispatch({
      type: LOGIN_SUCCESS,
      payload: { user: { name, email, password, role } },
    });
    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const res = await apiService.post(`/users/register`, {
      name,
      email,
      password,
    });
    console.log("register", res);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: { user: { name, email, password } },
    });
    callback();
  };

  const logout = async (callback) => {
    window.localStorage.clear();
    dispatch({ type: LOGOUT });
    callback();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };

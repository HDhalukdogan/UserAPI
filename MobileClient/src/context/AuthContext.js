import * as SecureStore from 'expo-secure-store'
import createDataContext from "./createDataContext";
import agent from "../api/agent";
import * as RootNavigation from "../RootNavigation";



const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signin":
      return { errorMessage: "", email: action.payload.email, token: action.payload.token };
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { email: null, token: null, errorMessage: "" };
    default:
      return state;
  }
};

const tryLocalSignin = (dispatch) => async () => {
  try {
    const response = await agent.Account.currentUser();
    dispatch({ type: "signin", payload: response });
    RootNavigation.navigate("Home")
  } catch (error) {
    RootNavigation.navigate("Login")
  }
};

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: "clear_error_message" });
};

const signup =
  (dispatch) =>
    async (data) => {
      try {
        const response = await agent.Account.register(data)

        RootNavigation.navigate("Login")
      } catch (err) {
        dispatch({
          type: "add_error",
          payload: "Something went wrong with sign up",
        });
      }
    };

const signin =
  (dispatch) =>
    async (data) => {
      try {
        const response = await agent.Account.login(data)
        await SecureStore.setItemAsync("token", response.token);
        dispatch({ type: "signin", payload: response });
        RootNavigation.navigate("Home")
      } catch (err) {
        dispatch({
          type: "add_error",
          payload: "Something went wrong with sign in",
        });
      }
    };

const signout = (dispatch) => async () => {
  await SecureStore.deleteItemAsync("token")
  dispatch({ type: "signout" });
  RootNavigation.navigate("Login")
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup, clearErrorMessage, tryLocalSignin },
  { email: null, token: null, errorMessage: "" }
);

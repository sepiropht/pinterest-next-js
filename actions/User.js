export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export function loggedIn(user) {
  return {
    payload: user,
    type: LOGGED_IN
  };
}
export function loggedOut(a) {
  return {
    payload: a,
    type: LOGGED_OUT
  };
}

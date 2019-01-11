const initialState = {
  snackbar: "hey whats up"
};
export const currentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SNACKBAR":
      console.log("snackbar called", action.message);
      return { ...state, snackbar: action.message };
    default:
      return state;
  }
};

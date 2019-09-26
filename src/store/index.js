const initialState = {
  mixes: [],
  currentMix: "groovy disco bangers",
  playing: false
};

function mixesApp(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case "PLAY_MIX":
      return {
        ...state,
        currentMix: payload.currentMix,
        fromMixCloud: payload.fromMixCloud
      };
    case "ADD_MIX":
      return {
        ...state,
        mixes: [...state.mixes, { ...payload, id: payload.key }]
      };
    default:
      return state;
  }
}

export default mixesApp;

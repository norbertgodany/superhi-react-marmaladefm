const initialState = {
  mixes: [],
  currentMix: "groovy disco bangers",
  widgetReady: false,
  playing: false,
  fromMixcloud: false
};

function mixesApp(state = initialState, action) {
  const { type, payload } = action;
  switch (action.type) {
    case "PLAY_MIX":
      const {currentMix, playing} = payload
      return {
        ...state,
        // spread the payload rather than listing them one by one.
        // stopping them from overwriting them
        ...payload,
        playing: currentMix === state.currentMix ? !playing: playing
      };
    case "ADD_MIX":
      return {
        ...state,
        mixes: [...state.mixes, { ...payload, id: payload.key }]
      };
    case "SET_WIDGET_READY":
      return {
        ...state,
        widgetReady: true
      };
    default:
      return state;
  }
}

export default mixesApp;

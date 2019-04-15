import * as types from '../mutation-types'
import sessionStorage from '@/utils/sessionStorage'

const setTopMenuActId = topMenuActId => {
    sessionStorage.set('topMenuActId', topMenuActId)
};

const header = {
  state: {
      topMenuActId: sessionStorage.get('topMenuActId'),
  },
  mutations: {
    [types.ADD_DEFAULT_TOP_MENU]: (state, id) => {
      if (!state.topMenuActId){
        state.topMenuActId = id;
        setTopMenuActId(state.topMenuActId);
      }
    },
    [types.CHANGE_TOP_MENU]: (state, id) => {
      state.topMenuActId = id;
      setTopMenuActId(state.topMenuActId);
    },

  },
  actions: {
    addDefaultTopMenu({ commit }, id){
      commit(types.ADD_DEFAULT_TOP_MENU, id)
    },
    changeTopMenu({ commit }, id) {
      commit(types.CHANGE_TOP_MENU, id)
    },
  }
};

export default header

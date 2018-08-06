import {ACTIVE_PAGE} from '../actions';

export default function (state, action) {
    switch (action.type) {
      case ACTIVE_PAGE:
        return action.payload
    }
    return "Dashboard"
  }


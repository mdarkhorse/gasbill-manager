import { combineReducers } from "redux";
import clients from "./clients";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import info from "./info";

export default combineReducers({
  clients,
  errors,
  messages,
  auth,
  info
});

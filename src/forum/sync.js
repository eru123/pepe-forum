import { Store, get, set, clear } from "idb-keyval";
import store from "../store";

var forumdb = new Store("pepe", "forum");

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function(key) {
    return fn(obj[key], key);
  });
}

function isValidJsonString(str) {
  if (typeof str == "string") {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  return false;
}
var toLocal = async function() {
  await forEachValue(store.state, async function(val, key) {
    if (typeof val == "object") {
      val = JSON.stringify(val);
    }
    await set(key, val, forumdb);
  });
};
var toApp = async function() {
  let key;
  for (key in store.state) {
    var local = await get(key, forumdb);
    if (isValidJsonString(local)) {
      local = JSON.parse(local);
    }
    store.state[key] = local || store.state[key];
  }
};
var clearLocal = async function(){
  await clear(forumdb);
}
var both = async function() {
  await toApp();
  await toLocal();
};
export default {
  toLocal,
  toApp,
  both,
  clearLocal,
  delay
};

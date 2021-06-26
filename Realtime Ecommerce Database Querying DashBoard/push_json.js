const algoliasearch = require("algoliasearch");
const client = algoliasearch("<enter_app_id>,<enter_api_key>");
const index = client.initIndex("<name_of_index>");

const actors = require("./actors.json");
index.addObjects(actors);

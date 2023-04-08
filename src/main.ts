import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import directives from "./directives";
import { camelToKebabCase } from "./utils";
import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// Register directives globally
Object.keys(directives).forEach((name) => {
  console.log("name", name);
  console.log("name camelToKebabCase", camelToKebabCase(name));
  console.log("name  directives[name]",  directives[name as keyof typeof directives]);
    app.directive(camelToKebabCase(name), directives[name as keyof typeof directives]);
});

app.mount("#app");

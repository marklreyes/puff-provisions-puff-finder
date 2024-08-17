import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import vueCustomElement from 'vue-custom-element';
import VueFlags from "@growthbunker/vueflags";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(vueCustomElement);
Vue.use(VueFlags, {
	// Specify the path of the folder where the flags are stored.
	iconPath: '/wp-content/themes/econature/img/',
});

Vue.customElement('vue-widget', App);

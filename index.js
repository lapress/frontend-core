import VueInstance from 'vue';
import VueBlu from 'vue-blu';

export default {
    install(Vue, options = { modules : [] }) {
        Vue.use(VueBlu);
        const config = {};
        Vue.component('LpNavigationBar', () => import(/* webpackChunkName: "lapress-navigation-bar" */'./src/components/atoms/NavigationBar'));

        options.modules.forEach((laPressModule) => {
            laPressModule.register(Vue);
            config[laPressModule.key()] = Object.assign(
              laPressModule.config(),
              options[laPressModule.key()]
            );
        });

        Vue.prototype.$lapress = config;
        Vue.prototype.$bus = new VueInstance();
    }
};

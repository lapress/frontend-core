import VueBlu from 'vue-blu';

export default {
    install(Vue, options = { modules : [] }) {
        Vue.use(VueBlu);
        const config = {};
        Vue.component('LpNavigationBar', () => import(/* webpackChunkName: "lapress-navigation-bar" */'./src/components/atoms/NavigationBar'));

        options.modules.forEach((laPressModule) => {
            laPressModule.register(Vue);
            config[laPressModule.key()] = laPressModule.config();
        });

        Vue.prototype.$lapress = config;
    }
};

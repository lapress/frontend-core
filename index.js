import VueInstance from 'vue';
import VueBlu from 'vue-blu';
import merge from 'lodash.merge'
import lang from 'element-ui/lib/locale/lang/pl'
import locale from 'element-ui/lib/locale'

const config = {}

export default {
    install(Vue, options = { modules : [] }) {
        Vue.use(VueBlu);
        Vue.component('LpNavigationBar', () => import(/* webpackChunkName: "lapress-navigation-bar" */'./src/components/atoms/NavigationBar'));
        Vue.component('LpCloseSvg', () => import(/* webpackChunkName: "lapress-close" */'./src/components/atoms/Icons/CloseSvg'));
        Vue.component('LpImageSvg', () => import(/* webpackChunkName: "lapress-image-svg" */'./src/components/atoms/Icons/ImageSvg'));
        Vue.component('LpOverlay', () => import(/* webpackChunkName: "lapress-overlay" */'./src/components/blocks/Overlay'));
        Vue.component('LpColorPicker', () => import(/* webpackChunkName: "lapress-color-picker" */'./src/components/blocks/ColorPicker'));
        Vue.component('LpImagePicker', () => import(/* webpackChunkName: "lapress-color-picker" */'./src/components/blocks/ImagePicker'));
        Vue.component('LpFormValuesSetter', () => import(/* webpackChunkName: "lapress-form-value-setter" */'./src/components/blocks/FormValuesSetter'));

        locale.use(lang)

        options.modules.forEach((laPressModule) => {
            laPressModule.register(Vue);
            config[laPressModule.key()] = merge(
              laPressModule.config(),
              options.config[laPressModule.key()]
            );
            delete options.config[laPressModule.key()]
        });

        config.data = options.config

        Vue.prototype.$lapress = config;
        Vue.prototype.$bus = new VueInstance();

        // eslint-disable-next-line no-console
        console.log('config', config)
    }
};

export { config }

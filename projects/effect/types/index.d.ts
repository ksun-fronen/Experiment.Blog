import './useDefinition';
import './shims-vue';
import * as gsap from "gsap";

declare global {
    interface Window {
        $$application: any;
        gsap: gsap,
        setLoadingState: Function,
    }
}

declare const window: Window

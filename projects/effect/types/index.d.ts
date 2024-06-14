import './useDefinition';
import './shims-vue';

declare global {
    interface Window {
        $$application: any;
    }
}

declare const window: Window

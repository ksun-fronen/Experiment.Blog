import './useDefinition';
import './shims-vue';

declare global {
    interface Window {
        $$application: any;
        setLoadingState: Function,
    }
}

declare const window: Window

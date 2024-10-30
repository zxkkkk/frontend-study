declare module 'vue-quill-editor' {
    import { DefineComponent } from 'vue';

    const QuillEditor: DefineComponent<{
        // 你可以根据实际情况添加 props 类型
        value?: string;
        options?: any; // 可以更具体地定义 options 类型
    }, {}, any>;

    export { QuillEditor };
    export default QuillEditor;
}

import { loadHtml } from "./source";

// 微应用实例
export const appInstanceMap = new Map();

const AppState = {
  created: "created",
  loading: "loading",
  mount: "mount",
  unmount: "unmount",
};

/**
 * 微应用实例
 */
export default class CreateApp {
  // 存放应用的静态资源
  source = {
    links: new Map(), // link元素对应的静态资源
    scripts: new Map(), // script元素对应的静态资源
    html: undefined, //
  };

  name = undefined;
  url = undefined;
  container = undefined;
  appState = AppState.created;

  loadCount = 0; // 标记onLoad执行次数 如果大于1 说明资源加载完了

  constructor({ name, url, container }) {
    this.name = name;
    this.url = url;
    this.container = container;
    this.appState = AppState.loading;
    loadHtml(this);
  }

  // css script 都调用了。
  onLoad(htmlDom) {
    this.loadCount = this.loadCount ? this.loadCount + 1 : 1;
    //TODO 为什么一定是2 ？
    if (this.loadCount === 2 && this.appState !== AppState.unmount) {
      this.source.html = htmlDom;
      // onLoad call mount
      this.mount();
    }
  }

  mount() {
    console.log("app mount");
    const cloneHtml = this.source.html.cloneNode(true);
    // 创建一个fragment节点作为模版，这样不会产生冗余的元素
    const fragment = document.createDocumentFragment();
    Array.from(cloneHtml.childNodes).forEach((node) => {
      fragment.appendChild(node);
    });

    // 将格式化后的DOM结构插入到容器中
    this.container.appendChild(fragment);

    // 执行js;
    // this.source.scripts.forEach((info) => {
    //   (0, eval)(info.code);
    // });

    // 标记应用为已渲染
    this.appState = AppState.mount;
  }

  unmount(destory) {
    // 更新状态
    this.appState = AppState.unmount;
    // 清空容器
    this.container = null;
    if (destory) {
      appInstanceMap.delete(this.name);
    }
  }
}

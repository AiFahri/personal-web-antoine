import { useEffect } from "react";

export function useAutoplay(embla: any, delay = 7000) {
  useEffect(() => {
    if (!embla) return;
    let stopped = false,
      timer: any;
    const node = embla.rootNode ? embla.rootNode() : null;
    if (!node) return;

    function next() {
      if (!stopped) embla.scrollNext();
      timer = setTimeout(next, delay);
    }
    function stop() {
      stopped = true;
      clearTimeout(timer);
    }
    function start() {
      stopped = false;
      timer = setTimeout(next, delay);
    }

    node.addEventListener("mouseenter", stop);
    node.addEventListener("mouseleave", start);
    node.addEventListener("focusin", stop);
    node.addEventListener("focusout", start);
    start();

    return () => {
      stop();
      node.removeEventListener("mouseenter", stop);
      node.removeEventListener("mouseleave", start);
      node.removeEventListener("focusin", stop);
      node.removeEventListener("focusout", start);
    };
  }, [embla, delay]);
}

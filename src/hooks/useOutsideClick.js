import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenCapturig = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturig);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturig);
    },
    [handler, listenCapturig]
  );

  return ref;
}
